import { useNavigation } from '@react-navigation/native';
import { VStack, Image, Center, Text, Heading, ScrollView, Box } from 'native-base';

import { AuthNavigatorRoutesProps } from '@routes/auth.routes';

import LogoSvg from '../assets/logo.svg';
import BackgroundImg from '@assets/background3.png';

import { Input } from '@components/Input';
import { Button } from '@components/Button';

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleNewAccount() {
    navigation.navigate('singUp');
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
            <Input
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input
              placeholder="Senha"
              secureTextEntry
            />
            <Button title="Acessar" />
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
