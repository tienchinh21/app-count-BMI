import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BMI = () => {

    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [result, setResult] = useState(null);


    const submitHandle = (e) => {
        e.preventDefault();
    };

    const calculateBMI = () => {
        const weightInKg = +weight;
        const heightInM = +height / 100;

        if (!isNaN(weightInKg) && !isNaN(heightInM) && heightInM !== 0) {
            const bmi = weightInKg / (heightInM * heightInM);
            setResult(bmi.toFixed(2));
        } else {
            toast.error('Vui lòng kiểm tra lại cân nặng và chiều cao!');
            setResult(null);
        }
    };

    return (
        <>
            <Link to="/home"><button className='btn'>Back to Home</button></Link>
            <div className="wrapper">
                <form onSubmit={submitHandle} action="">
                    <h2>Calculate BMI</h2>
                    <div>
                        <label>Weight (kg): </label>
                        <input
                            className='mgb_10px pd_10px'
                            type="text"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Height (cm): </label>
                        <input
                            className='mgb_10px pd_10px'
                            type="text"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                        />
                    </div>
                    <button className='btn-home' onClick={calculateBMI}>Calculate</button>
                    {result !== null && <div>Your BMI is: {result}</div>}
                </form>
            </div>
        </>
    )
};

export default BMI;
