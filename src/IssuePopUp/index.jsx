import Tags from "../Tags/index.jsx";
import React, {useEffect, useState} from "react";
import Collapse from "../Collapse/index.jsx";
import IssueComment from "../IssueComment/index.jsx";

function IssuePopUp({closeModal, id}) {
    const [issue, setIssue] = useState(null)
    const [issueId, setIssueId] = useState(null)
    const [commentToggle, setCommentToggle] = useState(false)
    const [newCommentToggle, setNewCommentToggle] = useState(false)

    const severityColorMap = {
        "Critical": "dark",
        "Severe": "danger",
        "Moderate": "warning",
        "Low": "success",
        "Info": "info",
        "Unknown": "secondary",
    }

    const getIssue = async (id) => {
        const response = await fetch('issue.json')
        const data = await response.json()
        setIssue(data)
    }

    useEffect(() => {
        setIssueId(id)
        getIssue(issueId)
    }, [id]);

    const toggleComments = () => setCommentToggle(!commentToggle)

    const toggleNewComment = () => setNewCommentToggle(!newCommentToggle)

    const postNewComment = async (e) => {
        e.preventDefault()
        const commentFormData = new FormData(document.querySelector('#comment-form'))
        const sendData = Object.fromEntries(commentFormData)

        const response = await fetch('post-comment-success.json', {
            method: 'POST',
            body: JSON.stringify(sendData)
        })
        const responseData = await response.json()

        if ( response.ok ) {
            // makeToast("success", responseData.message)
            setNewCommentToggle(false)
        } else {
            // makeToast("danger", responseData.message)
        }
    }

    const markComplete = async () => {
        const params = new URLSearchParams({id: issueId})
        const response = await fetch(`complete.json?${params}`)
        const responseData = await response.json()

        if ( response.ok ) {
            // makeToast("success", responseData.message)
            closeModal()
        } else {
            // makeToast("danger", responseData.message)
        }
    }

    if (issue != null) {
        return (
            <>
                <div className="modal-header">
                    <h1 className="modal-title fs-5">{issue.title}</h1>
                    <div className="text-end">
                        <span className={`badge text-end align-middle me-3 text-bg-${severityColorMap[issue.severity]}`}>{issue.severity}</span>
                        <button onClick={closeModal} type="button" className="btn-close align-middle"
                                data-dismiss="modal" aria-label="Close">
                        </button>
                    </div>
                </div>
                <div className="modal-body">
                    <p><strong>Reporter</strong>: {issue.reporter.name}</p>
                    <p><strong>Department</strong>: {issue.reporter.department}</p>
                    <h6><strong>Description:</strong></h6>
                    {
                        issue.description.split('\n\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)
                    }
                    <div className="mb-3">
                        <p><strong>Tags:</strong></p>
                        {
                            issue.tags.map((tag, index) => <span key={index} className="badge text-bg-light">{tag}</span>)
                        }
                    </div>

                    <div className="accordion" id="accordionExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className={"accordion-button" + (commentToggle ? "" : " collapsed")}
                                        type="button" data-target="#collapseOne" data-toggle="collapse"
                                        onClick={toggleComments}>
                                    Conversation
                                </button>
                            </h2>
                            <Collapse toggle={commentToggle} comments={issue.comments}>
                                {
                                    issue.comments.map(comment =>
                                        <IssueComment
                                            key={comment.date_created}
                                            name={comment.name}
                                            comment={comment.comment}
                                            dateCreated={comment.date_created}
                                        />
                                    )
                                }
                                {
                                    newCommentToggle &&
                                    <>
                                        <form id="comment-form">
                                            <div className="grid g-2 align-items-start">
                                                <div className="row mb-2">
                                                    <div className="col-2">
                                                        <label className="col-form-label" htmlFor="comment-name">Name:</label>
                                                    </div>
                                                    <div className="col-5">
                                                        <input type="text" className="form-control w-100" id="comment-name" name="name" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <div className="col-2">
                                                        <label className="col-form-label" htmlFor="comment-input">Comment:</label>
                                                    </div>
                                                    <div className="col-10">
                                                        <textarea className="form-control" id="comment-input" name="comment"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={"text-end"}>
                                                <button className="btn btn-primary me-3" style={{minWidth: '96px'}} role="button" onClick={postNewComment}>Post</button>
                                                <button className="btn btn-secondary" style={{minWidth: '96px'}} role="button" onClick={toggleNewComment}>Cancel</button>
                                            </div>
                                        </form>
                                    </>
                                }
                                {
                                    !newCommentToggle &&
                                    <div className={"text-end"}>
                                        <button className="btn btn-primary" style={{minWidth: '96px'}} role="button" onClick={toggleNewComment}>Add Comment</button>
                                    </div>
                                }
                            </Collapse>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button role="button" className="btn btn-success" onClick={markComplete}>Mark as complete</button>
                </div>
            </>
        )
    } else {
        return (<p>loading...</p>)
    }
}

export default IssuePopUp;