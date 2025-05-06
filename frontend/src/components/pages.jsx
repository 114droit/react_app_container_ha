import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Edit from "../pages/edit";
import Quiz from "../pages/quiz";

function Pages() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Quiz />} />
                <Route path="/edit" element={<Edit />} />
            </Routes>
        </Router>
    );
}

export default Pages;