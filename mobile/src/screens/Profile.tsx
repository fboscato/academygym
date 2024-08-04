import { useState } from "react";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { TouchableOpacity } from "react-native";
import { UserPhoto } from "@components/UserPhoto";
import { ScreenHeader } from "@components/ScreenHeader";
import { Center, ScrollView, Text, VStack, Skeleton, Heading, useToast } from "native-base";
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system';
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "@hooks/useAuth";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "@services/api";
import { AppErro } from "@utils/AppError";
import defaultUserPhoto from "@assets/userPhotoDefault.png"

const PHOTO_SIZE = 33

type FormaDataProps = {
  name: string
  email: string
  old_password?: string | null;
  password?: string | null;
  confirm_password?: string | null;
}

const profileSchema = yup.object({
  name: yup.string().required('Informe seu nome.'),
  email: yup.string().required('Informe seu email.').email('Email inválido.'),
  old_password: yup.string().nullable(),
  password: yup.string()
    .min(6, 'A senha deve ter pelo menos 6 dígitos.')
    .nullable()
    .transform((value) => !!value ? value : null),
  confirm_password: yup
    .string()
    .nullable()
    .transform((value) => !!value ? value : null)
    .oneOf([yup.ref('password'), null], 'A confirmação da senha está incorreta.')
    .when('password', {
      is: (Field: any) => Field,
      then: (schema) => schema.nullable().required('Informe a confirmação da senha.')
        .transform((value) => !!value ? value : null)
    }),
})
export function Profile() {
  const [isUpdating, setIsUpdating] = useState(false)
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState('http://github.com/fboscato.png')
  const toast = useToast()
  const { user, updateUserProfile } = useAuth()
  const { control, handleSubmit, formState: { errors } } = useForm<FormaDataProps>({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
    resolver: yupResolver(profileSchema)
  })

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
        const fileExtension = photoSelected.assets[0].uri.split('.').pop()
        const photoFile = {
          name: `${user.name}.${fileExtension}`.toLowerCase(),
          uri: photoSelected.assets[0].uri,
          type: `${photoSelected.assets[0].type}/${fileExtension}`,
        } as any
        const userPhotoUploadForm = new FormData()
        userPhotoUploadForm.append('avatar', photoFile)
        const avatarUpdateResponse = await api.patch('/users/avatar', userPhotoUploadForm, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        const userUpdate = user
        userUpdate.avatar = avatarUpdateResponse.data.avatar
        updateUserProfile(userUpdate)
        toast.show({
          title: "Foto atualizado",
          placement: 'top',
          bg: "green.500",
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setPhotoIsLoading(false)
    }
  }
  async function handleProfileUpdate(data: FormaDataProps) {
    try {
      setIsUpdating(true)
      const userUpdated = user
      userUpdated.name = data.name
      await api.put('/users', data)
      await updateUserProfile(userUpdated)
      toast.show({
        title: "Perfil atualizado com sucesso!",
        placement: 'top',
        bg: "green.500",
      })
    } catch (error) {
      const isAppError = error instanceof AppErro;
      const title = isAppError ? error.menssage : 'Não foi possível atualizar os dados.'
      toast.show({
        title: title,
        placement: 'top',
        bg: "red.500",
      })
    } finally {
      setIsUpdating(false)
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
              source={user.avatar ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` } : defaultUserPhoto}
              alt="Foto usuario"
              size={PHOTO_SIZE}
            />
          }
          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text color='green.500' fontWeight="bold" fontSize='md' mt='2' mb={8}>
              Altera foto
            </Text>
          </TouchableOpacity>
          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <Input
                bg='gray.600'
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <Input
                bg='gray.600'
                placeholder="E-mail"
                onChangeText={onChange}
                value={value}
                isDisabled

              />
            )}
          />

          <Heading color="gray.200" fontSize="md" mb={2}
            alignSelf='flex-start' mt={12}
            fontFamily='heading'
          >
            ALtera senha
          </Heading>
          <Controller
            control={control}
            name="old_password"
            render={({ field: { onChange } }) => (
              <Input
                bg='gray.600'
                placeholder="Senha antiga"
                secureTextEntry
                onChangeText={onChange}

              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <Input
                bg='gray.600'
                placeholder="Nova senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}

              />
            )}
          />
          <Controller
            control={control}
            name="confirm_password"
            render={({ field: { onChange } }) => (
              <Input
                bg='gray.600'
                placeholder="Confirme nova senha "
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.confirm_password?.message}

              />
            )}
          />


          <Button
            title="Atualizar"
            mt={4}
            onPress={handleSubmit(handleProfileUpdate)}
            isLoading={isUpdating}
          />
        </Center>
      </ScrollView>
    </VStack>
  )
}