function Alert({condition, errorMessage, alertClass}) {
    return (
        !!condition ? <div className={alertClass}>
            {errorMessage}
        </div> : <></>
    )
}


export default Alert