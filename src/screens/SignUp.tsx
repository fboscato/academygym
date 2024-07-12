import { VStack, Image, Center, Text, Heading, ScrollView } from 'native-base'
import BackgroundImg from '@assets/background3.png'
import LogoSvg from '../assets/logo.svg'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import {} from '@react-hook-form'

export function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();
  // useForm
  function handleGoBack() {
    navigation.goBack();
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
          <Input
            placeholder='Nome'
            onChangeText={setName}
          />
          <Input
            placeholder='E-mail'
            keyboardType='email-address'
            autoCapitalize='none'
            
          />
          <Input
            placeholder='Senha'
            secureTextEntry
            
          />
           <Input
            placeholder='Confirme a senha'
            secureTextEntry
            
          />
          <Button title='Criar e acessar' />
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