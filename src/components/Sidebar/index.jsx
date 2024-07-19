import { useContext } from 'react';
import { SeveritiesContext, severityColorMap } from '../../contexts/SeveritiesContext.jsx';

function Sidebar({ selectCompleted, selectSeverities }) {
    const severities = useContext(SeveritiesContext)

    const handleCheckedSeverity = (e) => {
        if (e.target.checked) {
            selectSeverities.addSeverity(e.target.value)
        } else {
            selectSeverities.removeSeverity(e.target.value)
        }
    }

    const handleCheckedCompleted = (e) => {
        selectCompleted(e.target.checked)
    }

    return (
        <aside className="col-3">
            <div className="border rounded bg-primary bg-gradient p-3 mb-3 text-light">
                <h1>IT Support Tracking</h1>
            </div>
            <div className="border rounded bg-white p-3 mb-3">
                <h6 className="mb-3">Filters:</h6>
                <div className="border rounded bg-white p-3 mb-3">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="completed"
                        value="completed"
                        onChange={handleCheckedCompleted}
                    />
                    <label className="form-check-label px-2" htmlFor="completed">
                        Show Completed
                    </label>
                </div>
                <div className="border rounded bg-white p-3 mb-3">
                    { (Array.isArray(severities) && severities.length > 0) && 
                    severities.map(severity => {
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
            </div>
        </aside>
    )
}

export default Sidebar;
