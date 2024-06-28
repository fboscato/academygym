import {VStack,Image} from 'native-base'
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
      <LogoSvg/>
    </VStack>
  )

}