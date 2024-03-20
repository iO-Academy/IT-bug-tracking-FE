export default function Modal({closeModal, children}) {

    return (
        <>
            <div className="modal-backdrop fade show" onClick={closeModal}></div>
            <div className="modal open d-block" tabIndex="-1">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}