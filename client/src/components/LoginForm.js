import React from 'react';

const LoginForm = () => {
    return (
        <div>
            <h3>Sign In</h3>
            <form>
                <div className='formInput'>
                    <label htmlFor='email'>Email: </label>
                    <input type="text" name="email"/>
                </div>
                <div className='formInput'>
                    <label htmlFor='password'>Password: </label>
                    <input type="password" name="password"/>
                </div>
                <button>Login</button>
            </form>
        </div>
    )
}

export default LoginForm;