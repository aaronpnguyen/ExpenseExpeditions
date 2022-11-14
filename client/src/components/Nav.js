import {useNavigate} from 'react-router-dom'
import axios from 'axios';

const Nav = () => {
    const navigate = useNavigate();
    const logout = () => {
        axios.get("http://localhost:8000/api/user/logout", {withCredentials: true})
            .then(response => navigate("/"))
            .catch(error => console.log("we didn't log out!", error))
    }

    return (
        <button onClick={logout}>Logout</button>
    )
}

export default Nav;