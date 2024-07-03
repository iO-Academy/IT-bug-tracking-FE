function IssueComment({ comment}) {
    return (
        <div className="row mb-3 border-bottom">
            <h6>
                {comment.name} 
                <small className="float-end">{comment.date_created}</small>
            </h6>
            <div>
                { comment.comment.split('\n\n').map((paragraph, index) => {
                    return <p key={index} >{paragraph}</p>
                })}
            </div>
        </div>
    )
}

export default IssueComment
