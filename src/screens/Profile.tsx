import { useState } from "react";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Alert, TouchableOpacity } from "react-native";
import { UserPhoto } from "@components/UserPhoto";
import { ScreenHeader } from "@components/ScreenHeader";
import { Center, ScrollView, Text, VStack, Skeleton, Heading, useToast } from "native-base";
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system';

const PHOTO_SIZE = 33

export function Profile() {

  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState('http://github.com/fboscato.png')
  const toast = useToast()
  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true)
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true
      })
      if (photoSelected.canceled) {
        return;
      }
      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri)
        console.log(photoInfo)
        if (photoInfo.exists && photoInfo.size / 1024 / 1024 > 1) {
          return toast.show({
            title: "Foto muito é muito grande. Escolha uma até 1MB",
            placement: 'top',
            bg: "red.500",
          })
        }
        setUserPhoto(photoSelected.assets[0].uri)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setPhotoIsLoading(false)
    }
  }

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
              source={{ uri: userPhoto }}
              alt="Foto usuario"
              size={PHOTO_SIZE}
            />
          }
          <TouchableOpacity onPress={handleUserPhotoSelect}>
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