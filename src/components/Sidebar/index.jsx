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
            </div>
        </aside>
    )
}

export default Sidebar;
