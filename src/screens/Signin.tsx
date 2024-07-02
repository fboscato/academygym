import { VStack, Image, Center, Text, Heading } from 'native-base'
import BackgroundImg from '@assets/background.png'
import LogoSvg from '../assets/logo.svg'
import { Input } from '@components/Input'
import { Button } from '@components/Button'

export function SignIn() {
  return (
    <VStack flex={1} bg='gray.700' padding={10}>
      <Image
        source={BackgroundImg}
        alt='Pessoa treinando'
        resizeMode='contain'
        position="absolute"
        style={{ width: 755, height: 755 }}
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
        <Button title='Acessar'/>
        <Button title='Criar Conta' variant="outline"/>
      </Center>
    </VStack>
  )

}