import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import ExpenseForm from "./ExpenseForm"
import ExpenseList from "./ExpenseList"
import Statistic from "./Statistic"
import SideBar from "./SideBar"

const Dashboard = () => {
    let [user, setUser] = useState({});
    let [submit, setSubmit] = useState(false);
    
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/api/user/logged", {withCredentials: true})
            .then(response => setUser(response.data))
            .catch(error => navigate("/"))
    }, [])

    return (
        <div>
            <SideBar/>
            <ExpenseForm submit={submit} setSubmit={setSubmit}/>
            <ExpenseList submit={submit}/>
            <Statistic submit={submit}/>
        </div>
    )
}

export default Dashboard;