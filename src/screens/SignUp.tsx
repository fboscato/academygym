import { VStack, Image, Center, Text, Heading, ScrollView } from 'native-base'
import BackgroundImg from '@assets/background3.png'
import LogoSvg from '../assets/logo.svg'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form';
import * as yup  from 'yup';

type FormDataProps = {
  name: string
  email: string
  password: string
  password_confirm: string
}
const  singUpSchema = yup.object({
  name: yup.string().required('Informe o nome'),
  email: yup.string().required('Iforme o Email').email('E-Mail invalido'),
  password: yup.string().required('Informe a senha').min(6,'A senha deve ter pelo menos 6 digitos'),
  password_confirm: yup.string().required('Informe a senha').oneOf([yup.ref('password')])

})
export function SignUp() {

  const { control,handleSubmit,formState:{errors} } = useForm<FormDataProps>({
    resolver: yupResolver(singUpSchema)
  })
  const navigation = useNavigation();
  // useForm
  function handleGoBack() {
    navigation.goBack();
  }
  function handleSingUp({name}:FormDataProps) {
    console.log(name)

  }
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack flex={1} padding={10} pb={16}>
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt='Pessoa treinando'
          resizeMode='stretch'
          position="absolute"
          width="100%"
          height="65%"

        />
        <Center my={24}>
          <LogoSvg />
          <Text color="gray.100" fontSize="sm">
            Treine sua mente e o seu corpo
          </Text>
        </Center>
        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Crie sua conta
          </Heading>
          <Controller
            control={control}
            name='name'         
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Nome'
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />      
          <Controller
            control={control}
            name='email'          
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='E-mail'
                keyboardType='email-address'
                autoCapitalize='none'
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />
          <Controller
            control={control}
            name='password'
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Senha'
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />

            )}
          />        
          <Controller
            control={control}
            name='password_confirm'
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Confirmar senha'
                secureTextEntry
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSingUp)}
                returnKeyType='send'
                errorMessage={errors.password_confirm?.message}
              />

            )}
          />

          <Button title='Criar e acessar' onPress={handleSubmit(handleSingUp)}/>
        </Center>
        <Button
          title='Voltar e acessar'
          variant="outline"
          mt={24}
          onPress={handleGoBack} />

      </VStack>
    </ScrollView>

  )

}