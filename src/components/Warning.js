import React, { useContext } from 'react'
import Context from '../context/Context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Warning = (props) => {
    const Navigate = useNavigate('');
    const { message } = props;
    const { showAlert, setMessage } = useContext(Context);

    const LogOut = () => {
        localStorage.removeItem('token1');
        showAlert("success", "logged out successful")
        setMessage('');
        Navigate('/login')
    }

    const deletePost = async () => {
        const response = await axios.delete('https://sociogrambackendapi.vercel.app/instagram/posts/deletePost',JSON.stringify({ id: message }), {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (response.data.success === true) {
            Navigate('/');
            showAlert("success", "post deleted successfully");
        }
        else {
            showAlert("danger", "some error occured");
        }
        setMessage("");
    }
    return (
        <>
            <div className={`top-0 h-[100vh] w-full fixed flex justify-center ${message !== '' ? 'block' : "hidden"} items-center transition-all backdrop-blur-sm`}>
                <div className='absolute p-10 w-72 bg-[#ff532b] text-white rounded-xl'>
                    <h4 className='text-center'>do you want to {message === "Logout" ? message : "Delete"}?</h4>
                    <div className='flex justify-evenly my-5'>
                        <button className='px-5 py-1 bg-gray-600 rounded-full hover:bg-gray-500 transition-all' onClick={()=>{Navigate('/'); setMessage('')}}>Cancel</button>
                        <button className='px-5 py-1 bg-red-700 hover:bg-red-600 transition-all rounded-full' onClick={message === "Logout" ? LogOut : deletePost}>{message === "Logout" ? message : "Delete"}</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Warning