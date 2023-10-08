import React, { useContext, useState } from 'react'
import Context from '../context/Context';
import { Link, useNavigate } from 'react-router-dom'

const SignUp = () => {

    const Navigate = useNavigate();
    const [credentials, setCredentials] = useState({ name: '', email: '', password: '', confirm_password: '' });
    const { showAlert } = useContext(Context);
    const userDetails = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    }

    const Submit = async (event) => {
        event.preventDefault();
        const response = await fetch('https://sociogrambackendapi.vercel.app/instagram/auth/signup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, confirm_password: credentials.confirm_password })
        });
        const data = await response.json();
        if (data.success) {
            localStorage.setItem('token1', data.authToken);
            Navigate('/');
            showAlert("success","account created successfully");
        }
        else{
            showAlert("danger","account already exist")
        }
    }
    return (
        <>
            <div className='w-full h-[100vh] flex justify-center items-center'>
                <div className=' w-72  bg-[#ff532b] text-white rounded-xl p-3 flex flex-col items-center'>
                    <div className='p-3' style={{ fontFamily: "Dancing Script", fontSize: "1.5rem", fontWeight: "bold" }}>
                        <img src="/images/Sociogram.png" className='w-24 m-auto' alt="logo" />
                    </div>
                    <div className='p-3'>
                        <form action="login" className='flex flex-col items-center'>
                            <div className='userInput relative'>
                                <input type="text" className='my-2 py-1 px-2 text-sm text-black outline-none z-20' id='name' autoComplete='name' name='name' required onChange={userDetails} />
                                <label htmlFor="name" className='absolute left-2 top-2 py-2 text-xs text-slate-400 cursor-text'>name</label>
                            </div>
                            <div className='userInput relative'>
                                <input type="email" className='my-2 py-1 px-2 text-sm text-black outline-none z-20' id='email' autoComplete='email' name='email' required onChange={userDetails} />
                                <label htmlFor="email" className='absolute left-2 top-2 py-2 text-xs text-slate-400 cursor-text'>email</label>
                            </div>
                            <div className='passInput relative'>
                                <input type="password" className='my-2 py-1 px-2 text-sm text-black outline-none z-20' id='password' autoComplete='new-password' name='password' required onChange={userDetails} />
                                <label htmlFor="create_password" className='absolute left-2 top-2 py-2 text-xs text-slate-400 cursor-text'>create password</label>
                            </div>

                            <div className='passInput relative'>
                                <input type="password" className='my-2 py-1 px-2 text-sm text-black outline-none z-20' id='confirm_password' autoComplete='new-password' name='confirm_password' required onChange={userDetails} />
                                <label htmlFor="confirm_password" className='absolute left-2 top-2 py-2 text-xs text-slate-400 cursor-text'>confirm password</label>
                            </div>

                            <button className='px-5 py-1 w-full bg-red-600 hover:bg-red-500 text-white font-bold mt-5 rounded-xl transition-all' onClick={Submit}>signup</button>
                        </form>
                    </div>
                    <div className='flex items-center px-3'>
                        <p className='text-xs'>do you already have an account?</p>
                        <Link to='/login' className='text-xs p-1 text-blue-700'>signin</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp