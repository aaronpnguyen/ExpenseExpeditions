import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import ExpenseForm from './ExpenseForm'
import ExpenseList from './ExpenseList'
import Statistic from './Statistic'
import SideBar from './SideBar'

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
                    <ExpenseList expeditionId={id} submit={submit}/>
                </div>
            </div>
        </div>
    )
}

export default Expedition;