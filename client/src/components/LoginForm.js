import axios from 'axios'
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'

const LoginForm = () => {
    let [info, setInfo] = useState({})
    let [errors, setErrors] = useState({})

    const changeHandler = e => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })
    }

    const navigate = useNavigate();
    const login = e => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/user/login", info, {withCredentials: true})
            .then(response => {
                if (response.data.errors) setErrors(response.data.errors)
                else navigate("/dashboard")
            })
            .catch(error => response.json(error))
    }

    return (
        <div>
            <h3>Sign In</h3>
            <form onSubmit={login}>
                <div className='formInput'>
                    <label htmlFor='email'>Email: </label>
                    <input type="text" name="email" onChange={changeHandler}/>
                </div>
                <div className='formInput'>
                    <label htmlFor='password'>Password: </label>
                    <input type="password" name="password" onChange={changeHandler}/>
                </div>
                <button>Login</button>
            </form>
        </div>
    )
}

export default LoginForm;