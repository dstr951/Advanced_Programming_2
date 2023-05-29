


async function registerUser(fromDB){
    if(fromDB.status === 200){
        return {
            status:200,
        }
    }
    else if(fromDB.status === 500){
        return{
            status:409,
            body:{
                title: "Conflict",
                status: 409
            }
        }
    }
    else if(fromDB.status === 400){
        return fromDB;
    }
}



module.exports = {
    registerUser

}