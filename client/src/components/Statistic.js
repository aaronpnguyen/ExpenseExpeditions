import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom'
import {DataParser, ChartInfo, Sum, Unparse} from "./assets/functions"
import axios from 'axios'
import {Pie} from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto'
import Numeral from 'react-numeral'

const Chart = submit => {
    const [expense, setExpense] = useState();
    const [dataList, setDataList] = useState([]);
    const [expedition, setExpedition] = useState();
    const [sum, setSum] = useState(0);
    const [toggle, setToggle] = useState(true)
    const {id} = useParams()

    const navigate = useNavigate();
    useEffect(() => {
        let route = ""
        id? route = `http://localhost:8000/api/finances/expedition/${id}`: route = "http://localhost:8000/api/finances/user"
        axios.get(route, {withCredentials: true})
            .then(response => {
                let data = DataParser(response)
                setDataList(Unparse(data))
                setExpense(ChartInfo(data))
                setSum(Sum(response))
            })
            .catch(error => navigate("/"))
        if (id) {
            axios.get(`http://localhost:8000/api/expedition/${id}`, {withCredentials: true})
                .then(response => setExpedition(response.data))
                .catch(error => console.log(error))
        }
    }, [submit])

    return (
        <div className='chartContainer'>
            <h1>{expedition? expedition.title: "Main Expenses"}</h1>
            {dataList.length? <button className="chartButton" onClick={e => setToggle(!toggle)}>{toggle? "Show Statistics": "Show Chart"}</button>: null}

            {
                dataList.length?
                    toggle? 
                        <div className="chart">
                            {expense? <Pie data={expense} options={expense.options}/>: null}
                        </div>:
                    <>
                    <h3>Total Spent: <Numeral value={sum} format={"$0,0.00"}/></h3>
                    {
                        dataList?.map((item, i) => {
                            return <p key={i} className={item.total > 0? "stat lostMonies": "stat gainedMonies"}>
                                <span><strong>{item.type}:</strong> <Numeral value={item.total} format={"$0,0.00"}/></span>
                                <span>{(item.total / sum) > 0.009? <Numeral value={(item.total / sum) * 100} format={"0.0"}/>: "< 1"}%</span>
                            </p>
                        })
                    }
                    </>:
                <h3>You do not have any expenses yet!</h3>
            }
        </div>
    )
}

export default Chart