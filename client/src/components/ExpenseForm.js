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
        if (props.expeditionId) setInfo(Object.assign(info, {expedition: props.expeditionId}));
        axios.post("http://localhost:8000/api/finance/new", info, {withCredentials: true})
            .then(response => {
                console.log(response.data)
                if (response.data.errors) setErrors(response.data.errors);
                else setErrors(null);
                setInfo({transaction: "", amount: "", date: "", type: ""})
                setSubmit(!submit)
            })
            .catch(error => console.log(error))
    }
    
    return(
        <div className="expenseFormContainer">
            <form onSubmit={createTransaction}>
                <div className="inputForm">
                    {error.transaction? <p className="validation">{error.transaction.message}</p>: null}
                    <input type="text" name="transaction" placeholder="Name of Transaction" className="userInput" value={transaction} onChange={changeHandler}/>
                </div>
                <div className="inputForm">
                    {error.amount? <p className="validation">{error.amount.message}</p>: null}
                    <input type="text" name="amount" placeholder="Amount" className="userInput"value={amount} onChange={changeHandler}/>
                </div>
                <div className="inputForm">
                    {error.date? <p className="validation">{error.date.message}</p>: null}
                    {error.type? <p className="validation">{error.type.message}</p>: null}
                    <div className="selectors">
                        <input type="date" name="date" placeholder="Date" value={date} onChange={changeHandler}/>
                        <select name="type" placeholder="Type" value={type} onChange={changeHandler} defaultValue={Categories[0]}>
                            {
                                Categories.map((type, i) => {
                                    return <option key={i} value={type}>{type}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
                <button className="expenseButton">Create Transaction</button>
            </form>
        </div>
    )
}

export default ExpenseForm;