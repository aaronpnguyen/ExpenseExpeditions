import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import ExpenseForm from './ExpenseForm'
import ExpenseList from './ExpenseList'

const Expedition = () => {
    const [submit, setSubmit] = useState(false)
    const {id} = useParams()
    
    return (
        <>
            <ExpenseForm expeditionId={id} submit={submit} setSubmit={setSubmit}/>
            <ExpenseList expeditionId={id} submit={submit}/>
            <p>{id}</p>
        </>
    )
}

export default Expedition;