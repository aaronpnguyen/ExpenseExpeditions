import './components/css/navbar.css';
import './components/css/panel.css';
import './components/css/credential.css';
import './components/css/home.css';
import './components/css/root.css';
import Nav from './components/Nav'
import LoginForm from './pages/LoginForm'
import RegistrationForm from './pages/RegistrationForm'
import Dashboard from './pages/Dashboard'
import Expedition from './pages/Expedition'
import Home from './pages/Home'
import {Routes, Route, Link} from "react-router-dom"

function App() {
    return (
        <>
            <Nav/>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/sign-in" element={<LoginForm/>}/>
                <Route exact path="/register" element={<RegistrationForm/>}/>
                <Route exact path="/dashboard" element={<Dashboard/>}/>
                <Route exact path="/expedition/:id" element={<Expedition/>}/>
            </Routes>
        </>
    )
}

export default App;