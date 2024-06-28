import {VStack,Image, Center, Text} from 'native-base'
import BackgroundImg from '@assets/background.png'

// import LogoSgv from '@assets/logo.svg'
import LogoSvg from '../assets/logo.svg'
export function SignIn(){
  return (
    <VStack flex={1} bg='gray.700'>
      <Image 
        source={BackgroundImg}
        alt='Pessoa treinando' 
        resizeMode='contain'
        position="absolute"
        style={{width:755, height:755}}
      />
      <Center my={24}>
      <LogoSvg/>
      <Text color="gray.100">
      Treine sua mente e o seu corpo
      </Text>
      </Center>
    </VStack>
  )

}