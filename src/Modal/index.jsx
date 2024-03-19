import {useEffect, useState} from "react";
import Severity from "../Severity/index.jsx";

export default function Modal({closeModal, title, severity, children}) {

    return (
        <>
            <div className="modal-backdrop fade show" onClick={closeModal}></div>
            <div className="modal open d-block" tabIndex="-1">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">{title}</h1>
                            <div>
                                {
                                    severity &&
                                    <Severity severity={severity} />
                                }
                                <button onClick={closeModal} type="button" className="close" data-dismiss="modal" aria-label="Close">
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