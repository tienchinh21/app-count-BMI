import React from 'react';
import { useForm } from 'react-hook-form';
import Exam2View from './Exam2View';

const data = [
    {
        id: 0,
        question: "1+1 = ?",
        answers: [
            { id: 0, label: "2", isCorrect: true },
            { id: 1, label: "3", isCorrect: false },
            { id: 2, label: "4", isCorrect: false },
            { id: 3, label: "5", isCorrect: false },
        ]
    },
    {
        id: 1,
        question: "2+5 = ?",
        answers: [
            { id: 0, label: "8", isCorrect: false },
            { id: 1, label: "3", isCorrect: false },
            { id: 2, label: "7", isCorrect: true },
            { id: 3, label: "5", isCorrect: false },
        ]
    }
]

const Examination2 = () => {

    // Xử lý all event + data

    const hookForm = useForm({
        defaultValues: { data }
    });




    return (
        <Exam2View hookForm={hookForm} data={data} />
    )
}

export default Examination2