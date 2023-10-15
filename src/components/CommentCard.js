import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Avatars } from '../utils/Avatars';

const CommentCard = (props) => {
    const {comment,post} = props;
    const [details,setDetails] = useState('');
    
    useEffect(()=>{
        fetchCommentedUser();
    },[])

    const fetchCommentedUser = async () =>{
        const response = await axios.get(`https://sociogrambackendapi.vercel.app/sociogram/auth/getUser/${comment.postedby}`)
        setDetails(response.data);
    }
  return (
    <>
     <div className='w-[60%] m-auto'>{
        details &&
             <div>
                  <div className='flex items-center'>
                  <img src={Avatars[post.avatar]} className='w-10' alt="logo" />
                  <h3 className='font-bold'>{details.name}</h3>
                  </div>
                   <p className='ml-10 text-sm'>{comment.comment}</p>
             </div>
     }
     </div>
    </>
  )
}

export default CommentCard