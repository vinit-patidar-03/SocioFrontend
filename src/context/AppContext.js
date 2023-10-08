import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Context from './Context'

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
            const response = await fetch('https://sociogrambackendapi.vercel.app/instagram/auth/getUser', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authToken": localStorage.getItem('token1')
                }
            })
            const userDetails = await response.json();
            setUser(userDetails);
        }
    }

    const fetchPosts = async () => {
        if (localStorage.getItem('token1')) {
            const response = await fetch('https://sociogrambackendapi.vercel.app/instagram/posts/posts',
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

            const result = await response.json();
            setData(result.reverse());
        }
    }

    return (
        <Context.Provider value={{ user, setUser, data, setData, fetchPosts, fetchUserDetails, showAlert, message, setMessage }}>
            {props.children}
        </Context.Provider>
    )
}

export default AppContext