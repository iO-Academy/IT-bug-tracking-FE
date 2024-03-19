import Tags from "../Tags/index.jsx";
import {useState} from "react";

function IssuePopUp({id, title, summary, severity, tags, date_created, comment_count}) {

    const severityColorMap = {
        "Critical": "text-dark",
        "Severe": "text-danger",
        "Moderate": "text-warning",
        "Low": "text-success",
        "Info": "text-info",
        "Unknown": "text-secondary",
    }

    return (
        <div className="modal fade" id="popUpModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">Title of the Ticket</h1>
                        <div>
                            <span className="badge text-bg-warning">Moderate</span>
                            <button type="button" className="btn-close align-middle" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                    </div>
                    <div className="modal-body">
                        <p><strong>Reporter</strong>: Sarah Clarke</p>
                        <p><strong>Department</strong>: Operations</p>
                        <h6>Description:</h6>
                        <p>Bombay. Tabby tiger american bobtail cornish rex. Ocicat tom kitten cougar. Donskoy tomcat
                            russian blue yet sphynx. Panther balinese cheetah munchkin yet birman. Burmese kitten
                            balinese , for norwegian forest burmese and british shorthair. Savannah jaguar savannah
                            maine coon. Devonshire rex. Ragdoll norwegian forest. British shorthair. Abyssinian panther,
                            or tabby, cheetah. Lion abyssinian lion lion but maine coon kitty munchkin. Ocelot turkish
                            angora persian american shorthair turkish angora but burmese.</p>
                        <p>Ocicat british shorthair burmese scottish fold yet leopard. Bobcat maine coon savannah and
                            lynx. Cornish rex siberian yet thai british shorthair scottish fold cougar lynx. Kitten.
                            Leopard maine coon yet thai maine coon himalayan. </p>
                        <div className="mb-3">
                            <p>Tags</p>
                            <span className="badge text-bg-light">Tag</span><span
                            className="badge text-bg-light">Tag</span><span
                            className="badge text-bg-light">Tag</span><span
                            className="badge text-bg-light">Tag</span><span
                            className="badge text-bg-light">Tag</span><span className="badge text-bg-light">Tag</span>
                        </div>

                        <div className="accordion" id="accordionExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button"
                                            data-bs-toggle="collapse" data-bs-target="#collapseOne">
                                        Conversation
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse">
                                    <div className="accordion-body">
                                        <div className="mb-3 border-bottom">
                                            <h6>Amy Robson <small className="float-end">10/05/2023 13:00</small></h6>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                                commodo consequat.</p>
                                        </div>
                                        <div className="mb-3 border-bottom">
                                            <h6>Amy Robson <small className="float-end">10/05/2023 13:02</small></h6>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                                commodo consequat.</p>
                                        </div>
                                        <div className="mb-3 border-bottom">
                                            <h6>Amy Robson <small className="float-end">10/05/2023 13:05</small></h6>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                                commodo consequat.</p>
                                        </div>
                                        <div className="text-end">
                                            <button className="btn btn-primary">Add comment</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-success">Mark as complete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IssuePopUp;