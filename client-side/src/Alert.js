function Alert({condition, errorMessage, alertClass}) {
    return (
        !!condition ? <div className={alertClass}>
            <strong>Error! </strong>{errorMessage}
        </div> : <></>
    )
}


export default Alert