import React, {useState} from 'react';
import axios from 'axios';
import {Categories} from './assets/functions';

const ExpenseForm = props => {
    let [info, setInfo] = useState({transaction: "", amount: "", date: "", type: ""})
    let [error, setErrors] = useState({})
    
    // Destructuring
    const {transaction, amount, date, type} = info
    const {submit, setSubmit} = props

    const changeHandler = e => {setInfo({...info, [e.target.name]: e.target.value})}

    const createTransaction = e => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/finance/new", info, {withCredentials: true})
            .then(response => {
                if (response.data.errors) setErrors(response.data.errors)
                setInfo({transaction: "", amount: "", date: "", type: ""})
                setSubmit(!submit)
            })
            .catch(error =>  console.log(error))
    }
    
    return(
        <div>
            <form onSubmit={createTransaction}>
                <input type="text" name="transaction" placeholder="Name of Transaction" value={transaction} onChange={changeHandler}/>
                <input type="text" name="amount" placeholder="Amount" value={amount} onChange={changeHandler}/>
                <input type="date" name="date" placeholder="Date" value={date} onChange={changeHandler}/>
                <select name="type" placeholder="Type" value={type} onChange={changeHandler} defaultValue={Categories[0]}>
                    {
                        Categories.map((type, i) => {
                            return <option key={i} value={type}>{type}</option>
                        })
                    }
                </select>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default ExpenseForm;