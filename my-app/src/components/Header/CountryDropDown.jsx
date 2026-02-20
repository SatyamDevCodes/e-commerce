import { IoIosSearch } from "react-icons/io";
import Button from '@mui/material/Button';
import { FaAngleDown } from "react-icons/fa6";
import Dialog from '@mui/material/Dialog';
import { IoClose } from "react-icons/io5";
import { useState } from "react";



function CountryDropDown() {

const [isOpenModel, setisOpenModel]=useState(false);


  return (
    <>
      <Button className="counrtyDropdown" onClick={()=>setisOpenModel(true)}>
                <div className="info d-flex flex-column">
                  <span className='label'>Your Location</span>
                  <span className='name'>India</span>
                </div>
                <span className='ml-auto'><FaAngleDown/></span>
              </Button>

              <Dialog  open={isOpenModel} onClose={()=>setisOpenModel(false)} className='locationModel'>
      <h4>Choose your Delivery Location</h4>
      <p className='mt-0'>Enter your address and we will specify the offer for your area</p>
      <Button className="close_" onClick={()=>setisOpenModel(false)}><IoClose/></Button>

      <div className="headerSearch w-100">
              <input type='text' placeholder="Search your area..."/>
              <Button><IoIosSearch/></Button>
          </div>

          <ul className="countryList mt-3">
            <li><Button onClick={()=>setisOpenModel(false)}>Delhi</Button></li>
            <li><Button onClick={()=>setisOpenModel(false)}>Noida</Button></li>
            <li><Button onClick={()=>setisOpenModel(false)}>Gurugram</Button></li>
            <li><Button onClick={()=>setisOpenModel(false)}>Panjab</Button></li>
            <li><Button onClick={()=>setisOpenModel(false)}>Mumbai</Button></li>
            <li><Button onClick={()=>setisOpenModel(false)}>Prayagraj</Button></li>
            <li><Button onClick={()=>setisOpenModel(false)}>Lucknow</Button></li>
            <li><Button onClick={()=>setisOpenModel(false)}>Faizabad</Button></li>
            <li><Button onClick={()=>setisOpenModel(false)}>Azamgarh</Button></li>
            <li><Button onClick={()=>setisOpenModel(false)}>Ambedakar nagar</Button></li>
            <li><Button onClick={()=>setisOpenModel(false)}>Basti</Button></li>
            <li><Button onClick={()=>setisOpenModel(false)}>Atraulia</Button></li>
            <li><Button onClick={()=>setisOpenModel(false)}>Mau</Button></li>
          </ul>
      
    </Dialog>
    </>
  )
}

export default CountryDropDown
