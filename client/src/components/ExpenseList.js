import React, {useEffect, useState} from 'react';
import axios from 'axios'
import moment from 'moment'

const ExpenseList = submit => {
    const [expense, setExpense] = useState();

    useEffect(() => {
        axios.get("http://localhost:8000/api/finances/user", {withCredentials: true})
            .then(response => setExpense(response.data))
            .catch(error => console.log(error))
    }, [submit])

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Transaction</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                {
                    expense?.map((expense, i) => {
                        const {transaction, amount, date, type} = expense;
                        return(
                            <tr key={i}>
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
        </div>
    )
}

export default ExpenseList