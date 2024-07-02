import Toast from "../Toast"

function Toasts({ toasts }) {
    return (
        <div className="toast-container p-4 position-fixed bottom-0 end-0">
            {toasts.map((toast) => {
                return <Toast key={toast.id} {...toast} />
            })}
        </div>
    )
}

export default Toasts
