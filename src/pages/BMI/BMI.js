import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from "yup";

const schemaBMI = yup
    .object({
        weightF: yup.number().typeError("Vui lòng nhập số").required("Vui lòng nhập cân nặng").moreThan(0, "Vui lòng nhập số lớn hơn 0").max(200, "Nhập tối đa 200"),
        heightF: yup.number().typeError("Vui lòng nhập số").required("Vui lòng nhập chiều cao").moreThan(0, "Vui lòng nhập số lớn hơn 0").max(200, "Nhập tối đa 200"),
    })
    .required()

const BMI = () => {

    const hookForm = useForm({
        defaultValues: {
            weightF: null,
            heightF: null
        },
        resolver: yupResolver(schemaBMI),

    });

    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [result, setResult] = useState(null);

    const handleReset = () => {
        hookForm.setValue("heightF", 100)
        // hookForm.reset({
        //     heightF: 100,
        //     weightF: 150
        // })
    }

    const submitHandle = (e) => {
        // calculateBMI();

        hookForm.handleSubmit((value) => {
            calculateBMI(value.weightF, value.heightF / 100)
        }, (errors) => {



        })()

        e.preventDefault();
    };

    const calculateBMI = (weightInKg, heightInM) => {

        const bmi = weightInKg / (heightInM * heightInM);
        setResult(bmi.toFixed(2));

    };


    return (
        <>
            <Link to="/home"><button className='btn'>Back to Home</button></Link>
            <div className="wrapper">
                <form onSubmit={submitHandle} >
                    <h2>Calculate BMI</h2>
                    <div className='form-group'>
                        <label className='form-control-label'>Weight (kg): </label>
                        <input
                            {...hookForm.register("weightF")}
                            className='form-control'
                            type="number"
                        // value={weight}
                        // onChange={(e) => setWeight(e.target.value)}
                        />
                        {hookForm.formState.errors.weightF && <small className='text-danger text-small small'>
                            {hookForm.formState.errors.weightF.message}
                        </small>}

                    </div>
                    <div className='form-group'>
                        <label className='form-control-label'>Height (cm): </label>
                        {/* <input
                            {...hookForm.register("heightF")}
                            className='form-control'
                            type="number"

                        /> */}

                        <Controller
                            control={hookForm.control}
                            name="heightF"
                            render={({ field: { onChange, onBlur, value, ref } }) => (
                                <input
                                    className='form-control'
                                    type="number"
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    ref={ref}
                                />
                            )}
                        />


                        {hookForm.formState.errors.heightF && <small className='text-danger text-small small'>
                            {hookForm.formState.errors.heightF.message}
                        </small>}

                    </div>
                    <button className='btn-home' type='button' onClick={handleReset}>reset</button>
                    <button className='btn-home' type='submit'>Calculate</button>
                    {result !== null && <div>Your BMI is: {result}</div>}
                </form>
            </div>
        </>
    )
};

export default BMI;
