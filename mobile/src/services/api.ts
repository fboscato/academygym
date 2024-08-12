import { storageAuthTokenGet, storageAuthTokenSave } from "@storage/storageAuthToken";
import { AppErro } from "@utils/AppError";
import axios, { AxiosError, AxiosInstance } from "axios";
type SignOut = () => void;
type PromiseType = {
  onSuccess: (token: string) => void;
  onFailure: (token: AxiosError) => void;
};
type APIInstanceProps = AxiosInstance & {
  retisterIntercentTokenManager: (signOut: SignOut) => () => void;
};

const api = axios.create({
  baseURL: "http://192.168.2.212:3333",
}) as APIInstanceProps;

let failedQuere: Array<PromiseType> = [];
let isRefresh = false;

api.retisterIntercentTokenManager = (signOut) => {
  const intercentTokenManager = api.interceptors.response.use(
    (response) => response,
    async (requestError) => {
      if (requestError?.response?.status === 401) {
        if (
          requestError.response.data?.message === "token.expired" ||
          requestError.response.data?.message === "token.invalid"
        ) {
          const { refresh_token } = await storageAuthTokenGet();
          if (!refresh_token) {
            signOut();
            return Promise.reject(requestError);
          }
          const originalRequestConfig = requestError.config;
          if (isRefresh) {
            return new Promise<any>((resolve, reject) => {
              failedQuere.push({
                onSuccess: (token: string) => {
                  originalRequestConfig.headers = { Authorization: `Bearer ${token}` };
                  resolve(api(originalRequestConfig));
                },
                onFailure: (error: AxiosError) => {
                  reject(error);
                },
              });
            });
          }
          isRefresh = true;
          return new Promise<any>(async (resolve, reject) => {
            try {
              const { data } = await api.post("/sessions/refresh_token", { refresh_token });
              await storageAuthTokenSave({ token: data.token, refresh_token: data.refresh_token });
              if (originalRequestConfig.data) {
                originalRequestConfig.data = JSON.parse(originalRequestConfig.data);
              }
              originalRequestConfig.headers = { Authorization: `Bearer ${data.token}` };
              api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
              failedQuere.forEach((request) => {
                request.onSuccess(data.token);
              });
              resolve(api(originalRequestConfig));
            } catch (error: any) {
              failedQuere.forEach((request) => {
                request.onFailure(error);
              });
              signOut();
              reject(error);
            } finally {
              isRefresh = false;
              failedQuere = [];
            }
          });
        }
        signOut();
      }

      if (requestError.response && requestError.response.data) {
        return Promise.reject(new AppErro(requestError.response.data.message));
      } else {
        return Promise.reject(requestError);
      }
    }
  );
  return () => {
    api.interceptors.response.eject(intercentTokenManager);
  };
};

export { api };
