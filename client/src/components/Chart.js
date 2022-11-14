import React, {useEffect, useState} from 'react';
import {DataParser} from "./assets/functions"
import axios from 'axios'

const Chart = () => {
    const [expense, setExpense] = useState();

    useEffect(() => {
        axios.get("http://localhost:8000/api/finances/user", {withCredentials: true})
            .then(response => setExpense(DataParser(response)))
            .catch(error => console.log(error))
    }, [])
}

export default Chart