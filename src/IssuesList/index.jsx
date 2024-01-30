import {useEffect, useState} from "react";
import IssueItem from "../IssueItem/index.jsx";
import Modal from "../Modal/index.jsx";

function IssuesList() {
    const [issues, setIssues] = useState([])
    const [selectedIssue, setSelectedIssue] = useState(null)
    const [showIssueModal, setShowIssueModal] = useState(false)

    const getIssues = () => {
        setIssues([{
            "id": 1,
            "title": "Title of the ticket",
            "summary": "The first 100 characters of the issue description",
            "severity": "Moderate",
            "tags": [{"name": "Tag 1","id": 1}, {"name": "Tag 2","id": 2}],
            "date_created": "01/05/2023",
            "comment_count": 3
        },
{
            "id": 2,
            "title": "Title of the ticket",
            "summary": "The first 100 characters of the issue description",
            "severity": "Low",
            "tags": [{"name": "Tag 1","id": 1}, {"name": "Tag 2","id": 2}],
            "date_created": "01/05/2023",
            "comment_count": 12
        }])
    }

    useEffect(() => {
        getIssues()
    }, []);

    useEffect(() => {
        setShowIssueModal(true)
    }, [selectedIssue]);

    return (
        <>
            <main className="col-9">
                <div className="border rounded bg-white p-3 mb-3 d-flex justify-content-between align-items-center">
                    <div className="dropdown">
                        <button className="btn btn-white dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Most Recent
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Most Recent</a></li>
                            <li><a className="dropdown-item" href="#">Oldest</a></li>
                            <li><a className="dropdown-item" href="#">Most Severe</a></li>
                            <li><a className="dropdown-item" href="#">Most Comments</a></li>
                        </ul>
                    </div>
                    <button className="float-end btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#exampleModal">Report issue +</button>
                </div>
                {
                    issues.map(issue =>
                        <IssueItem
                            key={issue.title}
                            id={issue.id}
                            title={issue.title}
                            summary={issue.summary}
                            severity={issue.severity}
                            tags={issue.tags}
                            date_created={issue.date_created}
                            comment_count={issue.comment_count}
                            setSelectedIssue={setSelectedIssue}
                        />
                    )
                }
            </main>
            <Modal show={showIssueModal} title={""} severity={""}>
                <h1>hello world</h1>
            </Modal>
        </>
    )
}

export default IssuesList;