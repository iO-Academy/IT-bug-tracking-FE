function Tags({tags}) {

    return (
        <>
            {tags.map(tag => {
                return (
                    <span className="badge text-bg-light me-1 mb-1" key={tag.name}>{tag.name}</span>
                )
            })}
        </>
    )
}

export default Tags;