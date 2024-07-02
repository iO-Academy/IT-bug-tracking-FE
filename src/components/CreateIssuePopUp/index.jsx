import { useContext } from 'react'
import { SeveritiesContext, severityColorMap } from '../../contexts/SeveritiesContext.jsx'
import { useToasts } from '../../hooks/useToasts.js'
import { useTags } from '../../hooks/useTags.js'

function CreateIssuePopUp({ closeModal }) {
    const severities = useContext(SeveritiesContext)
    const tags = useTags()
    const toaster = useToasts()

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
            toaster.success(responseData.message)
            closeModal()
        } else {
            toaster.error(responseData.message)
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
                    <div className="d-flex">
                        { severities.map(severity => {
                            return (
                                <label className='pe-2' key={severity.id}>
                                    <div className={`badge ${severityColorMap[severity.name]}`}>
                                        <input
                                            type="radio"
                                            className='me-1'
                                            name="severity" 
                                            id={severity.name.toLowerCase()}
                                            value={`${severity.id}`}
                                        />
                                        {severity.name}
                                    </div>
                                </label>
                            )
                        })}
                    </div>
                </div>
                <div className="mb-3">
                    <div><strong>Tags:</strong></div>
                    <div className="d-flex">
                        {
                            tags.list.map((tag, index) => {
                                return (
                                    <label key={index}>
                                        <input type="checkbox" name="tags"/>
                                        <span className="badge text-bg-light">{tag.name}</span>
                                    </label>
                                )
                            })
                        }
                    </div>
                    <div>
                        <label htmlFor="newtag">Add new tag</label>
                        <input type="text" id="newtag" name="name"/>
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
