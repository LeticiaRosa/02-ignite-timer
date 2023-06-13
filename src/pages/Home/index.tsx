import { Play } from 'phosphor-react'
import {
  ButtonStart,
  CountContainer,
  FormContainer,
  HomeContainer,
  InputMinutesAmount,
  InputTask,
  Separator,
} from './styles'

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em </label>
          <InputTask
            id="task"
            placeholder="Dê um nome para o seu projeto"
            list="task-suggestions"
          />

          <datalist id="task-suggestions">
            <option value="Projeto Teste 1" />
            <option value="Projeto Teste 2" />
            <option value="Projeto Teste 3" />
            <option value="Projeto Teste 4" />
          </datalist>

          <label htmlFor="minutesAmount"> durante </label>
          <InputMinutesAmount
            id="minutesAmount"
            type="number"
            placeholder="00"
            step={5}
            min={5}
            max={60}
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

        <ButtonStart type="submit">
          <Play />
          Começar
        </ButtonStart>
      </form>
    </HomeContainer>
  )
}
