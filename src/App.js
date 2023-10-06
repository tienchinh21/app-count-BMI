import React from "react";

import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Examination from "./pages/Examination/Examination";
import BMI from "./pages/BMI/BMI";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/home/examination" element={<Examination />} />
                    <Route path="/home/bmi" element={<BMI />} />
                    <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
