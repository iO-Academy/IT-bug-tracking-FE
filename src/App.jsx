import { useState } from 'react'
import Sidebar from './components/Sidebar/index.jsx'
import IssuesList from './components/IssuesList/index.jsx'
import { SeveritiesContextProvider } from './contexts/SeveritiesContext.jsx'
import { TagsContextProvider } from './contexts/TagsContext.jsx'

function App() {
    const [showCompleted, setShowCompleted] = useState(false)
    const [selectedTag, setSelectedTag] = useState(0)
    const [selectedSeverities, setSelectedSeverities] = useState([])
    const [sortOrder, setSortOrder] = useState('')

    const addSeverity = (selection) => {
        const updatedSeverities = [
            ...selectedSeverities,
            selection
        ]
        setSelectedSeverities(updatedSeverities)
    }

    const removeSeverity = (selection) => {
        const updatedSeverities = selectedSeverities.filter(
            (id) => id !== selection
        )
        setSelectedSeverities(updatedSeverities)
    }

    const selectTag = (tag) => {
        setSelectedTag(tag)
    }

    const selectCompleted = (completed) => {
        setShowCompleted(completed)
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <SeveritiesContextProvider>
                        <TagsContextProvider>
                            <Sidebar selectCompleted={selectCompleted} selectTag={selectTag} selectSeverities={{addSeverity, removeSeverity}} />
                            <IssuesList showCompleted={showCompleted} selectedSeverities={selectedSeverities} selectedTag={selectedTag} sortOrder={sortOrder} setSortOrder={setSortOrder}/>
                        </TagsContextProvider>
                    </SeveritiesContextProvider>
                </div>
            </div>
        </>
    )
}

export default App
