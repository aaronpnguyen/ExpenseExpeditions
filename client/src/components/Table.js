import React, {useEffect, useState} from 'react';

const Table = props => {
    const [expense, setExpense] = useState(props.finance);

    console.log(props.finance)
    return (
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
            </tbody>
        </table>
    )
}

export default Table;