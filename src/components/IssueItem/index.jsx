import { severityColorMap } from "../../contexts/SeveritiesContext";

function IssueItem({issue, setSelectedIssue}) {

    const handleClick = () => {
        setSelectedIssue(issue.id)
    }

    return (
        <div id={`issue${issue.id}`} className={`rounded bg-white border border-${severityColorMap[issue.severity]}-subtle p-4 mb-3 d-flex justify-content-between` + (issue.completed ? 'text-secondary' : '')} onClick={handleClick}>
            <div className="me-2"><i className={`bi bi-circle-fill text-${severityColorMap[issue.severity]}`}/></div>
            <div className="flex-fill">
                <h4 className={(issue.completed ? 'text-secondary' : '')}>{issue.title}</h4>
                <p className={(issue.completed ? 'text-secondary' : '')}>{issue.summary}</p>
                {issue.completed && <span className={'badge text-bg-success me-1 mb-1 text-decoration-none'}>Completed</span>}
                { 
                    (Array.isArray(issue.tags) && issue.tags.length > 0) && 
                    issue.tags.map((tag, index) => {
                        return <span className={'badge text-bg-light me-1 mb-1 text-decoration-none ' + (issue.completed ? 'text-secondary' : '')} key={index}>{tag}</span>
                    }
                )}
            </div>
            <div className={'d-flex justify-content-between align-items-end flex-column mx-2 ' + (issue.completed ? 'text-secondary' : '')}>
                <span><i className="bi bi-chat"></i> {issue.comment_count}</span>
                <small className="float-end">{issue.date_created}</small>
            </div>
        </div>
    )
}

export default IssueItem;
