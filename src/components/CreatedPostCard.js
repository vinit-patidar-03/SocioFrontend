/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import Context from '../context/Context';
import axios from 'axios';

const CreatedPostCard = (props) => {

  const { post } = props;
  const {user,fetchPosts} = useContext(Context);
  const [likestatus,setLikestatus] = useState();

  useEffect(()=>
  {
      fetchPosts();
  },[likestatus])


  const likePost = async (id) => {
    const response = await axios.put('https://sociogrambackendapi.vercel.app/instagram/posts/like',  JSON.stringify({ postId: id }),{
      headers: {
        "Content-Type": "application/json",
        "authToken": localStorage.getItem('token1'),
      }
    })

    setLikestatus(response.data.success);
  }

  const likepostandUpdate = () => {
     likePost(post._id) 
     let audio = new Audio('likesound.mp3');
     audio.play();
    }
  // console.log(post.likes)

  return (
    <>{user &&
      <div className='p-3 bg-[#ffffff] mx-auto my-3 rounded-lg  w-[50%] createdPostCard'>
        <div className='m-2 flex items-center'>
          <img src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png" className='w-8' alt="logo" />
          <h5 className='ml-2'>{post.name}</h5>
        </div>
        <div className='m-auto p-2'>
          <img src={post.photo} className='m-auto object-contain w-[90%]' alt="logo" />
        </div>
        <i className={`fa-${post.likes.filter((elem)=>{return elem === user._id}).length !== 0?"solid":"regular"} fa-heart ml-2 cursor-pointer fa-lg ${post.likes.filter((elem)=>{return elem === user._id}).length !== 0?"text-pink-500":""}`} onClick={likepostandUpdate} title='like/dislike'></i>
        <p className='ml-2'>{post.likes.length} likes</p>
        <p className='p-2'>{post.description}</p>
      </div>
    }
    </>
  )
}

export default CreatedPostCard;