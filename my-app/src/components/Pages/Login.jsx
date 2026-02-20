import Button from '@mui/material/Button';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import React from 'react'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required()
})

const Login = () => {

const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });


  

  const onLogin = async (data) => {
    const response = await axios.post('http://localhost:9000/api/login', data)
    if (response?.data?.code == 200) {
      Swal.fire({
        title: "Login",
        text: response?.data?.message,
        icon: "success"
      });
      localStorage.setItem('userInfo', JSON.stringify(response?.data?.data));
      if (response?.data?.data?.userType == "admin") {
        navigate('/admin-add')
      } else if (response?.data?.data?.userType == "user") {
        navigate('/')
      }
    } else {
      Swal.fire({
        title: "Login",
        text: response?.data?.message,
        icon: "error"
      });
    }
  }


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
                <form onSubmit={handleSubmit((d) => onLogin(d))}>
                  <center><span className='fs-1 fw-bold'>Login</span></center> <br /><br />
                  <input className='form-control mb-5 w-75 mx-auto' type="text" placeholder='Email' {...register('email')} />
                  {errors.email && <p className="text-danger">{errors.email.message}</p>}


                  <input className='form-control mb-5 w-75 mx-auto' type="text" placeholder='Password' {...register('password')} />
                  {errors.password && <p className="text-danger">{errors.password.message}</p>}


                  <center><Button type='submit' className='bg-danger rounded text-white p-2 fs-6 mb-3' style={{ height: '40px', width: '100px' }}>Login</Button></center>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;
