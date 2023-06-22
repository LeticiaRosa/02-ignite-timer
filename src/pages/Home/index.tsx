import { HandPalm, Play } from 'phosphor-react'
import { ButtonStart, ButtonStop, HomeContainer } from './styles'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { NewCycleForm } from './components/NewCycleForm'
import { CountDown } from './components/CountDown'
import { CyclesContext } from '../../contexts/CyclesContext'
import { useContext } from 'react'

// controlled / uncontrolled

// interface NewCycleFormData {
//   task: string
//   minutesAmount: number
// }

export function Home() {
  const { activeCycle, createNewCycle, interrupCurrentCycle } =
    useContext(CyclesContext)
  const newCycleFormSchema = zod.object({
    task: zod.string().min(1, 'informe a tarefa'),
    minutesAmount: zod
      .number()
      .min(1, 'O ciclo precisa ser de no mínimo de 5 minutos')
      .max(60, 'O ciclo precisa ser de no máximo de 60 minutos'),
  })
  type NewCycleFormData = zod.infer<typeof newCycleFormSchema> // use do TYPEOF quando é preciso referenciar uma variavel JS no TS.

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  const { handleSubmit, watch, reset } = newCycleForm

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <CountDown />

        {activeCycle ? (
          <ButtonStop type="button" onClick={interrupCurrentCycle}>
            <HandPalm />
            Interromper
          </ButtonStop>
        ) : (
          <ButtonStart type="submit" disabled={isSubmitDisabled}>
            <Play />
            Começar
          </ButtonStart>
        )}
      </form>
    </HomeContainer>
  )
}
