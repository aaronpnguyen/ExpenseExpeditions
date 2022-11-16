import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import ExpenseForm from './ExpenseForm'
import ExpenseList from './ExpenseList'
import Statistic from './Statistic'

const Expedition = () => {
    const [submit, setSubmit] = useState(false)
    const {id} = useParams()
    
    return (
        <>
            <ExpenseForm expeditionId={id} submit={submit} setSubmit={setSubmit}/>
            <ExpenseList expeditionId={id} submit={submit}/>
            <Statistic expeditionId={id} submit={submit}/>
        </>
    )
}

export default Expedition;