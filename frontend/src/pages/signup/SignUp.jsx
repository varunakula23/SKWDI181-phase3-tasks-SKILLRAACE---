import React, { useState } from 'react'
import GenderCheckbox from './GenderCheckbox.jsx'
import {Link} from 'react-router-dom'
import useSignup from '../../hooks/useSignup.js'

const SignUp = () => {


  const [inputs,setInputs] = useState({
    fullName:'',
    userName:'',
    password:'',
    confirmPassword:'',
    gender:'',
  })

  const {loading,signup} = useSignup()

  const handleCheckboxChange = (gender)=>{
    setInputs({...inputs,gender})
  }

  const handleSubmit = async(e) =>{
    e.preventDefault()
    await signup(inputs)
  }


  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-10 rounded-2xl shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      <h1 className='text-3xl font-semibold text-center text-gray-300'>
                Sign Up
                <span className='text-blue-500'> ChatWave</span>
            </h1>
            <form onSubmit={handleSubmit}> 
              <div>
                <label className='label p-2'>
                  <span className='text-base label-text text-white'>Full Name</span>
                </label>
                <input type='text' placeholder='Enter your full name' className='w-full input input-bordered h-10'
                  value={inputs.fullName}
                  onChange={(e)=>setInputs({...inputs,fullName:e.target.value})}/>
              </div>

              <div>
                <label className='label p-2'>
                  <span className='text-base label-text text-white'>Username</span>
                </label>
                <input type='text' placeholder='Enter your username' className='w-full input input-bordered h-10'
                  value={inputs.userName}
                  onChange={(e)=>setInputs({...inputs,userName:e.target.value})}/>
              </div>

              <div>
                <label className='label p-2'>
                  <span className='text-base label-text text-white'>Password</span>
                </label>
                <input type='password' placeholder='Enter password' className='w-full input input-bordered h-10'
                  value={inputs.password}
                  onChange={(e)=>setInputs({...inputs,password:e.target.value})}/>
              </div>

              <div>
                <label className='label p-2'>
                  <span className='text-base label-text text-white'>Confirm Password</span>
                </label>
                <input type='password' placeholder='Enter password to confirm' className='w-full input input-bordered h-10'
                  value={inputs.confirmPassword}
                  onChange={(e)=>setInputs({...inputs,confirmPassword:e.target.value})}/>
              </div>

              <GenderCheckbox onCheckboxChange ={handleCheckboxChange} selectedGender={inputs.gender}/>

              <Link to='/login' className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white'>
                    Already have an account?
                </Link>

                <div>
                    <button className='btn btn-block text-white btn-sm mt-2 hover:bg-blue-600 hover:text-white bg-blue-500'
                      disabled={loading}>
                      {loading ? <span className='loading loading-spinner text-white'></span>:"Sign Up"}
                      </button>
                </div>

            </form>
      </div>
    </div>
  )
}

export default SignUp





{/* signup starter code 

import React from 'react'
import GenderCheckbox from './GenderCheckbox'

const SignUp = () => {
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-10 rounded-2xl shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      <h1 className='text-3xl font-semibold text-center text-gray-300'>
                Sign Up
                <span className='text-blue-500'> ChatWave</span>
            </h1>
            <form>
              <div>
                <label className='label p-2'>
                  <span className='text-base label-text text-white'>Full Name</span>
                </label>
                <input type='text' placeholder='Enter your full name' className='w-full input input-bordered h-10'/>
              </div>

              <div>
                <label className='label p-2'>
                  <span className='text-base label-text text-white'>Username</span>
                </label>
                <input type='text' placeholder='Enter your username' className='w-full input input-bordered h-10'/>
              </div>

              <div>
                <label className='label p-2'>
                  <span className='text-base label-text text-white'>Password</span>
                </label>
                <input type='password' placeholder='Enter password' className='w-full input input-bordered h-10'/>
              </div>

              <div>
                <label className='label p-2'>
                  <span className='text-base label-text text-white'>Confirm Password</span>
                </label>
                <input type='password' placeholder='Enter password to confirm' className='w-full input input-bordered h-10'/>
              </div>

              <GenderCheckbox />

              <a href='#' className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white'>
                    {"Already"} have an account?
                </a>

                <div>
                    <button className='btn btn-block text-white btn-sm mt-2 hover:bg-blue-600 hover:text-white bg-blue-500'>Login</button>
                </div>

            </form>
      </div>
    </div>
  )
}

export default SignUp*/}