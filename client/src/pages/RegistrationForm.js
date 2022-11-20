import axios from 'axios'
import React, {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom'

const RegistrationForm = () => {
    let [info, setInfo] = useState({})
    let [errors, setErrors] = useState("")

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
            .catch(error => console.log(error))
    }

    return (
        <div className="makeUser">
            <form onSubmit={register} className="credentialForm register">
                <h3>Register</h3>
                <div className='credentialInput'>
                    {errors.firstName? <p className="validation">{errors.firstName.message}</p>: null}
                    <input type="text" className="credential" name="firstName"onChange={changeHandler} placeholder="First Name"/>
                </div>
                <div className='credentialInput'>
                    {errors.lastName? <p className="validation">{errors.lastName.message}</p>: null}
                    <input type="text" className="credential" name="lastName" onChange={changeHandler} placeholder="Last Name"/>
                </div>
                <div className='credentialInput'>
                    {errors.email? <p className="validation">{errors.email.message}</p>: null}
                    <input type="text" className="credential" name="email" onChange={changeHandler} placeholder="Email"/>
                </div>
                <div className='credentialInput'>
                    {errors.password? <p className="validation">{errors.password.message}</p>: null}
                    <input type="password" className="credential" name="password" onChange={changeHandler} placeholder="Password"/>
                </div>
                <div className='credentialInput'>
                    {errors.confirm? <p className="validation">{errors.confirm.message}</p>: null}
                    <input type="password" className="credential" name="confirm" onChange={changeHandler} placeholder="Confirm Password"/>
                </div>
                <div className="extras">
                    <Link className="credentialLink" to="/sign-in">Already have an account?</Link>
                    <button>Register</button>
                </div>
            </form>
        </div>
    )
}

export default RegistrationForm;