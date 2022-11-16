import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom'
import {DataParser, ChartInfo, Sum} from "./assets/functions"
import axios from 'axios'
import {Doughnut, Bar, Pie} from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto'

const Chart = submit => {
    const [expense, setExpense] = useState();
    const [sum, setSum] = useState(0);
    const {id} = useParams()

    useEffect(() => {
        let route = ""
        id? route = `http://localhost:8000/api/finances/expedition/${id}`: route = "http://localhost:8000/api/finances/user"
        axios.get(route, {withCredentials: true})
            .then(response => {
                let data = DataParser(response)
                setExpense(ChartInfo(data))
                setSum(Sum(response))
            })
            .catch(error => console.log(error))
    }, [submit]) 

    return (
        <div>
            <div>
            {
            expense?
                <div style={{width: 500}}>
                    <Doughnut data={expense}/>
                </div>:
            null
            }
            </div>
            <div>
                <p>{sum}</p>
            </div>
        </div>
    )
}

export default Chart