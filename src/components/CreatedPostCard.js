/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { Avatars } from '../utils/Avatars';
import Context from '../context/Context';
import { useNavigate } from 'react-router-dom';
import { IoMdSend } from "react-icons/io";

const CreatedPostCard = (props) => {

  const Navigate = useNavigate('')
  const [comment,setComment] = useState('');
  const [warning, setWarning] = useState(false);
  const { post } = props;
  const { user,fetchPosts, likestatus, likePost,commentonPost } = useContext(Context);


  useEffect(() => {
      fetchPosts();
  }, [likestatus])


  const postComment = () => {
    if(comment !== ''){
      commentonPost(post._id,comment); 
      setComment('');
    }else{
      setWarning(true);
      setInterval(()=>{
        setWarning(false);
      },3000)
    }
  }
  return (
    <>{user && 
      <div className='p-3 bg-white mx-auto my-3 rounded-lg  w-[500px] createdPostCard'>
        <div className='my-2 flex items-center'>
        <img src={Avatars[post.avatar]} className='w-16 rounded-full' alt="logo" />
          <h5 className='ml-2 font-semibold cursor-pointer' onClick={() => { Navigate(`/otherUserProfile/${post.user}`) }}>{post.name}</h5>
        </div>
        <div className='m-auto bg-[#f8f8f8] rounded-lg w-[95%]'>
          <img src={post.photo} className='m-auto object-container max-h-[50vh]' alt="logo" loading='lazy'/>
        </div>
        <div className='flex mt-5'>
          <div>
            <i className={`fa-${post.likes.filter((elem) => { return elem === user._id }).length !== 0 ? "solid" : "regular"} fa-heart ml-2 cursor-pointer fa-lg ${post.likes.filter((elem) => { return elem === user._id }).length !== 0 ? "text-pink-500" : ""}`} onClick={() => { likePost(post._id) }} title='like/dislike'></i>
            <p className='ml-2'>{post.likes.length} likes</p>
          </div>
          <div className='ml-5' onClick={() => { Navigate(`/comments/${post._id}`) }}>
            <i className="fa-regular fa-comment fa-lg ml-2 cursor-pointer" title='comment'></i>
            <p className='ml-2'>{post.comments.length} comments</p>
          </div>
        </div>
        <p className='m-2'>{post.description}</p>
        <div className='m-2 w-[95%] flex items-center'>
          <input type="text" name="comment" id="comment" placeholder='write something to comment' onChange={(event)=>{setComment(event.target.value)}} className='outline outline-1 text-sm p-1 w-[calc(100%-2rem)]' value={comment}/>
          <button className='ml-2' onClick={postComment}><IoMdSend  className='text-orange-600 text-3xl hover:text-orange-400 transition-all hover:transition-all'/></button>
        </div>
        {warning && <p className='text-sm ml-2 text-red-500'>Please write something to Post !!!</p>}
      </div>
    }
    </>
  )
}

export default CreatedPostCard;