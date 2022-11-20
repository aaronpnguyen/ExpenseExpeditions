import React, {useEffect, useState} from 'react' 
import {useNavigate, Link} from 'react-router-dom'
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
                        <h1 className="logo">{document.cookie? <Link to="/dashboard">Expense Expeditions</Link>: <Link to="/">Expense Expeditions</Link>}</h1>
                    </div>
                </div>
                <div className="rightNav">
                    <div className="login">
                    {
                        document.cookie?<button onClick={logout}>Sign Out</button>: <button onClick={e => navigate("/sign-in")}>Sign In</button>
                    } 
                    </div>
                </div>
            </div>
        </>
    )
}

export default Nav;