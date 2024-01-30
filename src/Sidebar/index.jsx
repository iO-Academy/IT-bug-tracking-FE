import {useEffect, useState} from "react";
import Tags from "../Tags/index.jsx";
import Severity from "../Severity/index.jsx";

function Sidebar() {
    const [severities, setSeverities] = useState([])
    const [tags, setTags] = useState([])

    const getSeverities = () => {
        setSeverities([
            {
                "name": "Critical",
                "id": 1
            },
            {
                "name": "Severe",
                "id": 2
            }
        ])
    }

    const getTags = () => {
        setTags([
            {
                "name": "Tag 1",
                "id": 1
            },
            {
                "name": "Tag 2",
                "id": 2
            }
        ])
    }

    useEffect(() => {
        getSeverities()
        getTags()
    }, []);

    return (
        <aside className={"col-3"}>
            <div className="border rounded bg-primary bg-gradient p-3 mb-3 text-light">
                <h1>IT Support Tracking</h1>
            </div>
            <div className="border rounded bg-white p-3 mb-3">
                <h6 className="mb-0">Filters</h6>
            </div>
            <div className="border rounded bg-white p-3 mb-3">
                {severities && severities.map(severity => {
                    return (
                        <label className={"d-block"} key={severity.name}>
                            <input type="checkbox" value={severity.id} />
                            <Severity classes='ms-1' severity={severity} />
                        </label>
                    )
                })}
            </div>
            <div className="border rounded bg-white p-3 mb-3">
                {tags && <Tags tags={tags} />}
            </div>
        </aside>
    )
}

export default Sidebar;