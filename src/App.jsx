import { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar/index.jsx'
import IssuesList from './components/IssuesList/index.jsx'
import { SeveritiesContextProvider } from './contexts/SeveritiesContext.jsx'
import { TagsContextProvider } from './contexts/TagsContext.jsx'
import BASE_URL from './settings.js'

function App() {
    const [selectedTag, setSelectedTag] = useState('')
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

    const selectTag = (selection) => {
        setSelectedTag(selection)
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <SeveritiesContextProvider>
                        <TagsContextProvider>
                            <Sidebar selectTag={selectTag} selectSeverities={{addSeverity, removeSeverity}} />
                            <IssuesList selectedSeverities={selectedSeverities} selectedTag={selectedTag} sortOrder={sortOrder} setSortOrder={setSortOrder}/>
                        </TagsContextProvider>
                    </SeveritiesContextProvider>
                </div>
            </div>
        </>
    )
}

export default App
