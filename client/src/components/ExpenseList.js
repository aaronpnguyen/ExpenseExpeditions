import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'

const ExpenseList = props => {
    const [expense, setExpense] = useState([]);
    const {id} = useParams();

    const {submit, setSubmit} = props

    const navigate = useNavigate()
    useEffect(() => {
        let route = ""
        id? route = `http://localhost:8000/api/finances/expedition/${id}`: route = "http://localhost:8000/api/finances/user"
        axios.get(route, {withCredentials: true})
            .then(response => {
                setExpense(response.data)
            })
            .catch(error => navigate("/"))
    }, [submit])

    const deleteExpense = id => {
        axios.delete(`http://localhost:8000/api/finance/delete/${id}`)
            .then(response => setSubmit(!submit))
            .catch(error => console.log(error))
    }

    return (
        expense.length?
            <table className="tableContainer">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Transaction</th>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {
                    expense?.map((expense, i) => {
                        const {_id, transaction, amount, date, type} = expense;
                        return(
                            <tr key={i} className={amount > 0? "notCashMonies": "cashMonies"}>
                                <td>{moment.utc(date).format("MMMM Do YYYY")}</td>
                                <td>{transaction}</td>
                                <td>{type}</td>
                                <td> {amount < 0? "+ ": "- "}${new Intl.NumberFormat().format(Math.abs(amount))}</td>
                                <td><button onClick={e => deleteExpense(_id)}>Delete</button></td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>:
        null
    )
}

export default ExpenseList