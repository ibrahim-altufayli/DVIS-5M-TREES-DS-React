import slide1 from "../core/images/slide1.jpeg"
import slide2 from "../core/images/slide2.jpeg"
import slide3 from "../core/images/slide3.jpeg"
import { CImage, CButton } from '@coreui/react'
import { CCarousel, CCarouselItem, CCarouselCaption, CFooter, CLink } from '@coreui/react'
import { useNavigate } from "react-router-dom"; 

function Home() {
    const navigate = useNavigate(); 
    const first_assigment = () => { 
        navigate("/first-assignment"); 
    } 

    const second_assigment = () => { 
        navigate("/second-assignment"); 
    }

    const third_assigment = () => { 
      navigate("/third-assignment"); 
  }
    

  return (
    <>
      <CCarousel controls indicators >
        <CCarouselItem>
          <CImage className="d-block w-100" style={{ "height": "70vh" }} src={slide1} alt="slide 1" />
          <CCarouselCaption className="d-none d-md-block">
            <h5>First Assigment</h5>
            <p>Some representative placeholder content for the first slide.</p>
          </CCarouselCaption>
        </CCarouselItem>
        <CCarouselItem>
          <CImage className="d-block w-100" style={{ "height": "70vh" }} src={slide2} alt="slide 2" />
          <CCarouselCaption className="d-none d-md-block">
            <h5>Second Assigment</h5>
            <p>Some representative placeholder content for the first slide.</p>
          </CCarouselCaption>
        </CCarouselItem>
        <CCarouselItem>
          <CImage className="d-block w-100" style={{ "height": "70vh" }} src={slide3} alt="slide 3" />
          <CCarouselCaption className="d-none d-md-block">
            <h5>Third Assigment</h5>
            <p>Some representative placeholder content for the first slide.</p>
          </CCarouselCaption>
        </CCarouselItem>
      </CCarousel>
      <div className='row justify-content-center' style={{ 'margin': 30 }}>
        <div className='col-md-4 d-flex justify-content-center' id="assignment1">
          <CButton color="success" size="lg" style={{ 'width': '80%' }} shape="rounded-0" onClick={first_assigment}>
            First Assignment
          </CButton>
        </div>

        <div className='col-md-4 d-flex justify-content-center' id="assignment2">
          <CButton color="danger" size="lg" style={{ 'width': '80%' }} shape="rounded-0" onClick={second_assigment}>
            Second Assignment
          </CButton>
        </div>

        <div className='col-md-4 d-flex justify-content-center' id="assignment3">
          <CButton color="warning" size="lg" style={{ 'width': '80%' }} shape="rounded-0" onClick={third_assigment}>
            Third Assignment
          </CButton>
        </div>

      </div>

    </>
  );
}

export default Home;
