export const generateUserErrorInfo = (user) =>{
    return `One or more properties were incomplete or not valid:
     List of required propertires:
     - last_name: needs to be a string, received ${user.last_name }
     - firs_name: needs to be a string, received ${user.firs_name }
     - email: needs to be a string, received ${user.email }
     `
}
export const generateNotFoundInfo = (cid) =>{
    return `the page you requested doesn't exist
        - the item ${cid} is could not be found`
}