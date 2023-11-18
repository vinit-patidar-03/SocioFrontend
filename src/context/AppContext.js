import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Context from './Context'
import axios from 'axios';

const AppContext = (props) => {

    const [update, setUpdate] = useState(false);
    const [user, setUser] = useState();
    const [data, setData] = useState();
    const [message, setMessage] = useState('');
    const [post, setPost] = useState();
    const [likestatus, setLikestatus] = useState();

    useEffect(() => {
        fetchPosts();
        fetchUserDetails();
    }, [update])

    const playSound = () => {
        let audio = new Audio('/likesound.mp3');
        audio.play();
    }

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
            const response = await axios.get('https://sociogrambackendapi.vercel.app/sociogram/auth/getUser', {
                headers: {
                    "Content-Type": "application/json",
                    "authToken": localStorage.getItem('token1')
                }
            })
            setUser(response.data);
            setUpdate(false);
        }
    }

    const fetchPosts = async () => {
        if (localStorage.getItem('token1')) {
            const response = await axios.get('https://sociogrambackendapi.vercel.app/sociogram/posts/posts',
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            setData(response.data.reverse());
            console.log(response);
        }
    }

    const fetchPost = async (id) => {
        setPost('');
        const response = await axios.get(`https://sociogrambackendapi.vercel.app/sociogram/posts/post/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        setPost(response.data)
    }

    const likePost = async (id) => {
        const response = await axios.put('https://sociogrambackendapi.vercel.app/sociogram/posts/like', JSON.stringify({ postId: id }), {
            headers: {
                "Content-Type": "application/json",
                "authToken": localStorage.getItem('token1'),
            }
        })
        setLikestatus(response);
        playSound();
    }


    const commentonPost = async (id, comment) => {
        const response = await axios.put('https://sociogrambackendapi.vercel.app/sociogram/posts/comment', JSON.stringify({ postId: id, comment }), { headers: { "Content-Type": "application/json", "authToken": localStorage.getItem('token1') } });
        playSound();
        setLikestatus(response)
    }

    return (
        <Context.Provider value={{ user, setUser, data, setData, fetchPosts, fetchUserDetails, showAlert, message, setMessage, fetchPost, post, setPost, likePost, likestatus, setLikestatus, commentonPost, update, setUpdate }}>
            {props.children}
        </Context.Provider>
    )
}

export default AppContext