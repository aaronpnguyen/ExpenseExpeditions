import React from 'react';
import RegistrationForm from "./RegistrationForm"
import LoginForm from "./LoginForm"

const SignIn = () => {
    return (
        <div>
            <h1>Sign in or register below</h1>
            <RegistrationForm/>
            <LoginForm/>
        </div>
    )
}

export default SignIn;