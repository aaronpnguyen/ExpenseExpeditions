import React, {useEffect, useState} from 'react';
import axios from 'axios'
import {useNavigate, Link} from 'react-router-dom';

const SideBar = () => {
    const [expedition, setExpedition] = useState("")
    const [expeditionList, setExpeditionList] = useState([])
    const [add, setAdd] = useState(true);

    const navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:8000/api/expeditions/user", {withCredentials: true})
            .then(response => setExpeditionList(response.data))
            .catch(error => navigate('/'))
    }, [expeditionList])

    const submitHandler = e => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/expedition/new", {title: expedition}, {withCredentials: true})
            .then(response => console.log("success!"))
            .catch(error => console.log(error))
        setAdd(!add)
        setExpedition("")
    }

    return (
        <>
            {
            add?
                <button onClick={e => setAdd(!add)}>Create a New Expedition?</button>:
                <div>
                    <form onSubmit={submitHandler}>
                        <input type="text" placeholder="New Expedition" value={expedition} onChange={e => setExpedition(e.target.value)}/>
                        <button>Add</button>
                    </form>
                </div>
            }
            <div> {
                expeditionList?.map((item, i) => 
                <p>
                    <Link to={`/expedition/${item._id}`}>{item.title}</Link>
                </p>
                )
            } </div>
        </>
    )
}

export default SideBar;