import Toast from "../Toast"

function Toasts({ toasts }) {
    return (
        <div className="w-25 max-vw-25 position-fixed bottom-0 end-0">
            {toasts.map((toast) => {
                return <Toast key={toast.id} {...toast} />
            })}
        </div>
    )
}

export default Toasts
