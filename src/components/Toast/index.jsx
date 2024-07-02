import { useEffect } from "react"
import { useToast } from "../../hooks/useToast.js"

function Toast({id, type, message}) {
    const toaster = useToast()

    const handleDismiss = () => {
        toaster.remove(id)
    }

    useEffect(() => {
        const timer = setTimeout(() => {toaster.remove(id)}, 5000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <div
            className={`toast d-block align-items-center border-0`}
            role="alert"
            aria-live="assertive" aria-atomic="true"
        >
            <div className={`toast-header text-bg-${type}`}></div>
            <div className="d-flex">
                <div className="toast-body">
                    {message}
                </div>
                <button 
                    type="button" 
                    className="btn-close me-2 m-auto"
                    onClick={handleDismiss}
                    aria-label="Close"
                />
            </div>
        </div>
    )
}

export default Toast
