import { NavigationContainer,DefaultTheme } from "@react-navigation/native";
import { AuthRouter } from "./auth.routes";
import {useTheme} from "native-base"
export function Routes(){
  const nativeBase = useTheme()
  const theme = DefaultTheme
  theme.colors.background = nativeBase.colors.gray[700]
  return (
    <NavigationContainer>
      <AuthRouter/>
    </NavigationContainer>
  )
}