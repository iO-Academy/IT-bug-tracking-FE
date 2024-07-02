import { useEffect, useState } from 'react'
import Sidebar from "./components/Sidebar/index.jsx"
import IssuesList from "./components/IssuesList/index.jsx"
import BASE_URL from './settings.js'
import { SeveritiesContextProvider } from './contexts/SeveritiesContext.jsx'

function App() {
    const [issues, setIssues] = useState([])
    const [selectedTag, setSelectedTag] = useState('')
    const [selectedSeverities, setSelectedSeverities] = useState('')
    const [sortOrder, setSortOrder] = useState('')

    const getIssues = async () => {
        let request = {}
        selectedTag && (request.tag = selectedTag)
        selectedSeverities.length && (request.severity = selectedSeverities)
        sortOrder && (request.order = sortOrder)
        const params = new URLSearchParams(request)

        const response = await fetch(`issues.json?${params}`)
        const data = await response.json()
        setIssues(data.issues)
    }

    useEffect(() => {
        getIssues()
    }, [selectedTag, selectedSeverities, sortOrder]);

    const selectSeverities = (selections) => {
        setSelectedSeverities(selections)
    }

    const selectTag = (selection) => {
        setSelectedTag(selection)
    }

    return (
        <>
            <div className={"container"}>
                <div className={"row"}>
                    <SeveritiesContextProvider>
                        <Sidebar selectTag={selectTag} selectSeverities={selectSeverities} />
                        <IssuesList issues={issues} sortOrder={sortOrder} setSortOrder={setSortOrder}/>
                    </SeveritiesContextProvider>
                </div>
            </div>
        </>
    )
}

export default App
