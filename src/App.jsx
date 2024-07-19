import { useState } from 'react'
import Sidebar from './components/Sidebar/index.jsx'
import IssuesList from './components/IssuesList/index.jsx'
import { SeveritiesContextProvider } from './contexts/SeveritiesContext.jsx'

function App() {
    const [showCompleted, setShowCompleted] = useState(false)
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

    const selectCompleted = (completed) => {
        setShowCompleted(completed)
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <SeveritiesContextProvider>
                        <Sidebar selectCompleted={selectCompleted} selectSeverities={{addSeverity, removeSeverity}} />
                        <IssuesList showCompleted={showCompleted} selectedSeverities={selectedSeverities} sortOrder={sortOrder} setSortOrder={setSortOrder}/>
                    </SeveritiesContextProvider>
                </div>
            </div>
        </>
    )
}

export default App
