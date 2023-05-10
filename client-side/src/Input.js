import {useRef, useState} from "react";



function Input({label, type, id, placeHolder, setter,validator, parameters,successMessage, errorMessage}) {
    const [displaySuccess, setDisplaySuccess] = useState(false)
    const [displayError, setDisplayError] = useState(false)
    const[password,setPassword] = useState('')
    const[confirmPassword,setConfirmPassword] = useState('')



    const inputBox = useRef(null)
    const getInput = function (e,id){

        var tempParam = inputBox.current.value
        setter(tempParam)
        var returnVal
        if( id === 'registerProfilePictureInput'){

            returnVal = validator(e,setter)
        }
        else {
            returnVal = validator(tempParam)
        }
        if(returnVal === 1){
            setDisplayError(false)
            setDisplaySuccess(true)
        }
        else if(returnVal === 0){
            setDisplaySuccess(false)
            setDisplayError(true)
        }
        else{
            setDisplaySuccess(false)
            setDisplayError(false)
        }
    }


    return (
        <>
            <div className="form-group row">
                <div className="col-12 mt-2">
                    <label htmlFor={id}>{label}</label>
                    <input ref={inputBox} onChange={(e)=> getInput(e,id)} type={type} className="form-control" id={id}
                           placeholder={placeHolder}></input>
                    {displaySuccess && <div className={"success"}>{successMessage}</div>}
                    {displayError && <div className={"error"}>{errorMessage}</div>}
                </div>
            </div>
        </>)

}

export default Input



/*


 */