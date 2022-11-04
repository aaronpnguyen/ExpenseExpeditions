import React from 'react';

const RegistrationForm = () => {
    return (
        <div>
            <h3>Register</h3>
            <form>
                <div className='formInput'>
                    <label htmlFor='firstName'>First name: </label>
                    <input type="text" name="firstName"/>
                </div>
                <div className='formInput'>
                    <label htmlFor='lastName'>Last name: </label>
                    <input type="text" name="lastName"/>
                </div>
                <div className='formInput'>
                    <label htmlFor='email'>Email: </label>
                    <input type="text" name="email"/>
                </div>
                <div className='formInput'>
                    <label htmlFor='password'>Password: </label>
                    <input type="password" name="password"/>
                </div>
                <div className='formInput'>
                    <label htmlFor='confirm'>Confirm Password :</label>
                    <input type="password" name="confirm"/>
                </div>
                <button>Register</button>
            </form>
        </div>
    )
}

export default RegistrationForm;