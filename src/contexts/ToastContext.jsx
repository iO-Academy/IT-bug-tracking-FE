import { createContext, useReducer, useState } from "react"
import { toastReducer } from '../reducers/toastReducer.js'
import Toasts from '../components/Toasts/index.jsx'

export const ToastContext = createContext()

export function ToastContextProvider({children}) {
    const [state, dispatch] = useReducer(toastReducer, { toasts: [] })

    const addToast = (type, message) => {
        const id = Date.now() + Math.random()
        dispatch({ type: "ADD", payload: { id, message, type } })
    }
    
    const removeToast = (id) => {
        dispatch({ type:"REMOVE", payload: id })
    }

    return (
        <ToastContext.Provider value={{addToast, removeToast}}>
            <Toasts toasts={ state.toasts } />
            {children}
        </ToastContext.Provider>
    )
}
