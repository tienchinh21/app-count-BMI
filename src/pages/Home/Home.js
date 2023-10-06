import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {

    return (
        <>
            <h1>WelCome</h1>
            <div className='btn-wrapper'>
                <Link to="/home/bmi"><button className='btn-home'>BMI</button></Link>
                <Link to="/home/examination"><button className='btn-home'>Examination</button></Link>
            </div>
        </>

    )
};

export default Home;
