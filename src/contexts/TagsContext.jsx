import { createContext, useEffect, useState } from "react"
import BASE_URL from '../settings.js'

export const TagsContext = createContext([])

export function TagsContextProvider({children}) {
    const [tags, setTags] = useState([])
    const [needsRefresh, setNeedsRefresh] = useState(Date.now())

    const getTags = async () => {
        const response = await fetch('tags.json')
        const data = await response.json()
        setTags(data.tags)
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
