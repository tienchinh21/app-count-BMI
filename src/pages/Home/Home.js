import React from 'react';
import { Link } from 'react-router-dom';

const menuData = [
    { id: 0, name: "BMI", path: "/home/bmi" },
    { id: 1, name: "Examination", path: "/home/examination" },
    { id: 2, name: "Examination 2", path: "/home/examination2" }
]

const Home = () => {
    return (
        <>
            <h1>WelCome</h1>
            <div className='d-flex justify-content-center gap'>
                {menuData.map(item => (
                    <Link to={item.path} key={item.id}>
                        <button className='btn btn-primary'>{item.name}</button>
                    </Link>

                ))}
                {/* <Link to="/home/bmi"><button className='btn btn-primary'>BMI</button></Link> */}
                {/* <Link to="/home/examination"><button className='btn btn-primary'>Examination</button></Link> */}
            </div>
        </>

    )
};

export default Home;
