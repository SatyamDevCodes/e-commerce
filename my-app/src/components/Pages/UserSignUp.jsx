import Button from "@mui/material/Button";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { data } from "react-router-dom";

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  contact: yup.string().required(),
  password: yup.string().required().min(8).max(20)
});



const UserSignUp = () => {
  

  const { register, handleSubmit, formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });


  const onSubmit =async(values)=>{
    try{
      const res=await axios.post("http://localhost:9000/api/register",values);
      alert("success!");
    } catch(err){
      console.log(err);
    }
  };



  return (
    <>
      <div className="container login">
        <div className="row mt-5">
          <div className="col-sm-6 mx-auto rounded shadow">
            <div className="row">
              <div className="col-12 bg-danger p-3 rounded"><center><p className='text-white fs-1 fw-bold'>My Store</p></center></div>
            </div>
            <div className="row mt-3">
              <div className="col-12">
                <center><span className='fs-1 fw-bold'>Create Your Account</span></center> <br /><br />
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input className='form-control mb-3 w-75 mx-auto' type="text" placeholder='Enter your full Name' {...register('name')} />
                  {errors.name && <p className="text-danger">{errors.name.message}</p>}

                  <input className='form-control mb-3 w-75 mx-auto' type="text" placeholder=' Enter your email' {...register('email')} />
                  {errors.email && <p className="text-danger">{errors.email.message}</p>}

                  <input className='form-control mb-3 w-75 mx-auto' type="text" placeholder='Enter phone number' {...register('contact')} />
                  {errors.contact && <p className="text-danger">{errors.contact.message}</p>}

                  <input className='form-control mb-3 w-75 mx-auto' type="text" placeholder='Enter your Password' {...register('password')} />
                  {errors.password && <p className="text-danger">{errors.password.message}</p>}

                  <center><Button className='bg-danger rounded text-white p-2 fs-6 mb-3' type="submit" style={{ height: '40px', width: '100px' }}>Sign Up</Button></center>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserSignUp;
