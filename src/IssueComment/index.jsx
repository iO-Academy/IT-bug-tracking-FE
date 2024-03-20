function IssueComment({name, comment, dateCreated}) {

    return (
        <div className="mt-3 p-3 border-bottom">
            <h6>{name} <small className="float-end">{dateCreated}</small></h6>
            <p>{comment}</p>
        </div>
    )
}

export default IssueComment