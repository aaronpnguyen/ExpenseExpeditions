import './App.css';
import SignIn from './components/SignIn'
import Dashboard from './components/Dashboard'
import {Routes, Route, Link} from "react-router-dom"

function App() {
  return (
    <Routes>
        <Route exact path="/" element={<SignIn/>}/>
        <Route exact path="/dashboard" element={<Dashboard/>}/>
    </Routes>
  )
}

export default App;