function checkParams(obj, params) {
    let errors = {}
    for (const p of params) {
        if (obj[p] === undefined) {
            errors[p] = [];
            errors[p].push(`The ${p} field is required.`)
        }
    }
    if(Object.keys(errors).length !== 0){
        return {
            status: 400,
            body: {
                title: "One or more validation errors occurred.",
                status: 400,
                errors:errors

            }
        }
    }
    else{return undefined}
}

module.exports = checkParams