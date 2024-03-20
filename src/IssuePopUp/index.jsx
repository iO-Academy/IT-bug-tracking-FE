import Tags from "../Tags/index.jsx";
import React, {useEffect, useState} from "react";
import Collapse from "../Collapse/index.jsx";
import IssueComment from "../IssueComment/index.jsx";

function IssuePopUp({closeModal, id}) {
    const [issue, setIssue] = useState(null)
    const [issueId, setIssueId] = useState(null)
    const [commentToggle, setCommentToggle] = useState(false)

    const severityColorMap = {
        "Critical": "text-dark",
        "Severe": "text-danger",
        "Moderate": "text-warning",
        "Low": "text-success",
        "Info": "text-info",
        "Unknown": "text-secondary",
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

    if (issue != null) {
        return (
            <>
                <div className="modal-header">
                    <h1 className="modal-title fs-5">{issue.title}</h1>
                    <div>
                        <span className="badge text-bg-warning">{issue.severity}</span>
                    </div>
                    <div>
                        <button onClick={closeModal} type="button" className="btn-close align-top"
                                data-dismiss="modal" aria-label="Close">
                        </button>
                    </div>
                </div>
                <div className="modal-body">
                    <p><strong>Reporter</strong>: {issue.reporter.name}</p>
                    <p><strong>Department</strong>: {issue.reporter.department}</p>
                    <h6><strong>Description:</strong></h6>
                    <p>{issue.description}</p>
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
                            <Collapse className="position-relative" toggle={commentToggle} comments={issue.comments}>
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
                                <button className="btn btn-primary my-1 mx-3" type="button" >
                                    Add Comment
                                </button>
                            </Collapse>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-success">Mark as complete</button>
                </div>
            </>
        )
    } else {
        return (<p>loading...</p>)
    }
}

export default IssuePopUp;