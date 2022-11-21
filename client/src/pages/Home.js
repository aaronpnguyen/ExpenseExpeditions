import React from 'react'
import homeImg from '../components/assets/Home.png'
import {useNavigate} from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();
    return(
        <div className="bodyContainer">
            <div className="blob"></div>
            <div className="homeContainer">
                <div className="content">
                    <div className="content-left blob">
                        <div className="text">
                            <h1 className="content-title">Expense Expeditions</h1>
                            <h2 className="sub-title">An expense tracker with extra features such as:</h2>
                            <h3 className="sub-list">- Real-time expense specific tracking</h3>
                            <h3 className="sub-list">- 25 expense eategories</h3>
                            <h3 className="sub-list">- In-depth statistic visualization</h3>
                        </div>
                        <div className="bottom-left">
                            <button onClick={e => navigate('/register')} className="homeBtn">Try Today</button>
                        </div>
                    </div>
                    <div className="content-right">
                        <img src={homeImg}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;