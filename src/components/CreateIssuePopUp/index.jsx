import { useContext } from 'react'
import { SeveritiesContext, severityColorMap } from '../../contexts/SeveritiesContext.jsx'
import { useToasts } from '../../hooks/useToasts.js'
import { useTags } from '../../hooks/useTags.js'
import BASE_URL from '../../settings.js'

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

    const handleAddNewTag = (e) => {
        e.preventDefault()
        console.log('hoi')
    }

    return (
        <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Report new issue</h1>
                <button 
                    type="button" 
                    className="btn-close" 
                    onClick={closeModal}
                    data-bs-dismiss="modal" 
                    aria-label="Close"
                />
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
                    <div className='mb-2'><strong>Severity:</strong></div>
                    <div className="d-flex">
                        { severities.map(severity => {
                            return (
                                <div className={`form-check form-check-inline rounded text-bg-${severityColorMap[severity.name]}`}>
                                    <label className='form-check-label p-1 mx-1' key={severity.id}>
                                        <input
                                            type="radio"
                                            className='form-check-input'
                                            name="severity" 
                                            id={severity.name.toLowerCase()}
                                            value={`${severity.id}`}
                                        />
                                        {severity.name}
                                    </label>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="mb-3">
                    <div className='mb-2'><strong>Tags:</strong></div>
                    <div className="mb-3">
                        { tags.list.map((tag, index) => {
                            return (
                                <div className="form-check form-check-inline border rounded">
                                    <label key={index} className='form-check-label p-1 mx-1'>{tag.name}
                                        <input type="checkbox" className='form-check-input' name="tags" value='' />
                                    </label>
                                </div>
                            )
                        })}
                    </div>
                    <div className='input-group mb-3'>
                        <label htmlFor="newtag" className='input-group-text'>Add New Tag:</label>
                        <input type="text" className='form-control' id="newtag" name="name"/>
                        <button type='button' className='btn btn-outline-secondary' onClick={handleAddNewTag}>+</button>
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
