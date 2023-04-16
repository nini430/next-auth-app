export const loginValidate=(values:{email:string,password:string})=>{
    const errors:any={};

    if(!values.email) {
        errors.email='Required!'
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email='Invalid Email address'
    }

    if(!values.password) {
        errors.password='Required!'
    }else if(values.password.length<8 || values.password.length >20 ) {
        errors.password='Must be greater than 8 and less than 20 characters long';
    }else if(values.password.includes(' ')) {
        errors.password='Invalid password'
    }

    return errors;
}

export const registerValidate=(values:{username:string,email:string,password:string,cpassword:string})=>{
        const errors:any={};

        if(!values.username) {
            errors.username='Required'
        }else if(values.username.includes(' ')) {
            errors.username='Invalid username'
        }

        if(!values.email) {
            errors.email='Required'
        }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email='Invalid Email address';
        }

        if(!values.password) {
            errors.password='Required'
        }else if(values.password.length<8 || values.password.length >20) {
            errors.password='Must be greater than 8 and less than 20 character slong'
        }else if(values.password.includes(' ')) {
            errors.password='Invalid Password'
        }

        if(!values.cpassword) {
            errors.cpassword='Required!'
        }else if(values.password!==values.cpassword) {
            errors.cpassword='Passwords not match'
        }else if(values.cpassword.includes(' ')) {
            errors.cpassword='Invalid confirm password'
        }
        return errors;
}