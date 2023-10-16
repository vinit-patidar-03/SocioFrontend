import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Avatars } from '../utils/Avatars';
import Context from '../context/Context';

const CommentCard = (props) => {
    const {comment} = props;
    const {user,fetchUserDetails} = useContext(Context);
    const [details,setDetails] = useState('');
    
    useEffect(()=>{
        fetchCommentedUser();
        fetchUserDetails();
    },[])

    const fetchCommentedUser = async () =>{
        const response = await axios.get(`https://sociogrambackendapi.vercel.app/sociogram/auth/getUser/${comment.postedby}`)
        setDetails(response.data);
    }
  return (
    <>
     <div className='w-[60%] m-auto commentCard'>{
        details && user?
             <div className={`${comment.postedby === user._id ? 'bg-green-400':''} my-2`}>
                  <div className='flex items-center'>
                  <img src={Avatars[details.avatar]} className='w-10' alt="logo" />
                  <h3 className='font-bold'>{details.name}</h3>
                  </div>
                   <p className='ml-10 text-sm'>{comment.comment}</p>
             </div>:''
     }
     </div>
    </>
  )
}

export default CommentCard