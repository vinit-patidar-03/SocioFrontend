import React, { useContext, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Context from '../context/Context';
import { FaHome, FaPlusSquare, FaUser } from 'react-icons/fa'
import { FaArrowRightFromBracket } from "react-icons/fa6";

const Navbar = () => {
  const Navigate = useNavigate();
  const { setMessage } = useContext(Context);
  const location = useLocation();

  useEffect(() => {

  }, [location])

  const alertLogout = () => {
    setMessage("Logout");
  }
  return (
    <>
      <nav className='bg-white flex items-center justify-center fixed top-0 w-full shadow-md z-50'>
        <ul className='flex justify-between items-center w-full p-1'>
          <li>
            <img src="/images/SociogramLogo.png" className='h-16 cursor-pointer' alt="logo" onClick={() => { Navigate('/') }} />
          </li>
          <li className='flex'>
            <Link to='/' className={`btn rounded-full py-1 px-3 mx-1 ${location.pathname === '/login' || location.pathname === '/signup' ? 'hidden' : ''} flex flex-col items-center justify-center`}>
              <FaHome className='text-orange-500 text-2xl' />
              Home
            </Link>
            <Link to='/profile' className={`btn rounded-full py-1 px-3 mx-1 ${location.pathname === '/login' || location.pathname === '/signup' ? 'hidden' : ''} flex flex-col items-center justify-center`}>
              <FaUser className='text-orange-500 text-2xl' />
              Profile
            </Link>
            <Link to='/post' className={`btn rounded-full py-1 px-3 mx-1 ${location.pathname === '/login' || location.pathname === '/signup' ? 'hidden' : ''} flex flex-col items-center justify-center`}>
              <FaPlusSquare className='text-orange-500 text-2xl' />
              Post
            </Link>
            <Link className={`btn rounded-full py-1 px-3 mx-1 ${location.pathname === '/login' || location.pathname === '/signup' ? 'hidden' : ''} flex flex-col items-center justify-center`} onClick={alertLogout}>
              <FaArrowRightFromBracket className='text-orange-500 text-2xl' />
              Logout
            </Link>
            <Link to='/login' className={`btn rounded-full py-1 px-3 mx-1 ${location.pathname === '/login' || location.pathname === '/signup' ? '' : 'hidden'}`}>Login</Link>
            <Link to='/signup' className={`btn rounded-full py-1 px-3 mx-1 ${location.pathname === '/signup' || location.pathname === '/login' ? '' : 'hidden'}`}>SignUp</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Navbar