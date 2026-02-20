import React from 'react'
import Button from '@mui/material/Button';
import { IoMenu } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { CiHome } from "react-icons/ci";
import { GiClothes } from "react-icons/gi";



const Category = () => {
  return (
    <>
      <nav>
        <div className="container-fluid" style={{ borderBottom: "1px solid rgba(0, 0,0 , 0.2)" }}>
          <div className="row">

            {/* Nav Part - 1 */}

            <div className="col-sm-2 navPart1">
              <div className="catWrapper">
                <Button className='allCatTab'>
                  <span className='me-2'><IoMenu /></span>
                  <span className='catText'>ALL CATEGORIES</span>
                  <span className='ms-2'><FaAngleDown /></span>
                </Button>
                <div className="sideBarNav shadow border border-1">
                  <ul>
                    <li><Link to="/">Men</Link></li>
                    <li><Link to="/">Women</Link></li>
                    <li><Link to="/">Kids</Link></li>
                    <li><Link to="/">Mobiles</Link></li>
                    <li><Link to="/">Laptop</Link></li>
                    <li><Link to="/">Watches</Link></li>
                    <li><Link to="/">Jeans</Link></li>
                    <li><Link to="/">Shirt</Link></li>
                    <li><Link to="/">T-Shirt</Link></li>
                    <li><Link to="/">Shoes</Link></li>
                    <li><Link to="/">Jacket</Link></li>
                    <li><Link to="/">Handcraft Items</Link></li>
                  </ul>
                </div>
              </div>
            </div>


            {/* Nav Part - 2  */}

            <div className="col-sm-10 navPart2 d-flex align-item-center  ">
              <ul className='list list-inline mx-auto'>
                <li className='list-inline-item'>
                  <Link to="/"><CiHome /> &nbsp;HOME</Link>
                </li>
                <li className='list-inline-item'>
                  <Link to="/"><GiClothes /> MEN</Link>
                  <div className="subMenu shadow">
                    <Link to="/">Jeans</Link>
                    <Link to="/">Shirt</Link>
                    <Link to="/">T-Shirt</Link>
                    <Link to="/">Shoes</Link>
                    <Link to="/">Jacket</Link>
                    <Link to="/">Watch</Link>
                  </div>
                </li>
                <li className='list-inline-item'>
                  <Link to="/">WOMEN</Link>
                </li>
                <li className='list-inline-item'>
                  <Link to="/">MOBILES</Link>
                </li>
                <li className='list-inline-item'>
                  <Link to="/">WATCHES</Link>
                </li>
                <li className='list-inline-item'>
                  <Link to="/">KIDS</Link>
                </li>
                <li className='list-inline-item'>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Category;
