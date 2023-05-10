<<<<<<< HEAD
import {useEffect, useRef, useState} from "react";
import {validateLogin} from "./apiTemp";
import LoginAlert from "./Alert";
import Alert from "./Alert";

=======
import {useState} from "react";
import {validateLogin} from "./apiTemp";
import {useNavigate, Link} from "react-router-dom";


function validateSignup(event, navigator, setterDisplayError, data) {
        //add code for checking data
    if (true) {
        // add code of checking server response
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
>>>>>>> Routing
function LoginPage(){
    const errorMessage = 'Incorrect username or password. Please try again'
    const [password,setPassword] = useState('');
    const [userName,setUserName]  = useState('');
    const [displayError, setDisplayError] = useState(false)
    const navigate = useNavigate();


    const getInput = function (e,setter) {
        setter(e.target.value)
        //console.log("value is: "+e.target.value)
    }
    const buildResponse = function (e,userName,password){
        setDisplayError(false)
        //stop the form default response
        e.preventDefault();
       if(validateLogin(userName,password).code === 200){
           setDisplayError(false)
       }
       else{
           setDisplayError(true)
       }
>>>>>>> Routing
    }



    return(

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
                            <input onChange={(event) => getInput(event,setUserName) } type="text" className="form-control" id="loginUsernameInput"
                                   placeholder="Enter username" value={userName}></input>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-12 mt-2">
                            <label htmlFor="loginPasswordInput">Password</label>
                            <input onChange={(event) => getInput(event,setPassword) } type="password" className="form-control" id="loginPasswordInput"
                                   placeholder="Enter password" value={password}></input>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-1">
                            <button onClick={(event) => validateSignup(event,navigate,setDisplayError,{userName,password})}
                                type="submit" className="btn btn-primary">Login</button>

                        </div>

                        {displayError &&<div className="col-5 row justify-content-center align-content-center" style={{ color: 'red' }}>{errorMessage}</div>}
                        <div className="col-6 row justify-content-center align-content-center">
                            <div className="d-contents">Don't have an account? <Link to="/Register">Click here</Link> o register.

                            </div>

                        </div>
                    </div>
                </form>
            </div>
        </div>

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
                                <input onChange={(event) => getInput(event,setUserName) } type="text" className="form-control" id="loginUsernameInput"
                                       placeholder="Enter username" value={userName}></input>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-12 mt-2">
                                <label htmlFor="loginPasswordInput">Password</label>
                                <input onChange={(event) => getInput(event,setPassword) } type="password" className="form-control" id="loginPasswordInput"
                                       placeholder="Enter password" value={password}></input>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-1">
                                <button onClick={(event) => buildResponse(event,userName,password)} type="submit" className="btn btn-primary">Login</button>

                            </div>
                            <Alert  condition={displayError} errorMessage={errorMessage} alertClass={"alert alert-danger col-3"}></Alert>



                            <div className="col-6 row justify-content-center align-content-center">
                                <div className="d-contents">Don't have an account?&nbsp;<a href="./register.html">Click
                                    here</a>&nbsp;to register.
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