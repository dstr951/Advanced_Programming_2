function Alert({condition, errorMessage}) {
    return (
        !!condition ? <div className="alert alert-danger col-3">
            <strong>Error! </strong>{errorMessage}
        </div> : <></>
    )
}


export default Alert