import { useState } from "react";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { TouchableOpacity } from "react-native";
import { UserPhoto } from "@components/UserPhoto";
import { ScreenHeader } from "@components/ScreenHeader";
import { Center, ScrollView, Text, VStack, Skeleton, Heading } from "native-base";

const PHOTO_SIZE = 33

export function Profile() {

  const [photoIsLoading, setPhotoIsLoading] = useState()

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />
      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt={6} px={10}>
          {photoIsLoading ?
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded='full'
              startColor="gray.500"
              endColor="gray.300"
            />
            :
            <UserPhoto
              source={{ uri: 'http://github.com/fboscato.png' }}
              alt="Foto usuario"
              size={PHOTO_SIZE}
            />
          }
          <TouchableOpacity>
            <Text color='green.500' fontWeight="bold" fontSize='md' mt='2' mb={8}>
              Altera foto
            </Text>
          </TouchableOpacity>
          <Input
            bg='gray.600'
            placeholder="Nome"
          />
          <Input
            bg='gray.600'
            placeholder="E-mail"
            isDisabled
          />

          <Heading color="gray.200" fontSize="md" mb={2}
            alignSelf='flex-start' mt={12}
          >
            ALtera senha
          </Heading>
          <Input
            bg='gray.600'
            placeholder="Senha antiga"
            secureTextEntry
          />
          <Input
            bg='gray.600'
            placeholder="Nova senha"
            secureTextEntry
          />
          <Input
            bg='gray.600'
            placeholder="Confirme nova senha "
            secureTextEntry
          />
          <Button
            title="Alterar"
            mt={4}
          />
        </Center>
      </ScrollView>
    </VStack>
  )
}