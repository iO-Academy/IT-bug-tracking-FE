import { createContext, useEffect, useState } from 'react'
import BASE_URL from '../settings.js'
import { useToasts } from '../hooks/useToasts.js'

export const TagsContext = createContext([])

export function TagsContextProvider({children}) {
    const [tags, setTags] = useState([])
    const [needsRefresh, setNeedsRefresh] = useState(Date.now())
    const toaster = useToasts()

    const getTags = async () => {
        try {
            const response = await fetch(`${BASE_URL}/tags.php`)
            const data = await response.json()

            if (response.ok) {
                setTags(data.tags)
            } else {
                console.log('Unable to fetch tags. ' + data.message)
                toaster.error('Unable to fetch tags. ' + data.message)
                setTags([])
            }
        } catch (error) {
            console.log(error)
            toaster.error('Unable to fetch tags. Check console for details.')
            setTags([])
        }
    }

    const refresh = () => {
        setNeedsRefresh(Date.now())
    }

    useEffect(() => {
        getTags()
    }, [needsRefresh]);

    return (
        <TagsContext.Provider value={{refresh, list: tags}}>
            {children}
        </TagsContext.Provider>
    )
}
