import { createContext, useReducer } from 'react'
import Toasts from '../components/Toasts/index.jsx'
import { toastReducer } from '../reducers/toastReducer.js'

export const ToastContext = createContext()

export function ToastContextProvider({children}) {
    const [state, dispatch] = useReducer(toastReducer, { toasts: [] })

    const add = (type, message) => {
        const id = Date.now() + Math.random()
        dispatch({ type: 'ADD', payload: { id, type, message }})
    }
    
    const success = (message) => {
        add('success', message)
    }

    const error = (message) => { 
        add('danger', message)
    }

    const remove = (id) => {
        dispatch({ type: 'REMOVE', payload: id })
    }

    return (
        <ToastContext.Provider value={{success, error, remove}}>
            <Toasts toasts={ state.toasts } />
            {children}
        </ToastContext.Provider>
    )
}
