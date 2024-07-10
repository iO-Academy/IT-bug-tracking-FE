import { createContext, useEffect, useState } from 'react'
import BASE_URL from '../settings.js'

export const SeveritiesContext = createContext([])

export const severityColorMap = {
    'Critical': 'dark',
    'Severe': 'danger',
    'Moderate': 'warning',
    'Low': 'success',
    'Info': 'info',
    'Unknown': 'secondary',
}

export function SeveritiesContextProvider({children}) {
    const [severities, setSeverities] = useState([])

    const getSeverities = async () => {
        const response = await fetch(`${BASE_URL}/severities.php`)
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
