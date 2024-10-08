import { HistoryCard } from "@components/HistoryCard";
import { Loading } from "@components/Loading";
import { ScreenHeader } from "@components/ScreenHeader";
import { HistoryByDayDTO } from "@dtos/HistoryByDayDTO";
import { useFocusEffect } from "@react-navigation/native";
import { api } from "@services/api";
import { AppErro } from "@utils/AppError";
import { Heading, SectionList, Text, Toast, useToast, VStack } from "native-base";
import { useCallback, useState } from "react";

export function History() {
  const [isLoading, setIsLoading] = useState(true)

  const toast = useToast()
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([])
  async function fetcHistory() {
    try {
      setIsLoading(true)
      const resposta = await api.get('/history')
      setExercises(resposta.data)
    } catch (error) {
      const isAppError = error instanceof AppErro;
      const title = isAppError ? error.menssage : 'Não foi possível carregar o histórico'
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }
  useFocusEffect(useCallback(() => {
    fetcHistory()
  }, []))
  return (
    <VStack flex={1}>
      <ScreenHeader
        title="Historico de Exercícios"
      />
      {isLoading ? <Loading /> :
        <SectionList
          sections={exercises}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <HistoryCard data={item} />
          )}
          renderSectionHeader={({ section }) => (
            <Heading color="gray.200" fontSize="md" mt={10} mb={3} fontFamily='heading'>
              {section.title}
            </Heading>
          )}
          px={8}
          contentContainerStyle={exercises.length === 0 && { flex: 1, justifyContent: 'center' }}
          ListEmptyComponent={() => (
            <Text color="gray.100" textAlign="center">
              Não há exercícios registrado ainda.{'\n'}
              Vamos fazer exercícios hoje?
            </Text>
          )}
          showsVerticalScrollIndicator={false}
        />}
    </VStack>
  )
}