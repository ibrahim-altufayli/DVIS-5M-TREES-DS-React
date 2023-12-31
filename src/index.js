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
import Assignment3 from './pages/assignment3';
import Linechart from './pages/line-chart';
import RadarChart from './pages/radar-chart';
import Ridgeline from './pages/ridgeline';
import Assignment4 from './pages/assignment4';
import Map1 from './pages/map1';
import Map2 from './pages/map2';
import Map3 from './pages/map3';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   
    <HashRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<Home />} />
                <Route path="first-assignment" element={<TreeSpeciesAbundance />} />
                <Route path="second-assignment" element={<Assignment2 />} />
                <Route path="third-assignment" element={<Assignment3 />}>
                    <Route index path="line-chart" element={<Linechart />} />
                    <Route path="radar-chart" element={<RadarChart />} />
                    <Route path="ridgeline-chart" element={<Ridgeline />} />
                </Route>

                <Route path="forth-assignment" element={<Assignment4 />}>
                    <Route index path="first-map" element={<Map1 />} />
                    <Route path="second-map" element={<Map2 />} />
                    <Route path="third-map" element={<Map3 />} />
                </Route>
                
            </Route>
        </Routes>
    </HashRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
