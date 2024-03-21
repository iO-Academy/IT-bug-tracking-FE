import {useEffect, useState} from "react";
import IssueItem from "../IssueItem/index.jsx";
import Modal from "../Modal/index.jsx";
import IssuePopUp from "../IssuePopUp/index.jsx";
import CreateIssuePopUp from "../CreateIssuePopUp/index.jsx";

function IssuesList({makeToast}) {
    const [issues, setIssues] = useState([])
    const [selectedIssue, setSelectedIssue] = useState(null)
    const [showIssueModal, setShowIssueModal] = useState(false)
    const [showCreateModal, setShowCreateModal] = useState(false)

    const getIssues = async () => {
        const response = await fetch('issues.json')
        const data = await response.json()
        setIssues(data.issues)
    }

    useEffect(() => {
        getIssues()
    }, []);

    useEffect(() => {
        if (selectedIssue != null) {
            setShowIssueModal(true)
        } else {
            setShowIssueModal(false)
        }
    }, [selectedIssue]);

    const unselectIssue = () => {
        setSelectedIssue(null)
    }

    const openCreateModal = () => {
        setShowCreateModal(true)
    }

    const closeCreateModal = () => {
        setShowCreateModal(false)
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
                    <button className="float-end btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#exampleModal"
                        onClick={openCreateModal}>
                        Report issue +
                    </button>
                    {
                        showCreateModal &&
                        <Modal closeModal={closeCreateModal}>
                            <CreateIssuePopUp closeModal={closeCreateModal} makeToast={makeToast}/>
                        </Modal>
                    }
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
                <Modal closeModal={unselectIssue}>
                    <IssuePopUp
                        closeModal={unselectIssue}
                        id={selectedIssue}
                    />
                </Modal>
            }
        </>
    )
}

export default IssuesList;