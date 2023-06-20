import { FormContainer, InputMinutesAmount, InputTask } from './styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

export function NewCycleForm() {
  const newCycleFormSchema = zod.object({
    task: zod.string().min(1, 'informe a tarefa'),
    minutesAmount: zod
      .number()
      .min(1, 'O ciclo precisa ser de no mínimo de 5 minutos')
      .max(60, 'O ciclo precisa ser de no máximo de 60 minutos'),
  })
  type NewCycleFormData = zod.infer<typeof newCycleFormSchema> // use do TYPEOF quando é preciso referenciar uma variavel JS no TS.

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em </label>
      <InputTask
        id="task"
        placeholder="Dê um nome para o seu projeto"
        list="task-suggestions"
        disabled={!!activeCycle}
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
        min={1}
        max={60}
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutos</span>
    </FormContainer>
  )
}
