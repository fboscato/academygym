import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { AuthRouter } from "./auth.routes";
import { useTheme, Box } from "native-base"
import { useAuth } from "@hooks/useAuth";
import { AppRoutes } from "./app.routes";
import { Loading } from "@components/Loading";
export function Routes() {
  const { colors } = useTheme()
  const { user,isLoadingUserStorageData } = useAuth()


  const theme = DefaultTheme
  theme.colors.background = colors.gray[700]
  if (isLoadingUserStorageData){
    return<Loading/>
  }
  return (
    <Box flex={1} bg={"gray.700"}>
      <NavigationContainer theme={theme}>
        {user.id ? <AppRoutes /> : <AuthRouter />}
      </NavigationContainer>
    </Box>
  )
}