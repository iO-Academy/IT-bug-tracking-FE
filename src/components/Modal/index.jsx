export default function Modal({closeModal, children}) {

    const close = (event) => {
        if (event.target.id === 'modal-background') {
            closeModal()
        }
    }

    return (
        <>
            <div className="modal-backdrop fade show"></div>
            <div className="modal open d-block" id="modal-background" onClick={close} tabIndex="-1">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}