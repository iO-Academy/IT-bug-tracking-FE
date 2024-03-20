import IssueComment from "../IssueComment/index.jsx";
import React from "react";

function Collapse({toggle, comments}) {
    return <>
        { toggle &&
            comments.map(comment =>
                <IssueComment
                    key={comment.date_created}
                    name={comment.name}
                    comment={comment.comment}
                    dateCreated={comment.date_created}
                />
            )
        }
    </>
}

export default Collapse