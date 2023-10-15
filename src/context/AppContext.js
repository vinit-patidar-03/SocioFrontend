import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Context from './Context'
import axios from 'axios';

const AppContext = (props) => {

    const [update,setUpdate] = useState(false);
    const [user, setUser] = useState();
    const [data, setData] = useState();
    const [message, setMessage] = useState('');
    const [post,setPost] = useState();
    const [likestatus,setLikestatus] = useState();

    useEffect(() => { 
        setTimeout(()=>{
            fetchPosts();
            fetchUserDetails();
        },1000)
    }, [update])

    const playSound = ()=>{
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
            const response = await axios.get('http://localhost:5000/sociogram/auth/getUser', {
                headers: {
                    "Content-Type": "application/json",
                    "authToken": localStorage.getItem('token1')
                }
            })
            console.log(response);
            setUser(response.data);
            setUpdate(false);
        }
    }

    const fetchPosts = async () => {
        if (localStorage.getItem('token1')) {
            const response = await axios.get('http://localhost:5000/sociogram/posts/posts',
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            setData(response.data.reverse());
        }
    }

    const fetchPost = async (id) => {
        const response = await axios.get(`http://localhost:5000/sociogram/posts/post/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        setPost(response.data)
        console.log(response.data);
    }

    const likePost = async (id) => {
        const response = await axios.put('http://localhost:5000/sociogram/posts/like',  JSON.stringify({ postId: id }),{
          headers: {
            "Content-Type": "application/json",
            "authToken": localStorage.getItem('token1'),
          }
        })
    
        setLikestatus(response.data.success);
      }
    
      const likepostandUpdate = (id) => {
         likePost(id) 
         playSound();
        }

    const commentonPost = async (comment,id) =>{
        const response = await axios.put('http://localhost:5000/sociogram/posts/comment',JSON.stringify({postId: id,comment}),{headers: {"Content-Type": "application/json","authToken": localStorage.getItem('token1')}});
        console.log(response);
        setLikestatus(response.data.success)
    }

    const commentonPostandUpdate = (id,comment)=>{
        commentonPost(comment,id);
    }
    return (
        <Context.Provider value={{ user, setUser, data, setData, fetchPosts, fetchUserDetails, showAlert, message, setMessage, fetchPost, post, setPost, likePost,likepostandUpdate,likestatus, commentonPostandUpdate,update,setUpdate}}>
            {props.children}
        </Context.Provider>
    )
}

export default AppContext