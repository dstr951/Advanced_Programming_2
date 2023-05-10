import React, {useRef} from "react";
import Input from "./Input";
import {useState} from "react";

function validateUsername(username) {
    if (username.length === 0) {
        return -1
    }
    /**
     * add check if not in DB
     */
    if (username.length <= 2) {
        return 0
    } else {

        return 1
    }
}

function validatePassword(password) {
    if(password.length === 0){
        return -1
    }
    var digit = /.*[\d]{1,}.*[\d]{1,}.*[\d]{1,}.*[\d]{1,}.*/.test(password)
    var capital = /[A-Z]/.test(password)
    if (password.length >= 8 && digit && capital) {
        console.log("here")
        return 1
    }
    return 0


}
function RegisterPage() {
    const [signUpDetails,setSignUpDetails] = useState({
        username:'',
        password:'',
        confirmPassword:'',
        displayName:'',
        img:'',
    })
    const[username,setUserName] = useState('')
    const[password,setPassword] = useState('')
    const[confirmPassword,setConfirmPassword] = useState('')
    const[displayName,setDisplayName] = useState('')
    const[img,setImg] = useState('')
    const[imgDisplay, setImgDisplay] = useState(false)
    const lastImg = useRef(img)
    const  passwordGetter = function(){
        return password
    }
    const confirmPasswordGetter = function (){
        return confirmPassword
    }
    function confirmPasswordValidator(p1, p2) {
        if(p2.confirmPassword.length === 0){
            return -1
        }
        else if(p1.password === p2.confirmPassword){

            return 1
        }

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
                        {((confirmPasswordValidator({password},{confirmPassword})) === 1 &&  <div className={"success"}>passwords are the same</div>) ||
                            ((confirmPasswordValidator({password},{confirmPassword})) === 0 &&  <div className={"success"}>passwords are not the same</div>)
                        }
                        <Input
                            label="Display Name"
                            type="text"
                            id="registerDisplayNameInput"
                            placeHolder="Enter display name"
                            setter={setDisplayName}
                            validator={()=> {return 1}}
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