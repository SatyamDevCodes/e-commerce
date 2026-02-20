import React from 'react'
import customer1 from '../../assets/customer1.jpg'

const Testimonial = () => {
  return (
    <>
      <div className="container-fluid p-5" style={{background:"rgba(0,0,0,0.04)"}}>
        <div className="row mt-4">
          <div className="col-sm-12">
            <center><span className='testimonialHeading'>What Our Customers Say</span></center>
          </div>
        </div>


        <div className="row testimonialCard mt-5 mx-auto mb-5">
          <div className="col-sm-3 mx-auto">
            <div className="card" style={{ width: "16rem" }}>
              <div className="card-body">
                <div className="customerImg">
                  <img src={customer1} alt="user" className='rounded-circle' height='50px' width='50px' />
                </div>
                <h5 className="card-title">Ananya Sharma</h5>
                <h6 className="card-subtitle mb-2 text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</h6>
                <p className="card-text">
                  "Absolutely love my new watch! The Quality and delivery very fast"
                </p>
              </div>
            </div>

          </div>


          <div className="col-sm-3 mx-auto">
            <div className="card" style={{ width: "16rem" }}>
              <div className="card-body">
                <div className="customerImg">
                  <img src={customer1} alt="user" className='rounded-circle' height='50px' width='50px' />
                </div>
                <h5 className="card-title">Ananya Sharma</h5>
                <h6 className="card-subtitle mb-2 text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</h6>
                <p className="card-text">
                  "Absolutely love my new watch! The Quality and delivery very fast"
                </p>
              </div>
            </div>
          </div>


          <div className="col-sm-3 mx-auto">
            <div className="card" style={{ width: "16rem" }}>
              <div className="card-body">
                <div className="customerImg">
                  <img src={customer1} alt="user" className='rounded-circle' height='50px' width='50px' />
                </div>
                <h5 className="card-title">Ananya Sharma</h5>
                <h6 className="card-subtitle mb-2 text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</h6>
                <p className="card-text">
                  "Absolutely love my new watch! The Quality and delivery very fast"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Testimonial;
