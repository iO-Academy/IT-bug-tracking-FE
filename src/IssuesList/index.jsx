import {useEffect, useState} from "react";
import IssueItem from "../IssueItem/index.jsx";
import Modal from "../Modal/index.jsx";
import IssuePopUp from "../IssuePopUp/index.jsx";

function IssuesList() {
    const [issues, setIssues] = useState([])
    const [selectedIssue, setSelectedIssue] = useState(null)
    const [showIssueModal, setShowIssueModal] = useState(false)

    const getIssues = async () => {
        const response = await fetch('issues.json')
        const body = await response.json()
        setIssues(body.issues)
    }

    useEffect(() => {
        getIssues()
    }, []);

    useEffect(() => {
        if (selectedIssue != null) {
            setShowIssueModal(true)
            console.log(`Selected issue is ${selectedIssue}`)
        } else {
            setShowIssueModal(false)
        }
    }, [selectedIssue]);

    const unselectIssue = () => {
        setSelectedIssue(null)
    }

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
                            key={issue.id}
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
            {
                showIssueModal &&
                <Modal closeModal={unselectIssue} title={""} severity={""}>
                    <h1>hello</h1>
                    {/*<IssuePopUp></IssuePopUp>*/}
                </Modal>
            }

        </>
    )
}

export default IssuesList;