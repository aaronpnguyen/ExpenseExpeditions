import './components/css/navbar.css';
import './components/css/root.css';
import SignIn from './components/SignIn'
import Dashboard from './components/Dashboard'
import Expedition from './components/Expedition'
import Nav from './components/Nav'
import {Routes, Route, Link} from "react-router-dom"

function App() {
    return (
        <>
            <Nav/>
            <Routes>
                <Route exact path="/" element={<SignIn/>}/>
                <Route exact path="/dashboard" element={<Dashboard/>}/>
                <Route exact path="/expedition/:id" element={<Expedition/>}/>
            </Routes>
        </>
    )
}

export default App;