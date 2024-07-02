import { useContext } from "react";
import { SeveritiesContext, severityColorMap } from "../../contexts/SeveritiesContext.jsx";
import { useTags } from "../../hooks/useTags.js";

function Sidebar({selectTag, selectSeverities}) {
    const severities = useContext(SeveritiesContext)
    const tags = useTags()

    const handleCheckedSeverity = (e) => {
        if (e.target.checked) {
            selectSeverities.addSeverity(e.target.value)
        } else {
            selectSeverities.removeSeverity(e.target.value)
        }
    }

    const handleSelectedTag = (e) => {
        selectTag(e.target.id)
    }

    return (
        <aside className={"col-3"}>
            <div className="border rounded bg-primary bg-gradient p-3 mb-3 text-light">
                <h1>IT Support Tracking</h1>
            </div>
            <div className="border rounded bg-white p-3 mb-3">
                <h6 className="mb-3">Filters:</h6>
                <div className="border rounded bg-white p-3 mb-3">
                    {severities && severities.map(severity => {
                        return (
                            <div className={`form-check`} key={severity.id}>
                                <input 
                                    type="checkbox" 
                                    className="form-check-input severity-checkbox" 
                                    id={severity.name.toLowerCase()}
                                    value={severity.id} 
                                    onClick={handleCheckedSeverity} 
                                />
                                <label className={`form-check-label px-2 rounded text-bg-${severityColorMap[severity.name]}`} htmlFor={severity.name.toLowerCase()}>
                                    {severity.name}
                                </label>
                            </div>
                        )
                    })}
                </div>
                <div className="border rounded bg-white p-3 mb-3">
                    { tags.list.map(tag => {
                        return (
                            <span 
                                className="d-inline-block text-bg-light border rounded fs-6 py-1 px-2 me-1 mb-1 tag" 
                                id={tag.name} key={tag.name}
                                onClick={handleSelectedTag}
                            >
                                {tag.name}
                            </span>
                        )
                    })}
                </div>
            </div>
        </aside>
    )
}

export default Sidebar;
