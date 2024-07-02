import { useEffect } from "react"
import { useToast } from "../../hooks/useToast.js"

function Toast({id, type, message}) {
    const toaster = useToast()

    const dismiss = () => {
        toaster.remove(id)
    }

    useEffect(() => {
        const timer = setTimeout(() => {toaster.remove(id)}, 5000)

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
