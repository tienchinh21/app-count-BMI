import React, { useState, useEffect } from 'react';
import './Examination.css';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Examination = () => {
    const [answers, setAnswers] = useState({
        ex1: '',
        ex2: '',
        ex3: '',
        ex4: '',
        ex5: '',
    });

    const [answeredQuestions, setAnsweredQuestions] = useState([]);

    const [correctAnswers, setCorrectAnswers] = useState({});

    const [wrong, setWrong] = useState({});

    const [showRetryButton, setShowRetryButton] = useState(false);

    const [countDown, setCountDown] = useState(30);

    const [isTimeUp, setIsTimeUp] = useState(false);

    const [showResults, setShowResults] = useState(false);

    let timer;

    useEffect(() => {
        if (countDown === 0) {
            setIsTimeUp(true);
            if (answeredQuestions.length <= 5) {
                setShowResults(true);
                handleSubmit();
            }
        } else if (countDown > 0 && answeredQuestions.length <= 5) {
            timer = setTimeout(() => {
                setCountDown(prev => prev - 1);
            }, 1000);
        }
        return () => clearTimeout(timer);
    }, [countDown, answeredQuestions, isTimeUp]);


    const resetState = () => {
        setAnswers({
            ex1: '',
            ex2: '',
            ex3: '',
            ex4: '',
            ex5: '',
        });

        setAnsweredQuestions([]);
        setCorrectAnswers({});
        setWrong({});
        setShowRetryButton(false);
        setCountDown(30);
    };

    const handleAnswerChange = (question, answer) => {
        setAnswers({
            ...answers,
            [question]: answer,
        });

        const newAnsweredQuestions = answeredQuestions.includes(question) ? answeredQuestions : [...answeredQuestions, question];

        setAnsweredQuestions(newAnsweredQuestions);

        const newCorrectAnswers = { ...correctAnswers };

        delete newCorrectAnswers[question];

        setCorrectAnswers(newCorrectAnswers);
    };

    const handleSubmit = () => {

        if (answeredQuestions.length === 5 || isTimeUp) {
            const correctAnswers = {
                ex1: 'a',
                ex2: 'c',
                ex3: 'a',
                ex4: 'c',
                ex5: 'c',
            };

            let score = 0;
            const wrong = {};

            for (const question in answers) {
                if (answers[question] === correctAnswers[question]) {
                    score += 20;
                } else {
                    wrong[question] = true;
                    setCorrectAnswers(prev => ({
                        ...prev,
                        [question]: correctAnswers[question],
                    }));
                }
            }

            setShowResults(true);
            setShowRetryButton(true);

            if (score === 100) {
                setWrong(wrong);
                setShowRetryButton(true);

                Swal.fire({
                    title: `Perfect Score! Điểm của bạn là ${score} / 100`,
                    icon: 'success',
                    confirmButtonText: 'Làm lại',
                }).then(() => {
                    handleRetry();
                });
            } else {
                Swal.fire({
                    title: `Điểm của bạn là ${score} / 100`,
                    showCancelButton: true,
                    confirmButtonText: 'Xem lỗi sai',
                    cancelButtonText: 'Làm lại',
                    reverseButtons: true,
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Xem lỗi
                        console.log('Xem lỗi');
                        setWrong(wrong);
                        setShowRetryButton(true);
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        // Làm lại
                        console.log('lam bai lai');
                        handleRetry();
                    }
                });
            }
        }
    };

    const submitButton = {
        backgroundColor: showResults ? '#FF0000' : answeredQuestions.length === 5 ? '#00A86B' : 'rgb(68 87 66)',
        cursor: showResults || isTimeUp ? 'default' : 'pointer',
    };

    const clearRadioButtons = () => {
        const radioButtons = document.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(button => (button.checked = false));
    };

    const handleRetry = () => {
        setIsTimeUp(false);
        setShowResults(false);
        resetState();
        clearRadioButtons();
    };


    return (
        <>
            <Link to="/home"><button className='btn'>Back to Home</button></Link>
            <div className='wrapper'>
                <h2>Examination</h2>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <div className='ex ex1'>
                                    <label htmlFor="">
                                        <b>1. Result 10 + 5 ? (20)</b>
                                    </label>

                                    <div className={`question ${wrong['ex1'] ? 'wrong' : ''}`}>
                                        <input type="radio" name="ex1" id="ex1a" onChange={() => handleAnswerChange('ex1', 'a')} />
                                        <label htmlFor="ex1a">15</label>

                                        <input type="radio" name="ex1" id="ex1b" onChange={() => handleAnswerChange('ex1', 'b')} />
                                        <label htmlFor="ex1b">400</label>

                                        <input type="radio" name="ex1" id="ex1c" onChange={() => handleAnswerChange('ex1', 'c')} />
                                        <label htmlFor="ex1c">10</label>
                                    </div>
                                </div>

                                <div className={`ex ex2`}>
                                    <label htmlFor="">
                                        <b>2. Result 120/ 5 ? (20)</b>
                                    </label>
                                    <div className={`question ${wrong['ex2'] ? 'wrong' : ''}`}>
                                        <input type="radio" name='ex2' id='ex2a' onChange={() => handleAnswerChange('ex2', 'a')} />
                                        <label htmlFor="ex2a">42</label>

                                        <input type="radio" name='ex2' id='ex2b' onChange={() => handleAnswerChange('ex2', 'b')} />
                                        <label htmlFor="ex2b">14</label>

                                        <input type="radio" name='ex2' id='ex2c' onChange={() => handleAnswerChange('ex2', 'c')} />
                                        <label htmlFor="ex2c">24</label>
                                    </div>
                                </div>

                                <div className={`ex ex3`}>
                                    <label htmlFor="">
                                        <b>3. Result 160 * 15 ? (20)</b>
                                    </label>
                                    <div className={`question ${wrong['ex3'] ? 'wrong' : ''}`}>
                                        <input type="radio" name='ex3' id='ex3a' onChange={() => handleAnswerChange('ex3', 'a')} />
                                        <label htmlFor="ex3a">2400</label>

                                        <input type="radio" name='ex3' id='ex3b' onChange={() => handleAnswerChange('ex3', 'b')} />
                                        <label htmlFor="ex3b">1400</label>

                                        <input type="radio" name='ex3' id='ex3c' onChange={() => handleAnswerChange('ex3', 'c')} />
                                        <label htmlFor="ex3c">2004</label>
                                    </div>
                                </div>

                                <div className={`ex ex4`}>
                                    <label htmlFor="">
                                        <b>4. Result 1 + 1 ? (20)</b>
                                    </label>

                                    <div className={`question ${wrong['ex4'] ? 'wrong' : ''}`}>
                                        <input type="radio" name='ex4' id='ex4a' onChange={() => handleAnswerChange('ex4', 'a')} />
                                        <label htmlFor="ex4a">2040</label>

                                        <input type="radio" name='ex4' id='ex4b' onChange={() => handleAnswerChange('ex4', 'b')} />
                                        <label htmlFor="ex4b">1400</label>

                                        <input type="radio" name='ex4' id='ex4c' onChange={() => handleAnswerChange('ex4', 'c')} />
                                        <label htmlFor="ex4c">2</label>
                                    </div>
                                </div>

                                <div className={`ex ex5`}>
                                    <label htmlFor="">
                                        <b>5. Result 1 + 3 ? (20)</b>
                                    </label>

                                    <div className={`question ${wrong['ex5'] ? 'wrong' : ''}`}>
                                        <input type="radio" name='ex5' id='ex5a' onChange={() => handleAnswerChange('ex5', 'a')} />
                                        <label htmlFor="ex5a">2050</label>

                                        <input type="radio" name='ex5' id='ex5b' onChange={() => handleAnswerChange('ex5', 'b')} />
                                        <label htmlFor="ex5b">1500</label>

                                        <input type="radio" name='ex5' id='ex5c' onChange={() => handleAnswerChange('ex5', 'c')} />
                                        <label htmlFor="ex5c">4</label>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button
                                    style={submitButton}
                                    onClick={showRetryButton ? handleRetry : handleSubmit}
                                >
                                    {showRetryButton ? 'Làm lại bài thi' : 'Submit'}
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="timer">
                    Thời gian còn lại: {Math.floor(countDown / 60)}:{('0' + (countDown % 60)).slice(-2)}
                </div>
            </div>
        </>
    );
};

export default Examination;

