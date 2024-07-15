import { severityColorMap } from "../../contexts/SeveritiesContext";

function IssueItem({id, title, summary, severity, tags, date_created, comment_count, completed, setSelectedIssue}) {

    const handleClick = () => {
        setSelectedIssue(id)
    }

    return (
        <div id={`issue${id}`} className={`rounded bg-white border border-${severityColorMap[severity]}-subtle p-4 mb-3 d-flex justify-content-between` + (completed ? 'text-secondary' : '')} onClick={handleClick}>
            <div className="me-2"><i className={`bi bi-circle-fill text-${severityColorMap[severity]}`}/></div>
            <div className="flex-fill">
                <h4 className={(completed ? 'text-secondary' : '')}>{title}</h4>
                <p className={(completed ? 'text-secondary' : '')}>{summary}</p>
                {completed && <span className={'badge text-bg-success me-1 mb-1 text-decoration-none'}>Completed</span>}
                { tags.map((tag, index) => {
                    return (
                        <span className={'badge text-bg-light me-1 mb-1 text-decoration-none ' + (completed ? 'text-secondary' : '')} key={index}>{tag}</span>
                    )
                })}
            </div>
            <div className={'d-flex justify-content-between align-items-end flex-column mx-2 ' + (completed ? 'text-secondary' : '')}>
                <span><i className="bi bi-chat"></i> {comment_count}</span>
                <small className="float-end">{date_created}</small>
            </div>
        </div>
    )
}

export default IssueItem;
