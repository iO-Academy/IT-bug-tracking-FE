import { useState } from 'react'
import Sidebar from "./Sidebar/index.jsx";
import IssuesList from "./IssuesList/index.jsx";

function App() {

  return (
    <div className={"container"}>
        <div className={"row"}>
            <Sidebar />
            <IssuesList />
        </div>
    </div>
  )
}

export default App
