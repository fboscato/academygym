import { TouchableOpacity } from "react-native";
import { Heading, HStack, Icon, Text, VStack } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { UserPhoto } from "./UserPhoto";
import { useAuth } from "@hooks/useAuth";
import defaultUserPhoto from "@assets/userPhotoDefault.png"
import { api } from "@services/api";
export function HomeHeader() {
  const { user,singOut } = useAuth();
  return (
    <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
      <UserPhoto
        source={user.avatar ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}`  } : defaultUserPhoto}
        alt="Imagem do usuário"
        size={16}
        mr={4}

      />
      <VStack flex={1}>
        <Text color="gray.100" fontSize="md" fontFamily='heading'>
          Olá
        </Text>
        <Heading color="gray.100" fontSize="md" fontFamily='heading'>
          {user.name}
        </Heading>
      </VStack>
      <TouchableOpacity onPress={singOut}>
        <Icon
          as={MaterialIcons}
          name="logout"
          color="gray.200"
          size={7}
        />
      </TouchableOpacity>
    </HStack>
  )
}