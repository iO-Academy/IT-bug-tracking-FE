function Toast({dismiss, type, header, message}) {

    return (
        <div
            className={`alert max-vw-25 position-fixed bottom-0 end-0 mx-3 alert-${type}`}
            role="alert"
            style={{width: '300px', zIndex: '1090'}}
            onClick={dismiss}
        >
            {
                header &&
                <h4>{header}</h4>
            }
            <p>{message}</p>
        </div>
    )
}

export default Toast