import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import ExpenseForm from "./ExpenseForm"
import ExpenseList from "./ExpenseList"
import Statistic from "./Statistic"
import Nav from "./Nav"

const Dashboard = () => {
    let [user, setUser] = useState({});
    let [submit, setSubmit] = useState(false);
    
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/api/user/logged", {withCredentials: true})
            .then(response => setUser(user))
            .catch(error => navigate("/"))
    }, [])

    return (
        <div>
            <Nav/>
            <ExpenseForm submit={submit} setSubmit={setSubmit}/>
            <ExpenseList submit={submit}/>
            <Statistic submit={submit}/>
        </div>
    )
}

export default Dashboard;