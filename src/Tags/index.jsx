function Tags({tags, selectTag}) {

    return (
        <>
            {tags.map(tag => {
                return (
                    <a className="badge text-bg-light me-1 mb-1 text-decoration-none tag" id={tag.name} key={tag.name} href="#" onClick={selectTag}>{tag.name}</a>
                )
            })}
        </>
    )
}

export default Tags;