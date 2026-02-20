import Button from '@mui/material/Button';
import React from 'react'
import sliderBagimg from '../../assets/sliderBagimg.png'

const Hero = () => {
  return (
    <>
      <section className="hero-container d-flex align-items-center">
      <div className="container">
        <div className="row align-items-center">
          
          {/* Left Side: Content */}
          <div className="col-md-7 text-start py-5">
            <h1 className="hero-title fw-bold">
              Grab Upto 50% Off On <br /> This HOLI
            </h1>
            <button className="btn btn-dark btn-buy px-5 py-2 ms-2 mt-4">
              Buy Now
            </button>
          </div>

          {/* Right Side: Image */}
          <div className="col-md-5 text-center position-relative">
            <img 
              src={sliderBagimg}
              alt="Headphone Model" 
              className="img-fluid hero-img"
            />
          </div>

        </div>
      </div>
    </section>
    </>
  )
}

export default Hero;
