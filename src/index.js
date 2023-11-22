import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route,HashRouter } from "react-router-dom";
import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';
import App from './App';
import Home from './pages/home'
import TreeSpeciesAbundance from './pages/tree_species_abundance';
import Assignment2 from './pages/assignment2'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   
    <BrowserRouter>
        <Routes>
            <Route path="/DVIS-5M-TREES-DS-React" element={<App />}>
                <Route index element={<Home />} />
                <Route path="first-assignment" element={<TreeSpeciesAbundance />} />
                <Route path="second-assignment" element={<Assignment2 />} />
            </Route>
        </Routes>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
