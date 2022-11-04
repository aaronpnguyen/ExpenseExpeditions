import axios from 'axios'
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'

const RegistrationForm = () => {
    let [info, setInfo] = useState({})
    let [errors, setErrors] = useState({})

    const changeHandler = e => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })
    }

    const navigate = useNavigate();
    const register = e => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/user/register", info, {withCredentials: true})
            .then(response => {
                console.log(response)
                if (response.data.errors) setErrors(response.data.errors)
                else navigate("/dashboard")
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div>
            <h3>Register</h3>
            <form onSubmit={register}>
                <div className='formInput'>
                    <label htmlFor='firstName'>First name: </label>
                    <input type="text" name="firstName" onChange={changeHandler}/>
                </div>
                <div className='formInput'>
                    <label htmlFor='lastName'>Last name: </label>
                    <input type="text" name="lastName" onChange={changeHandler}/>
                </div>
                <div className='formInput'>
                    <label htmlFor='email'>Email: </label>
                    <input type="text" name="email" onChange={changeHandler}/>
                </div>
                <div className='formInput'>
                    <label htmlFor='password'>Password: </label>
                    <input type="password" name="password" onChange={changeHandler}/>
                </div>
                <div className='formInput'>
                    <label htmlFor='confirm'>Confirm Password: </label>
                    <input type="password" name="confirm" onChange={changeHandler}/>
                </div>
                <button>Register</button>
            </form>
        </div>
    )
}

export default RegistrationForm;