function CreateIssuePopUp({closeModal, makeToast}) {
    const createNewIssue = async (event) => {
        event.preventDefault()
        const formData = new FormData(document.querySelector('#new-issue-form'))
        const sendData = Object.fromEntries(formData)

        const response = await fetch('create-issue-success.json', {
            method: 'POST',
            body: JSON.stringify(sendData)
        })
        const responseData = await response.json()

        if ( response.ok ) {
            makeToast("success", responseData.message)
            closeModal()
        } else {
            makeToast("danger", responseData.message)
        }
    }

    return (
        <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Report new issue</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        onClick={closeModal}></button>
            </div>
            <form className="modal-body" id="new-issue-form">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Your Name</label>
                    <input type="text" className="form-control" id="name" name="name"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="department" className="form-label">Department</label>
                    <select className="form-select" id="department" defaultValue="0" name="department">
                        <option value="0">Please select your department</option>
                        <option value="1">Marketing</option>
                        <option value="2">Sales</option>
                        <option value="3">Operations</option>
                        <option value="4">Engineering</option>
                        <option value="5">Admin</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="summary" className="form-label">Summarise your issue</label>
                    <input type="text" className="form-control" id="summary" name="summary"/>
                    <div className="form-text">Maximum 100 characters</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="issue" className="form-label">Describe your issue</label>
                    <textarea className="form-control" id="issue" rows="15" name="issue"></textarea>
                    <div className="form-text">Please be as descriptive as possible</div>
                </div>
                <div className="mb-3">
                    <div><strong>Severity:</strong></div>
                    <label>
                        <input type="radio" name="severity" value="0"/>
                        <span className="badge text-bg-dark">Critical</span>
                    </label>
                    <label>
                        <input type="radio" name="severity" value="1"/>
                        <span className="badge text-bg-danger">Severe</span>
                    </label>
                    <label>
                        <input type="radio" name="severity" value="2"/>
                        <span className="badge text-bg-warning">Moderate</span>
                    </label>
                    <label>
                        <input type="radio" name="severity" value="3"/>
                        <span className="badge text-bg-success">Low</span>
                    </label>
                    <label>
                        <input type="radio" name="severity" value="4"/>
                        <span className="badge text-bg-info">Info</span>
                    </label>
                    <label>
                        <input type="radio" name="severity" value="9"/>
                        <span className="badge text-bg-secondary">Unknown</span>
                    </label>
                </div>

                <div className="mb-3">
                    <div><strong>Tags:</strong></div>
                    <label>
                        <input type="checkbox" name="tags"/>
                        <span className="badge text-bg-light">Tag 1</span>
                    </label>
                    <label>
                        <input type="checkbox" name="tags"/>
                        <span className="badge text-bg-light">Tag 2</span>
                    </label>
                    <label>
                        <input type="checkbox" name="tags"/>
                        <span className="badge text-bg-light">Tag 3</span>
                    </label>
                    <label>
                        <input type="checkbox" name="tags"/>
                        <span className="badge text-bg-light">Tag 4</span>
                    </label>
                    <label>
                        <input type="checkbox" name="tags"/>
                        <span className="badge text-bg-light">Tag 5</span>
                    </label>
                    <div>
                        <label htmlFor="newtag">Add new tag</label>
                        <input type="text" id="newtag" name="newtag"/>
                    </div>
                </div>
            </form>
            <div className="modal-footer">
                <button role="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal}>Close
                </button>
                <button role="button" className="btn btn-primary" onClick={createNewIssue}>Create</button>
            </div>
        </div>
    )
}

export default CreateIssuePopUp