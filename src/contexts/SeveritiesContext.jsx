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
    const toaster = useToasts()

    const getSeverities = async () => {
        try {
            const response = await fetch(`severities.json`)
            const data = await response.json()
            
            if (response.ok) {
                setSeverities(data.severities)
            } else {
                console.log('Unable to fetch severities. ' + data.message)
                toaster.error('Unable to fetch severities. ' + data.message)
                setSeverities([])
            }
        } catch (error) {
            console.log(error)
            toaster.error('Unable to fetch severities. Check console for details.')
            setSeverities([])
        }
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
