import { useToasts } from '../../hooks/useToasts.js'
import { useTags } from '../../hooks/useTags.js'
import BASE_URL from '../../settings.js'
import { useRef } from 'react'

function CreateTag() {
    const tags = useTags()
    const toaster = useToasts()
    const newTagTextInput = useRef()

    const handleAddNewTag = async (e) => {
        e.preventDefault()
        const sendData = { name: newTagTextInput.current.value }

        try {
            const response = await fetch(`${BASE_URL}/addtag.php`, {
                method: 'POST',
                body: JSON.stringify(sendData)
            })
            const responseData = await response.json()
    
            if ( response.ok ) {
                toaster.success(`New tag "${responseData.name}" created`)
                newTagTextInput.current.value = ''
                tags.refresh()
            } else {
                toaster.error('Error creating tag. ' + responseData.message)
            }
        } catch (error) {
            console.log(error)
            toaster.error('Error in response when creating tag. Check console for details.')
        }
    }

    return (
        <div className="input-group mb-3">
            <label htmlFor="newtag" className="input-group-text">Add New Tag:</label>
            <input type="text" className="form-control" id="newtag" name="new-tag-name" maxLength={255} ref={newTagTextInput} />
            <button type="button" role="button" className="btn btn-outline-secondary" onClick={handleAddNewTag}>+</button>
        </div>
    )
}

export default CreateTag
