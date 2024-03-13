import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Context from './Context'
import axios from 'axios';

const AppContext = (props) => {

    //FOR REAL TIME POST UPDATES
    const [followUpdate, setFollowUpdate] = useState(false);
    const [user, setUser] = useState();
    const [message, setMessage] = useState('');
    const [post, setPost] = useState();
    const [impressionStatus, setImpressionStatus] = useState({addComment: false, delComment: false});

    useEffect(()=>{
        fetchUserDetails();
    },[]);


    //SOUND FOR NOTIFICATIONS
    const playSound = () => {
        let audio = new Audio('/likesound.mp3');
        audio.play();
    }

    //FOR SHOWING ALERTS
    const showAlert = (status, message) => {
        if (status === "success") {
            toast.success(message);
        }
        else if (status === "danger") {
            toast.error(message);
        }
    }

    //FETCHING USER DETAILS
    const fetchUserDetails = async () => {
        if (localStorage.getItem("token1") !== null) {
            const response = await axios.get('https://sociogrambackendapi.vercel.app/sociogram/auth/getUser', {
                headers: {
                    "Content-Type": "application/json",
                    "authToken": localStorage.getItem('token1')
                }
            })
            setUser(response.data);
        }
    }

    //FOR FETCHING SINGLE POST FOR COMMENTS PAGE
    const fetchPost = useCallback( async (id) => {
        const response = await axios.get(`https://sociogrambackendapi.vercel.app/sociogram/posts/post/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        setPost(response.data)
    },[])

    //FOR UPDATE LIKES
    const likePost = async (id) => {
        await axios.put('https://sociogrambackendapi.vercel.app/sociogram/posts/like', JSON.stringify({ postId: id }), {
            headers: {
                "Content-Type": "application/json",
                "authToken": localStorage.getItem('token1'),
            }
        })
        playSound();
    }


    //FOR ADDING COMMENT ON POST
    const commentonPost = async (id, comment) => {
        setImpressionStatus({addComment: true, delComment: false})
        await axios.put('https://sociogrambackendapi.vercel.app/sociogram/posts/comment', JSON.stringify({ postId: id, comment }), { headers: { "Content-Type": "application/json", "authToken": localStorage.getItem('token1') } });
        playSound();
        setImpressionStatus({addComment: false, delComment: false})
    }

    //FOR TOGGELING FOLLOWERS
    const addFollower = async (userId) => {
         const result = await fetch(`https://sociogrambackendapi.vercel.app/sociogram/auth/follow/${userId}`,{
            method: "PUT",
            headers :{
                "Content-Type" : "application/json",
                "authToken" : localStorage.getItem('token1')
            }
         }) 
          const response = await result.json();
          setFollowUpdate(response);
          playSound()
    }

    return (
        <Context.Provider value={{ user, setUser, fetchUserDetails, showAlert, message, setMessage, fetchPost, post, setPost, likePost, impressionStatus, setImpressionStatus, commentonPost, addFollower, followUpdate, setFollowUpdate}}>
            {props.children}
        </Context.Provider>
    )
}

export default AppContext