import React, {useEffect, useState} from 'react';
import axios from 'axios'
import {useNavigate, Link, useParams} from 'react-router-dom';

const SideBar = () => {
    const [expedition, setExpedition] = useState("")
    const [expeditionList, setExpeditionList] = useState([])
    const [add, setAdd] = useState(true);
    const {id} = useParams()

    const navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:8000/api/expeditions/user", {withCredentials: true})
            .then(response => setExpeditionList(response.data))
            .catch(error => navigate('/'))
    }, [expeditionList])

    const submitHandler = e => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/expedition/new", {title: expedition}, {withCredentials: true})
            .then(response => console.log(response.data))
            .catch(error => console.log(error))
        setAdd(!add)
        setExpedition("")
    }

    const cancel = e => {
        e.preventDefault()
        setAdd(!add)
    }

    return (
        <div className="sideBarContainer">
            {
            add?
                <button onClick={e => setAdd(!add)} className="newExpedition">New Expedition</button>:
                <div>
                    <form onSubmit={submitHandler} className="expeditionForm">
                        <input type="text" placeholder="New Expedition" value={expedition} onChange={e => setExpedition(e.target.value)}/>
                        <div className="buttonHolder">
                            <button onClick={cancel}>Cancel</button>
                            <button>Add</button>
                        </div>
                    </form>
                </div>
            }
            <div className='links'> 
                {id? <Link to="/dashboard" className="expeditionLink">Main Expedition</Link>: null}
                {expeditionList?.map((item, i) => <Link to={`/expedition/${item._id}`} key={i} className={id === item._id? "selectedLink expeditionLink": "expeditionLink"}>{item.title}</Link>)}
            </div>
        </div>
    )
}

export default SideBar;