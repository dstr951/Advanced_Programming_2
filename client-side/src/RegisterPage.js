import {useNavigate, Link} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import Input from "./components/Input";
import Alert from "./components/Alert";
import {userNameExists, registerUser} from "./apiTemp"


function validateSignup(event, navigator, setterDisplayError, data) {

    if (data.OK.usernameOK &&
        data.OK.passwordOK &&
        data.data.password === data.data.confirmPassword &&
        data.OK.displayNameOK &&
        data.OK.imgOK
    ) {
        if (!userNameExists(data.data.username)) {
            setterDisplayError(false)
            const serverResponse = registerUser(data.data.username, data.data.password, data.data.displayName,data.data.profilePictue)
            if(serverResponse.code === 409){
                event.preventDefault()
                setterDisplayError(true)
                return false
            }
            else{

                navigator('/Chats',{ state: { myParam: serverResponse.body.userId } })
            }

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

function validateUsername(username, setOK) {
    if (username.length === 0) {
        setOK(false)
        return -1
    }
    /**
     * add check if not in DB
     */
    if (username.length <= 2) {
        setOK(false)
        return 0
    } else {
        setOK(true)
        return 1
    }
}

function validatePassword(password,setOK) {
    if(password.length === 0){
        setOK(false)
        return -1
    }
    var digit = /.*[\d]{1,}.*[\d]{1,}.*[\d]{1,}.*[\d]{1,}.*/.test(password)
    var capital = /[A-Z]/.test(password)
    if (password.length >= 8 && digit && capital) {
        setOK(true)
        return 1
    }
    setOK(false)
    return 0

}

function RegisterPage() {
    const[username,setUserName] = useState('')
    const[OKUsername,setOKUsername] = useState(false)
    const[password,setPassword] = useState('')
    const[OKPassword,setOKPassword] = useState(false)
    const[confirmPassword,setConfirmPassword] = useState('')
    const[OKConfirmPassword,setOKConfirmPassword] = useState(false)
    const[displayName,setDisplayName] = useState('')
    const[OKdisplayName,setOKDisplayName] = useState(false)
    const[img,setImg] = useState('')
    const[OKimg,setOKImg] = useState(false)


    const[imgDisplay, setImgDisplay] = useState(false)
    const lastImg = useRef(img)
    const [messageConfirmPasswords, setMessageConfirmPasswords] = useState('')
    const [alertClass, setAlertClass] = useState('')
    const navigate = useNavigate();
    const [sendToServer, setSendToServer] = useState(false)
    const [registerDisplayError, setRegisterDisplayError] = useState(false)
    let userNameTest = "steve"
    useEffect(()=>{
        setRegisterDisplayError(false)
    },[username,password,confirmPassword,displayName,img])
    function confirmPasswordValidator(p1, p2,setOK) {
        if(p2.confirmPassword.length === 0){
            //setOK(false)
            return -1
        }
        else if(p1.password === p2.confirmPassword){
            //setOK(true)
            return 1
        }
        //setOK(false)
        return 0
    }
    return (
        <>
            <div className="background-jumbo"></div>
            <div className="row">
                <div className="header">Register to start chatting!</div>
            </div>
            <div className="row">
                <div className="card col-8 container">
                    <form>

                        <Input
                            label="Username"
                            type="text"
                            id="registerUsernameInput"
                            placeHolder="Enter username"
                            setter={setUserName}
                            setOK={setOKUsername}
                            validator={validateUsername}
                            successMessage="username valid"
                            errorMessage="error with user name, taken or invalid"
                        />
                        <Input
                            label="Password"
                            type="password"
                            id="registerPasswordInput"
                            placeHolder="Enter password"
                            setter={setPassword}
                            setOK={setOKPassword}
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
                            validator={(p) => function () {
                                return -1
                            }
                            }
                            successMessage="passwords are the same"
                            errorMessage="passwords are not the same"
                        />
                        {((confirmPasswordValidator({password}, {confirmPassword})) === 1 &&
                            <Alert condition={true} alertClass="alert alert-success"
                                   errorMessage="passwords are identical"/>
                            ||
                            ((confirmPasswordValidator({password}, {confirmPassword})) === 0 &&
                                <Alert condition={true} alertClass="alert alert-danger"
                                       errorMessage="passwords don't match"/>))

                        }
                        <Input
                            label="Display Name"
                            type="text"
                            id="registerDisplayNameInput"
                            placeHolder="Enter display name"
                            setter={setDisplayName}
                            setOK={setOKDisplayName}
                            validator={(name, setOK) => {
                                if (name.length === 0) {
                                    setOK(false)
                                    return -1
                                } else if (name.length > 2) {
                                    setOK(true)
                                    return 1
                                } else {
                                    setOK(false)
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
                            validator={(event, setter) => {
                                if (event.target.files.length === 0) {
                                    setImgDisplay(false)
                                    setOKImg(false)
                                    return -1

                                }
                                const file = event.target.files[0];

                                //not image
                                if (!file.type.startsWith('image/')) {
                                    setImgDisplay(false)
                                    setOKImg(false)
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
                                setOKImg(true)
                                return 1;
                            }
                            }
                            successMessage="looks good!"
                            errorMessage="not right format"
                        />

                        {imgDisplay && <div className="col-2 mt-4">
                            <img src={img} alt="img"
                                 style={{maxWidth: "100%", maxHeight: "100%"}}></img>

                        </div>}

                        <div className="row mt-2">
                            <div className="col-1">
                                <div className="d-contents">
                                    <button
                                        onClick={(event) => (validateSignup(event, navigate, setRegisterDisplayError, {
                                            data:{
                                                username: username,
                                                password: password,
                                                confirmPassword: confirmPassword,
                                                displayName: displayName,
                                                profilePictue: img

                                            },
                                            OK:{
                                                usernameOK: OKUsername,
                                                passwordOK: OKPassword,
                                                displayNameOK:OKdisplayName,
                                                imgOK: OKimg
                                            }
                                        }))}
                                        type="submit" className="btn btn-primary">Login
                                    </button>

                                </div>
                            </div>
                            {registerDisplayError &&
                                <Alert condition={registerDisplayError} alertClass="alert alert-danger col-3"
                                       errorMessage="Detected errors, please fix before signup"/>
                            }

                            <div className="col-4 row justify-content-center align-content-center">
                                <div className="d-contents">Already have an account&nbsp;<Link to="/"> Click
                                    here </Link>&nbsp;to login.

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
