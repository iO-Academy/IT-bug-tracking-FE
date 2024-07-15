import { useContext, useRef } from 'react'
import { SeveritiesContext, severityColorMap } from '../../contexts/SeveritiesContext.jsx'
import { useToasts } from '../../hooks/useToasts.js'
import { useTags } from '../../hooks/useTags.js'
import BASE_URL from '../../settings.js'

function CreateIssuePopUp({ closeModal }) {
    const severities = useContext(SeveritiesContext)
    const tags = useTags()
    const toaster = useToasts()
    const formRef = useRef()
    const newTagTextInput = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        createNewIssue(formData)
    }

    const createNewIssue = async (formData) => {
        let data = {}
        data.name = formData.get('name')
        data.department = formData.get('department')
        data.title = formData.get('title')
        data.description = formData.get('description')
        data.severity = formData.get('severity')
        data.tags = formData.getAll('tags')

        try {
            const response = await fetch(`${BASE_URL}/report.php`, {
                method: 'POST',
                body: JSON.stringify(data)
            })
            const responseData = await response.json()
            
            if ( response.ok ) {
                toaster.success(responseData.message)
                closeModal()
            } else {
                toaster.error(responseData.message)
            }
        } catch (error) {
            console.log(error)
            toaster.error('Error in response when creating issue. Check console for details.')
        }
    }

    const handleAddNewTag = async (e) => {
        e.preventDefault()
        const sendData = { name: newTagTextInput.current.value }

        try {
            const response = await fetch(`${BASE_URL}/tag.php`, {
                method: 'POST',
                body: JSON.stringify(sendData)
            })
            const responseData = await response.json()
    
            if ( response.ok ) {
                toaster.success(`New tag "${responseData.name}" created`)
                newTagTextInput.current.value = ''
                tags.refresh()
            } else {
                toaster.error('Error creating tag. ' + responseData.message)
            }
        } catch (error) {
            console.log(error)
            toaster.error('Error in response when creating tag. Check console for details.')
        }
    }

    return (
        <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5">Report new issue</h1>
                <button 
                    type="button" 
                    className="btn-close" 
                    onClick={closeModal}
                    data-bs-dismiss="modal" 
                    aria-label="Close"
                />
            </div>
            <form className="modal-body" id="new-issue-form" ref={formRef} onSubmit={handleSubmit} action=''>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Your Name</label>
                    <input type="text" className="form-control" id="name" name="name" maxLength={255} />
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
                    <label htmlFor="title" className="form-label">Summarise your issue</label>
                    <input type="text" className="form-control" id="title" name="title" maxLength={100} />
                    <div className="form-text">Maximum 100 characters</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Describe your issue</label>
                    <textarea className="form-control" id="description" rows="15" name="description" maxLength={65535} ></textarea>
                    <div className="form-text">Please be as descriptive as possible</div>
                </div>
                <div className="mb-3">
                    <div className="mb-2"><strong>Severity:</strong></div>
                    <div className="d-flex">
                        { severities.map(severity => {
                            return (
                                <div className={`form-check form-check-inline rounded text-bg-${severityColorMap[severity.name]}`} key={severity.id}>
                                    <label className="form-check-label p-1 mx-1">
                                        <input
                                            type="radio"
                                            className="form-check-input"
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
                    <div className="mb-2"><strong>Tags:</strong></div>
                    <div className="mb-3">
                        { tags.list.map((tag, index) => {
                            return (
                                <div className="form-check form-check-inline border rounded">
                                    <label key={index} className="form-check-label p-1 mx-1">{tag.name}
                                        <input type="checkbox" className="form-check-input" name="tags" value={tag.id} />
                                    </label>
                                </div>
                            )
                        })}
                    </div>
                    <div className="input-group mb-3">
                        <label htmlFor="newtag" className="input-group-text">Add New Tag:</label>
                        <input type="text" className="form-control" id="newtag" name="new-tag-name" maxLength={255} ref={newTagTextInput} />
                        <button type="button" role="button" className="btn btn-outline-secondary" onClick={handleAddNewTag}>+</button>
                    </div>
                </div>
                <div className="modal-footer">
                    <button role="button" type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal}>Close</button>
                    <button role="button" type="submit" className="btn btn-primary">Create</button>
                </div>
            </form>
        </div>
    )
}

export default CreateIssuePopUp
