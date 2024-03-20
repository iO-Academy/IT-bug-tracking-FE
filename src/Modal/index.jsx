export default function Modal({closeModal, children}) {

    const closeMe = event => {
        if (event.target.id === 'me') {
            console.log('carrot')
            closeModal()
        }
    }

    return (
        <>
            <div className="modal-backdrop fade show"></div>
            <div className="modal open d-block" id="me" onClick={closeMe} tabIndex="-1">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}