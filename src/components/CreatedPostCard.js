/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { Avatars } from '../utils/Avatars';
import Context from '../context/Context';
import { useNavigate } from 'react-router-dom';

const CreatedPostCard = (props) => {

  const Navigate = useNavigate('')
  const [comment,setComment] = useState('');
  const { post } = props;
  const { user,fetchPosts, likestatus, likePost,commentonPost } = useContext(Context);


  useEffect(() => {
      fetchPosts();
  }, [likestatus])


  return (
    <>{user && 
      <div className='p-3 bg-[#ffffff] mx-auto my-3 rounded-lg  w-[60%] createdPostCard'>
        <div className='m-2 flex items-center'>
        <img src={Avatars[post.avatar]} className='w-10 rounded-full' alt="logo" />
          <h5 className='ml-2 font-semibold cursor-pointer' onClick={() => { Navigate(`/otherUserProfile/${post.user}`) }}>{post.name}</h5>
        </div>
        <div className='m-auto p-2'>
          <img src={post.photo} className='m-auto object-contain w-full' alt="logo" />
        </div>
        <div className='flex'>
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
        <div className='m-2 w-[100%]'>
          <input type="text" name="comment" id="comment" placeholder='write something to comment' onChange={(event)=>{setComment(event.target.value)}} required className='outline outline-1 text-sm p-1 w-[80%]' value={comment}/>
          <button className='px-4 py-1 text-white bg-[#ff3f00] rounded-full ml-2 hover:bg-orange-600 transition-all hover:transition-all' onClick={()=>{commentonPost(post._id,comment); setComment('')}}>Post</button>
        </div>
      </div>
    }
    </>
  )
}

export default CreatedPostCard;