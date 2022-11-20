import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import ExpenseForm from '../components/ExpenseForm'
import ExpenseList from '../components/ExpenseList'
import Statistic from '../components/Statistic'
import SideBar from '../components/SideBar'

const Expedition = () => {
    const [submit, setSubmit] = useState(false)
    const {id} = useParams()
    
    return (
        <div className='bodyContainer'>
            <div className='leftBody'>
                <SideBar/>
            </div>
            <div className='rightBody'>
                <div className='topper'>
                    <Statistic expeditionId={id} submit={submit}/>
                    <ExpenseForm expeditionId={id} submit={submit} setSubmit={setSubmit}/>
                </div>
                <div className='bottom'>
                    <ExpenseList expeditionId={id} submit={submit} setSubmit={setSubmit}/>
                </div>
            </div>
        </div>
    )
}

export default Expedition;