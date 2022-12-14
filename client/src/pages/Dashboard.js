import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import ExpenseForm from "../components/ExpenseForm"
import ExpenseList from "../components/ExpenseList"
import Statistic from "../components/Statistic"
import SideBar from "../components/SideBar"

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
        user?
        <div className='bodyContainer'>
            <div className='leftBody'>
                <SideBar/>
            </div>
            <div className='rightBody'>
                <div className='topper'>
                    <Statistic submit={submit}/>
                    <ExpenseForm submit={submit} setSubmit={setSubmit}/>
                </div>
                <div className='bottom'>
                    <ExpenseList submit={submit} setSubmit={setSubmit}/>
                </div>
            </div>
        </div>:
        null
    )
}

export default Dashboard;