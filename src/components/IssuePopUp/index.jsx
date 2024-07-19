import {useEffect, useState} from 'react'
import Collapse from '../Collapse/index.jsx'
import IssueComment from '../IssueComment/index.jsx'
import { severityColorMap } from '../../contexts/SeveritiesContext.jsx'
import { useToasts } from '../../hooks/useToasts.js'
import BASE_URL from '../../settings.js'

const departmentIdMap = {
    0: 'Unknown',
    1: 'Marketing',
    2: 'Sales',
    3: 'Operations',
    4: 'Engineering',
    5: 'Admin'
}

function IssuePopUp({ closeModal, id }) {
    const [issue, setIssue] = useState(null)
    const [error, setError] = useState(false)
    const [showNewCommentForm, setShowNewCommentForm] = useState(false)
    const [needsRefresh, setNeedsRefresh] = useState(Date.now())
    const toaster = useToasts()

    const getIssue = async (id) => {
        const params = new URLSearchParams({id: id})

        try {
            const response = await fetch(`${BASE_URL}/issue.php?${params}`)
            const data = await response.json()

            if (response.ok) {
                setIssue(data)
                setError(false)
            } else {
                console.log('Unable to fetch issue data.\n' + data.message)
                toaster.error('Unable to fetch issue data. \n' + data.message)
                setIssue(null)
                setError(true)
            }
        } catch (error) {
            console.log(error)
            toaster.error('Unable to fetch issue data. Check console for details.')
            setIssue(null)
            setError(true)
        }
    }

    useEffect(() => {
        if (id) {
            getIssue(id)
        }
    }, [id, needsRefresh]);

    const toggleNewCommentForm = () => setShowNewCommentForm(!showNewCommentForm)

    const postNewComment = async (e) => {
        e.preventDefault()
        const commentFormData = new FormData(e.target)
        const sendData = Object.fromEntries(commentFormData)
        const params = new URLSearchParams({id: id})

        try {
            const response = await fetch(`${BASE_URL}/comment.php?${params}`, {
                method: 'POST',
                body: JSON.stringify(sendData)
            })
            const responseData = await response.json()
    
            if ( response.ok ) {
                toaster.success(responseData.message)
                setShowNewCommentForm(false)
                setNeedsRefresh(Date.now())
            } else {
                toaster.error(responseData.message)
            }
        } catch (error) {
            console.log(error)
            toaster.error(`Error in response when posting comment to issue ${id}. Check console for details.`)
        }
    }

    const markComplete = async (e) => {
        e.preventDefault()
        const params = new URLSearchParams({id: id})

        try {
            const response = await fetch(`${BASE_URL}/complete.php?${params}`)
            const responseData = await response.json()
    
            if ( response.ok ) {
                toaster.success(responseData.message)
                closeModal()
            } else {
                toaster.error(responseData.message)
            }
        } catch (error) {
            console.log(error)
            toaster.error(`Error in response when marking issue ${id} as complete. Check console for details.`)
        }
    }

    if (issue) {
        return (
            <>
                <div className="modal-header">
                    <h1 className="modal-title fs-5">{issue.title}</h1>
                    <div className="text-end">
                        <span className={`badge align-middle me-3 text-bg-${severityColorMap[issue.severity]}`}>{issue.severity}</span>
                        <button 
                            type="button" 
                            className="btn-close align-middle"
                            data-dismiss="modal" 
                            aria-label="Close"
                            onClick={closeModal}
                        />
                    </div>
                </div>
                <div className="modal-body">
                    <div className="row">
                        <h5 className="col-3">Reporter:</h5> 
                        <p className="col-9">{issue.reporter}</p>
                    </div>
                    <div className="row">
                        <h5 className="col-3">Department:</h5> 
                        <p className="col-9">{departmentIdMap[issue.department]}</p>
                    </div>
                    <div className="row">
                        <h5 className="col-3">Created:</h5> 
                        <p className="col-9">{issue.date_created}</p>
                    </div>
                    <div className="row">
                        <h5 className="mb-3">Description:</h5>
                        <div className="mb-3">
                            { issue.description.split('\n\n').map((paragraph, index) => {
                                return <p key={index} >{paragraph}</p>
                            })}
                        </div>
                    </div>
                    <Collapse header={'Conversation'} comments={issue.comments}>
                        {
                            issue.comments.map((comment, index) => <IssueComment key={index} comment={comment} />)
                        }
                        {
                            showNewCommentForm ? (
                                <>
                                    <h6>Add comment:</h6>
                                    <form id="comment-form" onSubmit={postNewComment}>
                                        <div className="row mb-3">
                                            <label className="col-2 col-form-label" htmlFor="comment-name">Name:</label>
                                            <div className="col-10">
                                                <input type="text" className="form-control" id="comment-name" name="name" />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label className="col-2 col-form-label" htmlFor="comment-input">Comment:</label>
                                            <div className="col-10">
                                                <textarea className="form-control" id="comment-input" name="comment" />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-12 text-end">
                                                <button className="col-2 btn btn-secondary ms-3" type="button" onClick={toggleNewCommentForm}>Cancel</button>
                                                <button className="col-2 btn btn-primary ms-3" type="submit">Post</button>
                                            </div>
                                        </div>
                                    </form>
                                </>
                            ) : (
                                <div className="text-end">
                                    <button className="btn btn-primary" type="button" onClick={toggleNewCommentForm}>Add Comment</button>
                                </div>
                            )
                        }
                    </Collapse>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-success" onClick={markComplete} >Mark as complete</button>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className="modal-header">
                    <h1 className="modal-title fs-5">{!error ?  'Loading Issue data...' : 'Unable to load Issue data.'}</h1>
                    <div className="text-end">
                        <button 
                            type="button" 
                            className="btn-close align-middle"
                            data-dismiss="modal" 
                            aria-label="Close"
                            onClick={closeModal}
                        />
                    </div>
                </div>
                <div className="modal-body">
                    <p className='text-secondary'>{!error ? 'Please wait...' : 'Please try again.'}</p>
                </div>
                <div className="modal-footer"></div>
            </>
        )
    }
}

export default IssuePopUp;
