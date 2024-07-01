import { useEffect } from "react"
import { useToast } from "../../hooks/useToast"

function Toast({id, type, message}) {
    const toast = useToast()

    const dismiss = () => {
        toast.removeToast(id)
    }

    useEffect(() => {
        const timer = setTimeout(() => {toast.removeToast(id)}, 5000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <div
            className={`alert z-3 mx-3 alert-${type}`}
            role="alert"
        >
            <h4>{id + ' ' + type}</h4>
            <p>{message}</p>
            <button onClick={dismiss}>
                X
            </button>
        </div>
    )
}

export default Toast
