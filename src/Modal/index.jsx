import {useState} from "react";
import Severity from "../Severity/index.jsx";

export default function Modal({show, title, severity, children}) {

    const [showModal, setShowModal] = useState(show)

    return (
        <>
            {
                showModal &&
                <div className="modal-backdrop fade show"></div>
            }

            <div className={"modal" + (showModal ? ' open d-block' : '')} tabIndex="-1">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">{title}</h1>
                            <div>
                                {
                                    severity &&
                                    <Severity severity={severity} />
                                }
                                <button onClick={() => {setShowModal(false)}} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}