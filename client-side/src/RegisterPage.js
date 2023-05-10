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
<<<<<<< HEAD
                        <Input
                            label="Username"
                            type="text"
                            id="registerUsernameInput"
                            placeHolder="Enter username"
                            setter={setUserName}
                            validator={validateUsername}
                            successMessage="username available"
                            errorMessage="error with user name, taken or invalid"
                        />
                        <Input
                            label="Password"
                            type="password"
                            id="registerPasswordInput"
                            placeHolder="Enter password"
                            setter={setPassword}
                            validator={validatePassword}
                            successMessage="valid password"
                            errorMessage="invalid password"
                        />
                        <Input
                            label="Confirm Password"
                            type="password"
                            id="registerConfirmPasswordInput"
                            placeHolder="Confirm password"
                            setter={setConfirmPassword}
                            validator={(p)=> function (){
                                return -1}
                            }
                            successMessage="passwords are the same"
                            errorMessage="passwords are not the same"
                        />
                        {((confirmPasswordValidator({password},{confirmPassword})) === 1 &&
                            <Alert condition={true} alertClass="alert alert-success" errorMessage="passwords are identical" />
                            ||
                            ((confirmPasswordValidator({password},{confirmPassword})) === 0 &&
                                <Alert condition={true} alertClass="alert alert-danger" errorMessage="passwords don't match" />))

                        }
                        <Input
                            label="Display Name"
                            type="text"
                            id="registerDisplayNameInput"
                            placeHolder="Enter display name"
                            setter={setDisplayName}
                            validator={(name)=> {
                                if(name.length === 0){
                                    return -1
                                }
                                else if(name.length > 2){
                                    return 1
                                }
                                else{
                                    return 0
                                }
                            }}
                            successMessage="valid display name"
                            errorMessage="invalid display name"
                        />

                        <Input
                            label="Profile Picture"
                            type="file"
                            id="registerProfilePictureInput"
                            placeHolder="Upload profile picture"
                            setter={setImg}
                            validator={(event, setter)=> {
                                if(event.target.files.length === 0){
                                    setImgDisplay(false)
                                    return -1

                                }
                                const file = event.target.files[0];

                                //not image
                                if (!file.type.startsWith('image/')) {
                                    setImgDisplay(false)
                                    return 0;
                                }
                                const reader = new FileReader();
                                reader.readAsDataURL(file);
                                reader.onload = () => {
                                    const img = new Image();
                                    img.src = reader.result;
                                    lastImg.current = img.src
                                    img.onload = () => {
                                        setter(reader.result);
                                    }
                                };
                                setImgDisplay(true)
                                return 1;
                            }
                            }
                            successMessage="looks good!"
                            errorMessage="not right format"
                        />

                        {imgDisplay && <div className="col-2 mt-4">
                            <img src={img} alt="img"
                                 style={{maxWidth:"100%", maxHeight: "100%"}}></img>

                        </div>}

                        <div className="row mt-2">
                            <div className="col-1">
                                <button type="submit" className="btn btn-primary">Login</button>
                            </div>
                            <div className="col-11 row justify-content-center align-content-center">
                                <div className="d-contents">Already have an account?&nbsp;<a href="./login.html">Click
                                    here</a>&nbsp;to login.
=======
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
>>>>>>> Routing
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
<<<<<<< HEAD


=======
>>>>>>> Routing
        </>
    )
}

export default RegisterPage