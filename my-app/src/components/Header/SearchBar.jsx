import { IoIosSearch } from "react-icons/io";
import Button from '@mui/material/Button';
import { FaRegCircleUser } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";



const SearchBar = () =>{

const[isOpen, setIsOpen]=useState(false);
const dropdownRef=useRef(null);

useEffect(()=>{
  const handleClickOutside = (event)=>{
    if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
      setIsOpen(false);
    }
  };

  document.addEventListener("mousedown",handleClickOutside);
  return()=>{
    document.removeEventListener("mousedown",handleClickOutside);
  }
},[]);

    return(<>
    <div className="headerSearch ms-5 me-3">
        <input type='text' placeholder="Search for products..."/>
        <Button><IoIosSearch/></Button>
    </div>


{/* after search bar icons and cart and profile  */}

    <div className="part3 d-flex align-items-center mx-auto ms-4 position-relative" ref={dropdownRef} >
        <Link to={'/'}><Button onClick={()=>setIsOpen(!isOpen)} className="user"><FaRegCircleUser/></Button></Link>

        {/* dropdown menu  */}
        {isOpen && (
            <div className="dropdown-menu show p-2 shadow-sm" style={{position:'absolute', top:'100%', left:'0', zIndex:100, minWidth:'120px'}}>
                <Link to={'/login'} className="dropdown-item" onClick={()=>setIsOpen(false)}>Login</Link>
                <Link to={'/userSignUp'} className="dropdown-item" onClick={()=>setIsOpen(false)}>Sign Up</Link>
            </div>
        )}


        <div className="ml-auto circleTab d-flex align-items-center">
            <span className="price fs-5 fw-bold">$4.59</span>
        <div className="position-relative ml-2">
            <Link to={'/'}><Button className="cart"><FiShoppingCart/></Button></Link>
            <span className="count d-flex align-items-center">1</span>
            </div>
        </div>
    </div>

    </>)
}

export default SearchBar;