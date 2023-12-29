import React from "react"; 
import { CImage, CButton } from '@coreui/react'
import { useNavigate } from "react-router-dom"; 
import Header from "../components/header"
import Footer from "../components/footer"
import Ridgeline from "./ridgeline";
import { Outlet } from "react-router-dom";


export default function Assignment4(){

    const navigate = useNavigate(); 
    const first_chart = () => { 
        navigate("/forth-assignment/first-map"); 
    } 

    const second_chart = () => { 
        navigate("/forth-assignment/second-map"); 
    }

    const third_chart = () => { 
      navigate("/forth-assignment/third-map"); 
  }

    return (
        <>
        <Header></Header>
        <div className='row justify-content-center' style={{ 'margin': 30 }}>
        <div className='col-md-4 d-flex justify-content-center' id="assignment1">
          <CButton color="success" size="lg" style={{ 'width': '80%' }} shape="rounded-0" onClick={first_chart}>
            First Map
          </CButton>
        </div>

        <div className='col-md-4 d-flex justify-content-center' id="assignment2">
          <CButton color="danger" size="lg" style={{ 'width': '80%' }} shape="rounded-0" onClick={second_chart}>
            Second Map
          </CButton>
        </div>

        <div className='col-md-4 d-flex justify-content-center' id="assignment3">
          <CButton color="warning" size="lg" style={{ 'width': '80%' }} shape="rounded-0" onClick={third_chart}>
            Third Map
          </CButton>
        </div>
        </div>
      <Outlet />

        </>
    )
}