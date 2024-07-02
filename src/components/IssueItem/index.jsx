function IssueItem({id, title, summary, severity, tags, date_created, comment_count, setSelectedIssue}) {
    const severityColorMap = {
        "Critical": "text-dark",
        "Severe": "text-danger",
        "Moderate": "text-warning",
        "Low": "text-success",
        "Info": "text-info",
        "Unknown": "text-secondary",
    }

    const handleClick = () => {
        setSelectedIssue(id)
    }

    return (
        <div className="rounded bg-white p-4 mb-3 d-flex justify-content-between" onClick={handleClick}>
            <div className="me-2"><i className={"bi bi-circle-fill " + severityColorMap[severity]}></i></div>
            <div className="flex-fill">
                <h4>{title}</h4>
                <p>{summary}</p>
                { tags.map(tag => {
                        return (
                            <a 
                                className="badge text-bg-light me-1 mb-1 text-decoration-none tag" 
                                id={tag.name} key={tag.name} href="#"
                            >
                                {tag.name}
                            </a>
                        )
                    })}
            </div>
            <div className="d-flex justify-content-between align-items-end flex-column mx-2">
                <span><i className="bi bi-chat"></i> {comment_count}</span>
                <small className="float-end">{date_created}</small>
            </div>
        </div>
    )
}

export default IssueItem;
