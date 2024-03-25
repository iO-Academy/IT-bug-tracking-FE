import {useCallback, useEffect, useState} from 'react'
import Sidebar from "./Sidebar/index.jsx";
import IssuesList from "./IssuesList/index.jsx";
import Toast from "./Toast/index.jsx";

function App() {
    const [issues, setIssues] = useState([])
    const [selectedTag, setSelectedTag] = useState('')
    const [selectedSeverities, setSelectedSeverities] = useState('')
    const [sortOrder, setSortOrder] = useState('')
    const [showToast, setShowToast] = useState(false)
    const [showingToast, setShowingToast] = useState(false)

    const getIssues = useCallback(async () => {
        let request = {}
        selectedTag && (request.tag = selectedTag)
        selectedSeverities.length && (request.severity = selectedSeverities)
        sortOrder && (request.order = sortOrder)

        const params = new URLSearchParams(request)
        const response = await fetch(`issues.json?${params}`)
        const data = await response.json()
        setIssues(data.issues)
    }, [selectedTag, selectedSeverities, sortOrder])

    useEffect(() => {
        getIssues()
    }, [selectedTag, selectedSeverities, sortOrder, getIssues]);

    const makeToast = (type, message) => {
        setShowToast(true)
        setShowingToast({
            type: type,
            header: '',
            message: message,
            timeout: setTimeout(() => setShowToast(false), 5000)
        })
    }

    useEffect(() => {
        if (!showToast) {
            clearTimeout(showingToast.timeout)
        }
    }, [showToast, showingToast.timeout]);

    const hideToast = () => {
        setShowToast(false)
    }

    const selectSeverities = (selections) => {
        setSelectedSeverities(selections)
    }

    const selectTag = (selection) => {
        setSelectedTag(selection)
    }

    return (
      <>
          {
              showToast &&
              <Toast
                  dismiss={hideToast}
                  type={showingToast.type}
                  header={showingToast.header}
                  message={showingToast.message}
              />
          }
          <div className={"container"}>
              <div className={"row"}>
                  <Sidebar selectTag={selectTag} selectSeverities={selectSeverities} />
                  <IssuesList issues={issues} sortOrder={sortOrder} setSortOrder={setSortOrder} makeToast={makeToast}/>
              </div>
          </div>
      </>
    )
}

export default App
