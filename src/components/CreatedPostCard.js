import React, { useContext, useEffect, useState } from 'react'
import { Avatars } from '../utils/Avatars';
import Context from '../context/Context';
import { useNavigate } from 'react-router-dom';
import { IoMdSend } from "react-icons/io";
import { FaHeart, FaRegComment, FaRegHeart } from 'react-icons/fa';

const CreatedPostCard = (props) => {

  const Navigate = useNavigate('')
  const { user, likePost, commentonPost, impressionStatus } = useContext(Context);
  const [comment, setComment] = useState('');
  const [warning, setWarning] = useState(false);
  const { post } = props;
  const [like, setLike] = useState()
  const [stats, setStats] = useState({ comments: post.comments.length, likes: post.likes.length })

  //TO HANDLE WARNING MESSAGE
  const postComment = () => {
    if (comment !== '') {
      commentonPost(post._id, comment);
      setComment('');
    } else {
      setWarning(true);
      setInterval(() => {
        setWarning(false);
      }, 3000)
    }
  }

  useEffect(() => {
    setLike(user && post.likes.filter((elem) => { return elem === user._id }).length !== 0)
  }, [post.likes, user])

  useEffect(() => {
    if (impressionStatus.delComment) {
      setStats({ ...stats, comments: stats.comments - 1 })
    }
  }, [impressionStatus, stats])

  return (
    <>{user &&
      <div className='p-3 bg-white mx-auto my-3 sm:rounded-lg sm:w-[500px] w-full sm:shadow-[0_0px_3px_0px_rgba(0,0,0,0.3)]'>
        <div className='my-2 flex items-center'>
          <img src={Avatars[post.avatar]} className='w-16 rounded-full' alt="logo" />
          <h5 className='ml-2 font-semibold cursor-pointer' onClick={() => { Navigate(post.user !== user._id ? `/otherUserProfile/${post.user}` : '/profile') }}>{post.name}</h5>
        </div>
        <div className='m-auto bg-slate-100 rounded-lg w-[95%]'>
          <img src={post.photo} className='m-auto w-full h-[300px] sm:h-[400px] object-contain' alt="logo" loading='lazy' />
        </div>
        <div className='flex mt-5'>
          <div onClick={() => {
            likePost(post._id)
            if (like) {
              setStats({ ...stats, likes: stats.likes - 1 })
              setLike(false)
            } else {
              setStats({ ...stats, likes: stats.likes + 1 })
              setLike(true)
            }
          }}>
            {like ? <FaHeart className='text-pink-500 text-2xl ml-2 cursor-pointer' /> : <FaRegHeart className='text-2xl ml-2 cursor-pointer' title='like/dislike' />}
            <p className='ml-2'>{stats.likes} likes</p>
          </div>
          <div className='ml-5' onClick={() => { Navigate(`/comments/${post._id}`) }}>
            {/* <i className="fa-regular fa-comment fa-lg ml-2 cursor-pointer" title='comment'></i> */}
            <FaRegComment className='text-2xl ml-2 cursor-pointer' title='comment' />
            <p className='ml-2'>{stats.comments} comments</p>
          </div>
        </div>
        <p className='m-2'>{post.description}</p>
        <div className='m-2 w-[95%] flex items-center'>
          <input type="text" name="comment" placeholder='write something to comment' onChange={(event) => { setComment(event.target.value) }} className='outline outline-1 text-sm p-1 w-[calc(100%-2rem)]' value={comment} />
          <button className='ml-2' onClick={() => {
            postComment()
            setTimeout(() => { setStats({ ...stats, comments: stats.comments + 1 }) }, 3000)
          }
          }><IoMdSend className='text-orange-600 text-3xl hover:text-orange-400 transition-all hover:transition-all' /></button>
        </div>
        {warning && <p className='text-sm ml-2 text-red-500'>Please write something to Post !!!</p>}
      </div>
    }
    </>
  )
}

export default CreatedPostCard;