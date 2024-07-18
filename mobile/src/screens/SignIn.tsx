import { useNavigation } from '@react-navigation/native';
import { VStack, Image, Center, Text, Heading, ScrollView, Box, useToast } from 'native-base';
import * as yup from 'yup';
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';
import LogoSvg from '../assets/logo.svg';
import BackgroundImg from '@assets/background3.png';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@hooks/useAuth'
import { AppErro } from '@utils/AppError';

type FormData = {
  email: string
  password: string
}

const singInSchema = yup.object({
  email: yup.string().required('Informe o E-Mail'),
  password: yup.string().required('Informe a senha').min(6, 'A senha deve ter pelo menos 6 digitos'),
})

export function SignIn() {
  const { singIn } = useAuth()
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const toast = useToast()
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(singInSchema)
  })
  function handleNewAccount() {
    navigation.navigate('singUp');
  }
  async function handleSinIn({ email, password }: FormData) {
    try {
      await singIn(email, password)
      console.log("vem")
    } catch (error) {
      const isAppError = error instanceof AppErro
      console.log("error", error)
      const title = isAppError ? error.menssage : 'Usuaro ou senha esta errado'
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'

      })
    }
  }

  return (
    <Box flex={1} position="relative">
      <Image
        source={BackgroundImg}
        defaultSource={BackgroundImg}
        alt="Pessoa treinando"
        resizeMode="cover"
        position="absolute"
        top={0}
        bottom={0}
        left={0}
        right={0}
        width="100%"
        height="65%"
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <VStack flex={1} px={10} pb={16} position="relative">
          <Center my={24}>
            <LogoSvg />
            <Text color="gray.100" fontSize="sm">
              Treine sua mente e o seu corpo
            </Text>
          </Center>
          <Center>
            <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
              Acesse sua conta
            </Heading>
            <Controller
              control={control}
              name='email'
              rules={{ required: 'Informe o e-mail' }}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.email?.message}
                />
              )}
            >
            </Controller>
            <Controller
              control={control}
              name='password'
              rules={{ required: 'Informe a senha' }}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Senha"
                  secureTextEntry
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.email?.message}
                />
              )}
            >
            </Controller>
            <Button title="Acessar" onPress={handleSubmit(handleSinIn)} />
          </Center>
          <Center mt={24}>
            <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
              Ainda não tem acesso?
            </Text>
            <Button title="Criar Conta" variant="outline" onPress={handleNewAccount} />
          </Center>
        </VStack>
      </ScrollView>
    </Box>
  );
}
