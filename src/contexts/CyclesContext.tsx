import { ReactNode, createContext, useState, useReducer } from 'react'

interface CyclesContextProviderProps {
  children: ReactNode
}

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interrupCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cycles, dispach] = useReducer((state: Cycle[], action: any) => {
    if (action.type === 'ADD_NEW_CYCLE') {
      return [...state, action.payload]
    }

    if (action.type === 'INTERRUP_CURRENT_CYCLE') {
      return state.map((cycle) => {
        if (cycle.id === action.payload) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      })
    }
    if (action.type === 'MARK_CURRENT_CYCLE_AS_FINISHED') {
      return state.map((cycle) => {
        if (cycle.id === action.payload) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      })
    }
    return state
  }, [])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    dispach({
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
      payload: activeCycleId,
    })
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    dispach({
      type: 'ADD_NEW_CYCLE',
      payload: newCycle,
    })
    setActiveCycleId(id)
    setAmountSecondsPassed(0)
  }

  function interrupCurrentCycle() {
    dispach({
      type: 'INTERRUP_CURRENT_CYCLE',
      payload: activeCycleId,
    })
    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, interruptedDate: new Date() }
    //     } else {
    //       return cycle
    //     }
    //   }),
    // )
    setActiveCycleId(null)
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        interrupCurrentCycle,
        createNewCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
