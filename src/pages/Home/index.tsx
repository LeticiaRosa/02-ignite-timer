import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import {
  ButtonStart,
  CountContainer,
  FormContainer,
  HomeContainer,
  InputMinutesAmount,
  InputTask,
  Separator,
} from './styles'

// controlled / uncontrolled

const newCycleFormSchema = zod.object({
  task: zod.string().min(1, 'informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo de 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo de 60 minutos'),
})

export function Home() {
  const { register, handleSubmit, watch, formState } = useForm({
    resolver: zodResolver(newCycleFormSchema),
  })

  function handleCreateNewCycle(data: any) {
    console.log(data)
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  console.log(formState.errors)
  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em </label>
          <InputTask
            id="task"
            placeholder="Dê um nome para o seu projeto"
            list="task-suggestions"
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Projeto Teste 1" />
            <option value="Projeto Teste 2" />
            <option value="Projeto Teste 3" />
            <option value="Projeto Teste 4" />
          </datalist>

          <label htmlFor="minutesAmount"> durante </label>
          <InputMinutesAmount
            type="number"
            placeholder="00"
            step={5}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos</span>
        </FormContainer>

        <CountContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountContainer>

        <ButtonStart type="submit" disabled={isSubmitDisabled}>
          <Play />
          Começar
        </ButtonStart>
      </form>
    </HomeContainer>
  )
}
