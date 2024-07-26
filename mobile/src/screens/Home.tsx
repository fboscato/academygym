import { ExerciseCard } from "@components/ExerciseCard";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { Loading } from "@components/Loading";
import { ExercisesDTO } from "@dtos/ExerciseDTO";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavegatorRoutesPropos } from "@routes/app.routes";
import { api } from "@services/api";
import { AppErro } from "@utils/AppError";
import { FlatList, Heading, HStack, Text, Toast, useToast, VStack } from "native-base";
import { useCallback, useEffect, useState } from "react";

export function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [group, setGroup] = useState<string[]>([])
  const [exercises, setExercises] = useState<ExercisesDTO[]>([])
  const [groupSelected, setGroupSelected] = useState('andebraço')
  const toast = useToast()
  const navegation = useNavigation<AppNavegatorRoutesPropos>()

  function handleOptionExerciseDetails(exerciseId: string) {
    navegation.navigate('exercise',{exerciseId})
  }

  async function fetchGroup() {
    try {
      const response = await api.get("/groups")
      setGroup(response.data)
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
  async function fetchExercisesByGroup() {
    try {
      setIsLoading(true)
      const response = await api.get(`/exercises/bygroup/${groupSelected}`)
      setExercises(response.data)


    } catch (error) {
      const isAppError = error instanceof AppErro;
      const title = isAppError ? error.menssage : 'Não foi possível carregar os exercícios'
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchGroup()
  }, [])
  useFocusEffect(useCallback(() => {
    fetchExercisesByGroup()
  }, [groupSelected]))
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
      {
        isLoading ? <Loading /> :

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
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <ExerciseCard
                  data={item}
                  onPress={() => handleOptionExerciseDetails(item.id)}
                />
              )}
              showsHorizontalScrollIndicator={false}
              _contentContainerStyle={{ paddingBottom: 20 }}
            />
          </VStack>
      }
    </VStack>
  )
}