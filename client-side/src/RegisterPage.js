import {useNavigate, Link} from "react-router-dom";

import {useEffect, useState} from "react";



function validateSignup(event, navigator, setterDisplayError, data) {

    if (true) {
        if (true) {

            setterDisplayError(false)
            navigator('/Chats')
        } else {
            event.preventDefault()
            setterDisplayError(true)
            return false
        }
    } else {
        event.preventDefault()
        setterDisplayError(true)
        return false
    }
}


function RegisterPage() {
    const navigate = useNavigate();
    const [sendToServer, setSendToServer] = useState(false)
    const [registerDisplayError, setRegisterDisplayError] = useState(false)
    let userNameTest = "steve"
    return (
        <>
            <div className="background-jumbo"></div>
            <div className="row">
                <div className="header">Register to start chatting!</div>
            </div>
            <div className="row">
                <div className="card col-8 container">
                    <form>
                        <div className="form-group row">
                            <div className="col-12 mt-2">
                                <label htmlFor="registerUsernameInput">Username</label>
                                <input type="text" className="form-control" id="registerUsernameInput"
                                       placeholder="Enter username"></input>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-12 mt-2">
                                <label htmlFor="registerPasswordInput">Password</label>
                                <input type="password" className="form-control" id="registerPasswordInput"
                                       placeholder="Enter password"></input>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-12 mt-2">
                                <label htmlFor="registerConfirmPasswordInput">Confirm Password</label>
                                <input type="password" className="form-control" id="registerConfirmPasswordInput"
                                       placeholder="Confirm password"></input>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-12 mt-2">
                                <label htmlFor="registerDisplayNameInput">Display Name</label>
                                <input type="text" className="form-control" id="registerDisplayNameInput"
                                       placeholder="Enter display name"></input>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-12 mt-2">
                                <label htmlFor="registerProfilePictureInput">Profile Picture</label>
                                <input type="file" className="form-control" id="registerProfilePictureInput"
                                       placeholder="Upload profile picture"></input>
                            </div>
                            <div className="col-2 mt-4">
                                <img src="pictures/face2.jpg" alt="img"></img>
                            </div>
                        </div>

                        <div className="row mt-2">
                            <div className="col-1">
                                <div className="d-contents">
                                    <button
                                        onClick={(event) => (validateSignup(event,navigate, setRegisterDisplayError, userNameTest))}
                                        type="submit" className="btn btn-primary">Login
                                    </button>

                                </div>
                            </div>
                            {registerDisplayError && <div className="col-1 row justify-content-left align-content-center">error</div>}

                            <div className="col-8 row justify-content-center align-content-center">
                                <div className="d-contents">Already have an account <Link to="/">Click here</Link> to
                                    login.
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default RegisterPage