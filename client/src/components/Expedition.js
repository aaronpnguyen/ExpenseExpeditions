import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import ExpenseForm from './ExpenseForm'

const Expedition = () => {
    const [submit, setSubmit] = useState(false)
    const {id} = useParams()
    
    return (
        <>
            <ExpenseForm expeditionId={id} submit={submit} setSubmit={setSubmit}/>
            <p>{id}</p>
        </>
    )
}

export default Expedition;