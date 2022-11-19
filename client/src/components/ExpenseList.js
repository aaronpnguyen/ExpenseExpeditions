import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'

const ExpenseList = submit => {
    const [expense, setExpense] = useState();
    const {id} = useParams();

    const navigate = useNavigate()
    useEffect(() => {
        let route = ""
        id? route = `http://localhost:8000/api/finances/expedition/${id}`: route = "http://localhost:8000/api/finances/user"
        axios.get(route, {withCredentials: true})
            .then(response => setExpense(response.data))
            .catch(error => navigate("/"))
    }, [submit])

    return (
        <table className="tableContainer">
            <thead>
                <tr>
                    <th>Transaction</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {
                expense?.map((expense, i) => {
                    const {transaction, amount, date, type} = expense;
                    return(
                        <tr key={i} className={amount > 0? "notCashMonies": "cashMonies"}>
                            <td>{transaction}</td>
                            <td>${new Intl.NumberFormat().format(Math.abs(amount))}</td>
                            <td>{moment.utc(date).format("MMMM Do YYYY")}</td>
                            <td>{type}</td>
                            <td>Delete | Edit</td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
}

export default ExpenseList