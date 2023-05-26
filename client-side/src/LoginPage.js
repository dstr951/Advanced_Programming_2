import Alert from "./components/Alert";
import {useEffect, useState} from "react";
import {validateLogin} from "./api";
import {useNavigate, Link} from "react-router-dom";


async function validateLoginPage(event, navigator, setterDisplayError, data) {
    event.preventDefault()
    setterDisplayError(false)
    const serverResponse = await validateLogin(data.userName, data.password)
    if(serverResponse.status !== 200) {
        setterDisplayError(true)
        return false
    }
    const token = await serverResponse.text()
    navigator('/Chats', { state: { myParam: 1, token: token } })
}

function LoginPage() {
    const errorMessage = 'Incorrect username or password. Please try again'
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [displayError, setDisplayError] = useState(false)
    const navigate = useNavigate();

    useEffect(()=>{
        setDisplayError(false)
    },[userName,password])


    const getInput = function (e, setter) {
        setter(e.target.value)
        //console.log("value is: "+e.target.value)
    }
    const buildResponse = function (e, userName, password) {
        setDisplayError(false)
        //stop the form default response
        e.preventDefault();
        if (validateLoginPage(userName, password).code === 200) {
            setDisplayError(false)
        } else {
            setDisplayError(true)
        }

    }


    return (

        <div>
            <div className="background-jumbo"></div>
            <div className="row">
                <div className="header">Login to start chatting!</div>
            </div>
            <div className="row">
                <div className="card col-8 container">
                    <form>
                        <div className="form-group row">
                            <div className="col-12 mt-2">
                                <label htmlFor="loginUsernameInput">Username</label>
                                <input onChange={(event) => getInput(event, setUserName)} type="text"
                                       className="form-control" id="loginUsernameInput"
                                       placeholder="Enter username" value={userName}></input>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-12 mt-2">
                                <label htmlFor="loginPasswordInput">Password</label>
                                <input onChange={(event) => getInput(event, setPassword)} type="password"
                                       className="form-control" id="loginPasswordInput"
                                       placeholder="Enter password" value={password}></input>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-1">
                                <button onClick={(event) => validateLoginPage(event, navigate, setDisplayError, {
                                    userName,
                                    password
                                })}
                                        type="submit" className="btn btn-primary">Login
                                </button>

                            </div>

                            { displayError &&
                                <Alert  condition={displayError} errorMessage={errorMessage} alertClass={"alert alert-danger col-3"}></Alert>}
                            <div className="col-6 row justify-content-center align-content-center">
                                <div className="d-contents">Don't have an account?&nbsp;<Link to="/Register">Click
                                    here</Link>&nbsp;to register.

                                </div>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default LoginPage