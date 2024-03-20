import IssueComment from "../IssueComment/index.jsx";
import React from "react";

function Collapse({toggle, children}) {
    return <div id="collapseOne" className={"collapse" + (toggle ? ' show' : '')}>
        {children}
    </div>
}

export default Collapse