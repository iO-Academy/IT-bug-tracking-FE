import { useRef } from 'react'
import { useToasts } from '../../hooks/useToasts.js'
import BASE_URL from '../../settings.js'

function CreateIssuePopUp({ closeModal }) {
    const toaster = useToasts()
    const formRef = useRef()

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
        data.severity = 0

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
                <div className="modal-footer">
                    <button role="button" type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal}>Close</button>
                    <button role="button" type="submit" className="btn btn-primary">Create</button>
                </div>
            </form>
        </div>
    )
}

export default CreateIssuePopUp
