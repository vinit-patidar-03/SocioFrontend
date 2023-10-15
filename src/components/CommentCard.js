import axios from 'axios';
import React, { useEffect, useState } from 'react'

const CommentCard = (props) => {
    const {comment} = props;
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
     <div>{
        details &&
             <div>
                   <h3>{details.name}</h3>
                   <p>{comment.comment}</p>
             </div>
     }
     </div>
    </>
  )
}

export default CommentCard