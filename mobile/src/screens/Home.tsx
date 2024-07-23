import { ExerciseCard } from "@components/ExerciseCard";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { useNavigation } from "@react-navigation/native";
import { AppNavegatorRoutesPropos } from "@routes/app.routes";
import { AppErro } from "@utils/AppError";
import { FlatList, Heading, HStack, Text, Toast, useToast, VStack } from "native-base";
import { useState } from "react";

export function Home() {
  const [group, setGroup] = useState(['Costas', 'Bíceps', 'Tríceps', 'ombro',])
  const [exercises, setExercises] = useState(['Puxada frontal', 'Remada curvada', 'Remada unilateral', 'Levantamento terra'])
  const [groupSelected, setGroupSelected] = useState('Costas')
  const toast = useToast()
  const navegation = useNavigation<AppNavegatorRoutesPropos>()
  function handleOptionExerciseDetails() {
    navegation.navigate('exercise')
  }
  async function fetchGroup() {
    try {

    } catch (error) {
      const isAppError = error instanceof AppErro;
      const title = isAppError ? error.menssage : 'Não foi possível carregar os groupos musculares'
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }
  return (
    <VStack flex={1}>
      <HomeHeader />
      <FlatList
        data={group}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected.toUpperCase() === item.toUpperCase()}
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxH={10}
        minH={10}
      />
      <VStack flex={1} px={8}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md" fontFamily='heading'>
            Exercícios
          </Heading>
          <Text color="gray.200" fontSize="sm">
            {exercises.length}
          </Text>
        </HStack>
        <FlatList
          data={exercises}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <ExerciseCard
              onPress={handleOptionExerciseDetails}
            />
          )}
          showsHorizontalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
    </VStack>
  )
}