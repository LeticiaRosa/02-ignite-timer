import { Play } from 'phosphor-react'
import {
  CountContainer,
  FormContainer,
  HomeContainer,
  Separator,
} from './styles'

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em </label>
          <input id="task" />

          <label htmlFor="minutesAmount"> durante </label>
          <input id="minutesAmount" type="number" />

          <span>minutos</span>
        </FormContainer>

        <CountContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountContainer>

        <button type="submit">
          <Play />
          Começar
        </button>
      </form>
    </HomeContainer>
  )
}
