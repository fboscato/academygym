import { NavigationContainer,DefaultTheme } from "@react-navigation/native";
import { AuthRouter } from "./auth.routes";
import {useTheme, Box} from "native-base"
export function Routes(){
  const nativeBase = useTheme()
  const theme = DefaultTheme
  theme.colors.background = nativeBase.colors.gray[700]
  return (
    <Box flex={1} bg={"gray.700"}>
    <NavigationContainer>
      <AuthRouter/>
    </NavigationContainer>
    </Box>
  )
}