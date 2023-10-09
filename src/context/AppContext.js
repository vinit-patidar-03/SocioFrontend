import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Context from './Context'
import axios from 'axios';

const AppContext = (props) => {

    const [user, setUser] = useState();
    const [data, setData] = useState();
    const [message, setMessage] = useState('');

    useEffect(() => {
        setTimeout(() => {
            fetchPosts();
            fetchUserDetails();
        }, 3000)
    }, [])

    const showAlert = (status, message) => {
        if (status === "success") {
            toast.success(message);
        }
        else if (status === "danger") {
            toast.error(message);
        }
    }

    const fetchUserDetails = async () => {
        if (localStorage.getItem("token1") !== null) {
            const response = await axios.get('https://sociogrambackendapi.vercel.app/instagram/auth/getUser', {
                headers: {
                    "Content-Type": "application/json",
                    "authToken": localStorage.getItem('token1')
                }
            })

            setUser(response.data);
        }
    }

    const fetchPosts = async () => {
        if (localStorage.getItem('token1')) {
            const response = await axios.get('https://sociogrambackendapi.vercel.app/instagram/posts/posts',
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            setData(response.data.reverse());
        }
    }

    return (
        <Context.Provider value={{ user, setUser, data, setData, fetchPosts, fetchUserDetails, showAlert, message, setMessage }}>
            {props.children}
        </Context.Provider>
    )
}

export default AppContext