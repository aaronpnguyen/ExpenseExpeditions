import React, {useEffect, useState} from 'react' 
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

const Nav = () => {
    const navigate = useNavigate();
    const logout = () => {
        axios.get("http://localhost:8000/api/user/logout", {withCredentials: true})
            .then(response => navigate("/"))
            .catch(error => console.log("we didn't log out!", error))
    }

    return (
        <>
            <div className="nav">
                <div className="leftNav">
                    <div className="logo">
                        <h1 className="logo">Modular Tracker</h1>
                    </div>
                </div>
                <div className="rightNav">
                    <div className="login">
                    {
                        document.cookie?<button onClick={logout}>Sign Out</button>:<button>Sign In</button>
                    } 
                    </div>
                </div>
            </div>
        </>
    )
}

export default Nav;