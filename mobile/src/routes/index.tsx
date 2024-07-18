import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { AuthRouter } from "./auth.routes";
import { useTheme, Box } from "native-base"
import { useAuth } from "@hooks/useAuth";
import { AppRoutes } from "./app.routes";
export function Routes() {
  const { colors } = useTheme()
  const {user} = useAuth()
  console.log("Usuario logado:", user)
  
  const theme = DefaultTheme  
  theme.colors.background = colors.gray[700]
  return (
    <Box flex={1} bg={"gray.700"}>
      <NavigationContainer theme={theme}>
        <AuthRouter />        
      </NavigationContainer>
    </Box>
  )
}