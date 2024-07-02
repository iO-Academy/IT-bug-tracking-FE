import { createContext, useState } from "react"
import Toasts from '../components/Toasts/index.jsx'

export const ToastContext = createContext()

export function ToastContextProvider({children}) {
    const [state, setState] = useState({ toasts: [] })

    const add = (type, message) => {
        const id = Date.now() + Math.random()
        setState({
            ...state,
            toasts: [...state.toasts, { id, type, message }],
        })
    }
    
    const remove = (id) => {
        const updatedToasts = state.toasts.filter(
            (toast) => toast.id !== id
        );
        setState({
            ...state,
            toasts: updatedToasts
        })
    }

    return (
        <ToastContext.Provider value={{add, remove}}>
            <Toasts toasts={ state.toasts } />
            {children}
        </ToastContext.Provider>
    )
}
