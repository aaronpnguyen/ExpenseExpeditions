import axios from 'axios'
import React, {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom'

const LoginForm = () => {
    let [info, setInfo] = useState({})
    let [errors, setErrors] = useState(false)

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
            .then(response => navigate("/dashboard"))
            .catch(error => setErrors(true))
    }

    return (
        <div className="makeUser">
            <form onSubmit={login} className="credentialForm">
                <h3>Sign-In</h3>
                <div className='credentialInput'>
                    {errors? <p className="validation">Invalid credentials</p>: null}
                    <input type="text" className="credential" name="email" onChange={changeHandler} placeholder="Email"/>
                </div>
                <div className='credentialInput'>
                    <input type="password" className="credential" name="password" onChange={changeHandler} placeholder="Password"/>
                </div>
                <div className="extras">
                    <Link className="credentialLink" to="/register">Don't have an account?</Link>
                    <button>Login</button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm;