import {useEffect, useState} from 'react'
import Sidebar from "./Sidebar/index.jsx";
import IssuesList from "./IssuesList/index.jsx";
import Toast from "./Toast/index.jsx";

function App() {
    const [showToast, setShowToast] = useState(false)
    const [showingToast, setShowingToast] = useState(false)

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
                  <Sidebar />
                  <IssuesList makeToast={makeToast}/>
              </div>
          </div>
      </>
    )
}

export default App
