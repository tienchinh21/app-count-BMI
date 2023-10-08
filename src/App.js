import React from "react";

import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import BMI from "./pages/BMI/BMI";
import Examination from "./pages/Examination/Examination";
import Examination2 from "./pages/Examination2";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/home/examination" element={<Examination />} />
                    <Route path="/home/examination2" element={<Examination2 />} />
                    <Route path="/home/bmi" element={<BMI />} />
                    <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
