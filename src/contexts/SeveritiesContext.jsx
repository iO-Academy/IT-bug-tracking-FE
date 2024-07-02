import { createContext, useEffect, useState } from "react"
import BASE_URL from "../settings.js"

export const SeveritiesContext = createContext([])

export const severityColorMap = {
    "Critical": "text-bg-dark",
    "Severe": "text-bg-danger",
    "Moderate": "text-bg-warning",
    "Low": "text-bg-success",
    "Info": "text-bg-info",
    "Unknown": "text-bg-secondary",
}

export function SeveritiesContextProvider({children}) {
    const [severities, setSeverities] = useState([])

    const getSeverities = async () => {
        const response = await fetch('severities.json')
        const data = await response.json()
        setSeverities(data.severities)
    }

    useEffect(() => {
        getSeverities()
    }, []);

    return (
        <SeveritiesContext.Provider value={severities}>
            {children}
        </SeveritiesContext.Provider>
    )
}
