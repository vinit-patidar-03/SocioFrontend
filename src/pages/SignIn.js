import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Context from '../context/Context';
import axios from 'axios';

const SignIn = () => {

    const Navigate = useNavigate();
    const [details, setDetails] = useState({ email: '', password: '' });
    const [status,setStatus] = useState(false)
    const {showAlert} = useContext(Context);

    const SubmitDetails = async (event) => {
        event.preventDefault();
        setStatus(true);
        const response = await axios.post('http://localhost:5000/sociogram/auth/login',JSON.stringify({ email: details.email, password: details.password }), {
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.data.success) {
            localStorage.setItem('token1', response.data.authToken);
            Navigate('/');
            showAlert("success","login successfully");
        }
        else{
           showAlert("danger","some error occured while logging in")
        }
    }

    const fillDetails = (event) => {
        setDetails({ ...details, [event.target.name]: event.target.value });
    }
    return (
        <>
            <div className='w-full h-[100vh] flex justify-center items-center'>
            {status ? <img src='/images/login.gif' className=" w-32"  alt='login'/>: 
            <div className=' w-72 bg-[#ff532b] text-white rounded-xl p-3 flex flex-col items-center'>
                    <div className='p-3' style={{ fontFamily: "Mukta", fontSize: "1.5rem", fontWeight: "bold" }}>
                        <img src="/images/Sociogram.png" className='w-24 m-auto' alt="logo" />
                    </div>
                    <div className='p-3'>
                        <form action="login" className='flex flex-col items-center'>
                            <div className='userInput relative'>
                                <input type="email" className='my-2 py-1 px-2 text-sm text-black outline-none z-10' id='email' name='email' autoComplete='email' required onChange={fillDetails} />
                                <label htmlFor="email" className='absolute left-2 top-2 py-2 text-xs text-slate-400 cursor-text'>Email</label>
                            </div>
                            <div className='passInput relative'>
                                <input type="password" className='my-2 py-1 px-2 text-black text-sm outline-none z-10' id='password' name='password' autoComplete='new-password' required onChange={fillDetails}/>
                                <label htmlFor="password" className='absolute left-2 top-2 py-2 text-xs text-slate-400 cursor-text'>Password</label>
                            </div>
                            <button className='px-5 py-1 w-full bg-red-600 hover:bg-red-500 text-white font-bold mt-5 rounded-xl transition-all' onClick={SubmitDetails}>Login</button>
                        </form>
                    </div>
                    <div className='flex items-center px-3'>
                        <p className='text-xs'>don't you have an account?</p>
                        <Link to='/signup' className='text-xs p-1 text-blue-700'>signup</Link>
                    </div>
                </div>}
               
            </div>
        </>
    )
}

export default SignIn