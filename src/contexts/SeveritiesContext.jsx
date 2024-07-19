import { createContext, useEffect, useState } from 'react'
import BASE_URL from '../settings.js'
import { useToasts } from '../hooks/useToasts.js'

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

    return (
        <SeveritiesContext.Provider value={severities}>
            {children}
        </SeveritiesContext.Provider>
    )
}
