import React from "react"; 
import { CImage, CButton } from '@coreui/react'
import { useNavigate } from "react-router-dom"; 
import Header from "../components/header"
import Footer from "../components/footer"
import Ridgeline from "./ridgeline";
import { Outlet } from "react-router-dom";


export default function Assignment3(){

    const navigate = useNavigate(); 
    const first_chart = () => { 
        navigate("/third-assignment/line-chart"); 
    } 

    const second_chart = () => { 
        navigate("/third-assignment/radar-chart"); 
    }

    const third_chart = () => { 
      navigate("/third-assignment/ridgeline-chart"); 
  }

    return (
        <>
        <Header></Header>
        <div className='row justify-content-center' style={{ 'margin': 30 }}>
        <div className='col-md-4 d-flex justify-content-center' id="assignment1">
          <CButton color="success" size="lg" style={{ 'width': '80%' }} shape="rounded-0" onClick={first_chart}>
            Line Chart
          </CButton>
        </div>

        <div className='col-md-4 d-flex justify-content-center' id="assignment2">
          <CButton color="danger" size="lg" style={{ 'width': '80%' }} shape="rounded-0" onClick={second_chart}>
            Radar Chart
          </CButton>
        </div>

        <div className='col-md-4 d-flex justify-content-center' id="assignment3">
          <CButton color="warning" size="lg" style={{ 'width': '80%' }} shape="rounded-0" onClick={third_chart}>
            Ridgeline Chart
          </CButton>
        </div>
        </div>
      <Outlet />

        </>
    )
}