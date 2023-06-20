import styled from 'styled-components'

export const HomeContainer = styled.main`
  flex: 1;
  display: flex;

  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${(props) => props.theme['gray-100']};
  font-size: 1.125rem;
  font-weight: bold;
  flex-wrap: wrap;
`

export const BaseButtonCountDown = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem;
  color: ${(props) => props.theme['gray-100']};

  border-radius: 8px;
  border-style: none;
  border: 0;

  font-size: 1rem;
  font-weight: bold;
  gap: 0.5rem;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`

export const ButtonStart = styled(BaseButtonCountDown)`
  background-color: ${(props) => props.theme['green-500']};
  &:not(:disabled):hover {
    background-color: ${(props) => props.theme['green-700']};
  }
`

export const ButtonStop = styled(BaseButtonCountDown)`
  background-color: ${(props) => props.theme['red-500']};
  &:not(:disabled):hover {
    background-color: ${(props) => props.theme['red-700']};
  }
`

const BaseInput = styled.input`
  background: transparent;
  height: 2.5rem;
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme['gray-500']};
  font-weight: bold;
  font-size: 1.125rem;
  padding: 0 0.5rem;
  color: ${(props) => props.theme['gray-100']};

  &:focus {
    box-shadow: none;
  }

  &::placeholder {
    color: ${(props) => props.theme['gray-500']};
  }
`
