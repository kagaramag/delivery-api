const emailIsValid = (email,res) => {
    if(
        typeof email === 'string'

        ){
        return email
    }else{
        return  false
    }
}
const passwordIsValid = (password) => {
    if(password){
        return password
    }else{
        return  false
    }
}

export default { emailIsValid, passwordIsValid }