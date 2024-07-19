import {useEffect, useState} from 'react';
import IssueItem from '../IssueItem/index.jsx';
import Modal from '../Modal/index.jsx';
import IssuePopUp from '../IssuePopUp/index.jsx';
import CreateIssuePopUp from '../CreateIssuePopUp/index.jsx';
import BASE_URL from '../../settings.js'
import { useToasts } from '../../hooks/useToasts.js';

function IssuesList({ showCompleted, selectedSeverities, sortOrder, setSortOrder }) {
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
        selectedSeverities.length > 0 && (request.severity = selectedSeverities)
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
    }, [showCompleted, selectedSeverities, sortOrder, needsRefresh]);

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
        setSortOrder(event.target.id ?? '')
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
                </div>
                {
                    (Array.isArray(issues) && issues.length > 0) ?
                    issues.map((issue, index) => {
                        return (<IssueItem
                            key={index}
                            issue={issue}
                            setSelectedIssue={() => {}}
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
