import { VStack, Image, Center, Text, Heading, ScrollView } from 'native-base'
import BackgroundImg from '@assets/background.png'
import LogoSvg from '../assets/logo.svg'
import { Input } from '@components/Input'
import { Button } from '@components/Button'

export function SignIn() {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack flex={1}  padding={10} pb={16}>
        <Image
          source={BackgroundImg}
          alt='Pessoa treinando'
          resizeMode='contain'
          position="absolute"
          ml={6}
        />
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
          <Input
            placeholder='E-mail'
            keyboardType='email-address'
            autoCapitalize='none'
          />
          <Input
            placeholder='Senha'
            secureTextEntry
          />
          <Button title='Acessar' />
        </Center>
        <Center mt={24}>
          <Text color="gray.100" fontSize='sm' mb={3} fontFamily={'body'}>
            Aunda não tem acesso?
          </Text>
          <Button title='Criar Conta' variant="outline" />
        </Center>
      </VStack>
    </ScrollView>

  )

}