import React, {useEffect, useState} from 'react';
import axios from 'axios'
import {useNavigate, Link, useParams} from 'react-router-dom';

const SideBar = () => {
    const [expedition, setExpedition] = useState("")
    const [expeditionList, setExpeditionList] = useState([])
    const [error, setError] = useState({})
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
            .then(response => {
                if (response.data.errors) setError(response.data.errors);
                else {
                    setError({})
                    setAdd(!add)
                };
            })
            .catch(error => console.log(error))
        setExpedition("")
    }

    const cancel = e => {
        e.preventDefault()
        setError({})
        setAdd(!add)
        setExpedition("")
    }

    return (
        <div className="sideBarContainer">
            <div>
                {
                add?
                    <button onClick={e => setAdd(!add)} className="newExpedition noBorder">New Expedition</button>:
                    <div>
                        <form onSubmit={submitHandler} className="expeditionForm">
                            {error.title? <p className="validation">{error.title.message}</p>: null}
                            <input type="text" placeholder="New Expedition" value={expedition} onChange={e => setExpedition(e.target.value)}/>
                            <div className="buttonHolder">
                                <button onClick={cancel} className='noBorder exp-btn'>Cancel</button>
                                <button className='noBorder exp-btn'>Add</button>
                            </div>
                        </form>
                    </div>
                }
                <div className='links'> 
                    {id? <Link to="/dashboard" className="expeditionLink">Main Expedition</Link>: null}
                    {expeditionList?.map((item, i) => <Link to={`/expedition/${item._id}`} key={i} className={id === item._id? "selectedLink expeditionLink": "expeditionLink"}>{item.title}</Link>)}
                </div>
            </div>
        </div>
    )
}

export default SideBar;