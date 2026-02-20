import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>

      <footer className="bg-white pt-5 pb-4">
        <div className="container">
          <div className="row gy-4">

            <div className="col-12 col-lg-3">
              <div className="brand-logo">/MY STORE</div>
            </div>

            <div className="col-6 col-md-3 col-lg-2">
              <h6 className="footer-title">Company</h6>
              <ul className="list-unstyled">
                <li className="mb-3"><Link to={'/'} className="footer-link">About</Link></li>
                <li className="mb-3"><Link to={'/'} className="footer-link">Features</Link></li>
                <li className="mb-3"><Link to={'/'} className="footer-link">Works</Link></li>
                <li className="mb-3"><Link to={'/'} className="footer-link">Career</Link></li>
              </ul>
            </div>

            <div className="col-6 col-md-3 col-lg-2">
              <h6 className="footer-title">Help</h6>
              <ul className="list-unstyled">
                <li className="mb-3"><Link to={'/'} className="footer-link">Customer Support</Link></li>
                <li className="mb-3"><Link to={'/'} className="footer-link">Delivery Details</Link></li>
                <li className="mb-3"><Link to={'/'} className="footer-link">Terms & Conditions</Link></li>
                <li className="mb-3"><Link to={'/'} className="footer-link">Privacy Policy</Link></li>
              </ul>
            </div>

            <div className="col-6 col-md-3 col-lg-2">
              <h6 className="footer-title">Resources</h6>
              <ul className="list-unstyled">
                <li className="mb-3"><Link to={'/'} className="footer-link">Free eBooks</Link></li>
                <li className="mb-3"><Link to={'/'} className="footer-link">Development Tutorial</Link></li>
                <li className="mb-3"><Link to={'/'} className="footer-link">How to - Blog</Link></li>
                <li className="mb-3"><Link to={'/'} className="footer-link">Youtube Playlist</Link></li>
              </ul>
            </div>

            <div className="col-12 col-md-3 col-lg-3">
              <h6 className="footer-title">Subscribe to newsletter</h6>
              <div className="mb-4">
                <input type="email" className="form-control newsletter-input" placeholder="Enter email address" />
              </div>

              <h6 className="footer-title mb-2">Call Us</h6>
              <p className="phone-number">7309335028</p>
            </div>

          </div>

          <div className="row mt-5 pt-4 border-top">
            <div className="col-12">
              <p className="text-muted small">© Copyright 2021. All Rights Reserved. Designed By <Link to={'/'} className='footer-link fw-bold'>Satyam</Link></p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer;
