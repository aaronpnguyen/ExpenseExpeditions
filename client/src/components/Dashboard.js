import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const Dashboard = () => {
    const [user, setUser] = useState({});
    
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:8000/api/user/logged", {withCredentials: true}) // Send cookies back to api
            .then(response => {setUser(response.data)})
            .catch(navigate("/"))
    })

    const logout = () => {
        axios.get("http://localhost:8000/api/user/logout", {withCredentials: true})
            .then(navigate("/"))
            .catch(console.log("We didn't logout!"))
    }

    return (
        <div>
            <h1>User dashboard! {user.password}</h1>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Dashboard;