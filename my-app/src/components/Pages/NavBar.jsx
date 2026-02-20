import mylogo from '../../assets/mylogo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaUser, FaSearch, FaHome, FaUserCircle } from "react-icons/fa";
import Button from '@mui/material/Button';
import { useState, useEffect, useRef } from "react";



const NavBar = () => {

// DropDown in user or account for login and register button
const [isDropdownOpen, setIsDropdownOpen]=useState(false);
const dropdownRef=useRef(null);

const toggleDropdown=()=>{
  setIsDropdownOpen(!isDropdownOpen);
};

useEffect(()=>{
  const handleClickOutside=(event)=>{
    if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
      setIsDropdownOpen(false);
    }
  };
  document.addEventListener("mousedown",handleClickOutside);
  return()=>{
    document.removeEventListener("mousedown",handleClickOutside);
  };
},[])



//navbar according userType (user || admin || default)
const location = useLocation();
 const navigate = useNavigate();
  const [userData, setUserData] = useState(null)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    setUserData(user)
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login')
  }


  if (userData?.userType === "admin") {
    return (<>
      <nav className="navbar">
          {/* Logo */}
          <div className="navbar-logo">
            <span>Your</span>Shop
          </div>

          <div className="navbar-actions">
            <div className="nav-item">
              <Link to={'/'}><span>Home</span></Link>
            </div>

            <div className="nav-item">
              <Link to={'/admin-add'}><span>Add Product</span></Link>
            </div>

            <div className="nav-item">
              <Link to={'/admin-list'}><span>Product List</span></Link>
            </div>

            <div className="nav-item">
              <Link to={'/admin-user'}><span>User List</span></Link>
            </div>

          </div>

          {/* Right Icons */}
          <div className="navbar-actions">
            <div className="nav-item">
              <FaShoppingCart />
            </div>

            <div className="nav-item user-dropdown-container" ref={dropdownRef} style={{position:'relative'}}>
              <div onClick={toggleDropdown} style={{cursor:'pointer'}}>
              <FaUser />
              <span></span>
              </div>
              {isDropdownOpen && (
                <div className="dropdown-menu" style={{
                  position:'absolute',
                  top:'100%',
                  right:'0',
                  backgroundColor:'white',
                  boxShadow:'0px 8px 16px rgba(0,0,0,0.1)',
                  padding:'10px',
                  zIndex:'100',
                  display:'flex',
                  flexDirection:'column'
                }}>
                  <Link to={'/login'} className="dropdown-item" onClick={()=>setIsDropdownOpen(false)} >Profile</Link>
              <Button onClick={handleLogout}>LogOut</Button>
                </div>
              )}
            </div>
          </div>
        </nav>
    </>)
  } else if (userData?.userType === "user") {
    return (<>
      <nav className="navbar">
          {/* Logo */}
          <div className="navbar-logo">
            <span>Your</span>Shop
          </div>

          {/* Search */}
          <div className="navbar-search">
            <input type="text" placeholder="Search for products..." />
            <button>
              <FaSearch />
            </button>
          </div>

          {/* Right Icons */}
          <div className="navbar-actions">
            <div className="nav-item">
              <Link to={'/'}><span><FaHome /></span></Link>
              {/* <span>Home</span> */}
            </div>

            <div className="nav-item">
              <Link to={'/user-cart'}>
              <span><FaShoppingCart /></span>
              </Link>
            </div>

            <div className="nav-item user-dropdown-container" ref={dropdownRef} style={{position:'relative'}}>
              <div onClick={toggleDropdown} style={{cursor:'pointer'}}>
              <span className='fw-bold fs-6 text-capitalize'>{userData.name ||'User'} </span><span> <FaUserCircle /></span>
              </div>
              {isDropdownOpen && (
                <div className="dropdown-menu" style={{
                  position:'absolute',
                  top:'100%',
                  right:'0',
                  backgroundColor:'white',
                  boxShadow:'0px 8px 16px rgba(0,0,0,0.1)',
                  padding:'10px',
                  zIndex:'100',
                  display:'flex',
                  flexDirection:'column'
                }}>
                  <Link to={'/user-profile'} className="dropdown-item" onClick={()=>setIsDropdownOpen(false)} >Profile</Link>
              <Link to={'/my-orders'} className="dropdown-item" onClick={()=>setIsDropdownOpen(false)} >My Order</Link>
              <Button onClick={handleLogout}>LogOut</Button>
                </div>
              )}
            </div>
          </div>
        </nav>
    </>)
  } else {
    return (
      <>
        <nav className="navbar">
          {/* Logo */}
          <div className="navbar-logo">
            <span>Your</span>Shop
          </div>

          {/* Search */}
          <div className="navbar-search">
            <input type="text" placeholder="Search for products..." />
            <button>
              <FaSearch />
            </button>
          </div>

          {/* Right Icons */}
          <div className="navbar-actions">
            <div className="nav-item">
              <FaHeart />
              <span>Wishlist</span>
            </div>

            <div className="nav-item">
              <FaShoppingCart />
              <span>Cart</span>
            </div>

            <div className="nav-item user-dropdown-container" ref={dropdownRef} style={{position:'relative'}}>
              <div onClick={toggleDropdown} style={{cursor:'pointer'}}>
              <FaUser />
              <span>Account</span>
              </div>
              {isDropdownOpen && (
                <div className="dropdown-menu" style={{
                  position:'absolute',
                  top:'100%',
                  right:'0',
                  backgroundColor:'white',
                  boxShadow:'0px 8px 16px rgba(0,0,0,0.1)',
                  padding:'10px',
                  zIndex:'100',
                  display:'flex',
                  flexDirection:'column'
                }}>
                  <Link to={'/login'} className="dropdown-item" onClick={()=>setIsDropdownOpen(false)} >Login</Link>
              <Link to={'/register'} className="dropdown-item" onClick={()=>setIsDropdownOpen(false)} >Sign Up</Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      </>
    )
  }

}

export default NavBar
