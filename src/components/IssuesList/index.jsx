import {useEffect, useState} from 'react';
import IssueItem from '../IssueItem/index.jsx';
import Modal from '../Modal/index.jsx';
import IssuePopUp from '../IssuePopUp/index.jsx';
import CreateIssuePopUp from '../CreateIssuePopUp/index.jsx';
import BASE_URL from '../../settings.js'
import { useToasts } from '../../hooks/useToasts.js';

function IssuesList({ showCompleted, selectedSeverities, selectedTag, sortOrder, setSortOrder }) {
    const [issues, setIssues] = useState([])
    const [needsRefresh, setNeedsRefresh] = useState(Date.now())
    const [selectedIssue, setSelectedIssue] = useState(null)
    const [showIssueModal, setShowIssueModal] = useState(false)
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showOrderDropdown, setShowOrderDropdown] = useState(false)
    const toaster = useToasts()

    const getIssues = async () => {
        let request = {}
        showCompleted && (request.completed = showCompleted ? 1 : 0)
        selectedTag && (request.tag = selectedTag)
        selectedSeverities.length && (request.severity = selectedSeverities)
        sortOrder && (request.order = sortOrder)
        const params = new URLSearchParams(request)

        try {
            const response = await fetch(`${BASE_URL}/issues.php?${params}`)
            const data = await response.json()

            if (response.ok) {
                setIssues(data.issues)
            } else {
                console.log('Unable to fetch issues. Message:\n' + data.message)
                toaster.error('Unable to fetch issues.\n' + data.message)
                setIssues([])
            }
        } catch (error) {
            console.log(error)
            toaster.error('Unable to fetch issues. Check console for details.')
            setIssues([])
        }
    }

    useEffect(() => {
        getIssues()
    }, [showCompleted, selectedTag, selectedSeverities, sortOrder, needsRefresh]);

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

    const closeCreateModalSuccess = () => {
        setShowCreateModal(false)
        setNeedsRefresh(Date.now())
    }

    const toggleOrderDropdown = () => setShowOrderDropdown(!showOrderDropdown)

    const changeSortOrder = (event) => {
        event.preventDefault()
        setSortOrder(event.target.id)
        setShowOrderDropdown(false)
    }

    const sortOrderNameMap = {
        '': 'Newest',
        'newest': 'Newest',
        'oldest': 'Oldest',
        'severity': 'Most Severe',
        'comments': 'Most Comments'
    }

    return (
        <>
            <main className="col-9">
                <div className="border rounded bg-white p-3 mb-3 d-flex justify-content-between align-items-center">
                    <div className="dropdown">
                        <button className={"btn btn-white dropdown-toggle" + (showOrderDropdown ? " show" : "")} type="button"
                                data-bs-toggle="dropdown" aria-expanded={showOrderDropdown} onClick={toggleOrderDropdown}>
                            { sortOrderNameMap[sortOrder] }
                        </button>
                        <ul className={"dropdown-menu" + (showOrderDropdown ? " show" : "")}>
                            <li><a className="dropdown-item" id="newest" onClick={changeSortOrder} href="#">{ sortOrderNameMap["newest"] }</a></li>
                            <li><a className="dropdown-item" id="oldest" onClick={changeSortOrder} href="#">{ sortOrderNameMap["oldest"] }</a></li>
                            <li><a className="dropdown-item" id="severity" onClick={changeSortOrder} href="#">{ sortOrderNameMap["severity"] }</a></li>
                            <li><a className="dropdown-item" id="comments" onClick={changeSortOrder} href="#">{ sortOrderNameMap["comments"] }</a></li>
                        </ul>
                    </div>
                    <button className="float-end btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#exampleModal"
                        onClick={openCreateModal} type="button">
                        Report issue +
                    </button>
                    {
                        showCreateModal &&
                        <Modal closeModal={closeCreateModal}>
                            <CreateIssuePopUp closeModal={closeCreateModalSuccess}/>
                        </Modal>
                    }
                </div>
                {
                    (Array.isArray(issues) && issues.length > 0) ?
                    issues.map((issue, index) => {
                        return (<IssueItem
                            key={index}
                            id={issue.id}
                            title={issue.title}
                            summary={issue.summary}
                            severity={issue.severity}
                            tags={issue.tags}
                            date_created={issue.date_created}
                            comment_count={issue.comment_count}
                            setSelectedIssue={setSelectedIssue}
                        />)
                    }) 
                    : <h2 className='text-secondary text-center my-3'>No issues to display.</h2>
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
