import React, { useCallback, useEffect } from 'react'
import PostCard from '../components/CreatePostCard'
import { useNavigate } from 'react-router-dom'

const PostPage = () => {
    const Navigate = useNavigate();
    
    const userCheck = useCallback(() => {
        if (localStorage.getItem('token1') === null) {
            Navigate('/login');
        }
    }, [Navigate])

    useEffect(()=>{
        userCheck();
    },[userCheck])
    
    return (
        <>
            <div className='mx-auto mt-[75px]'>
                <PostCard />
            </div>
        </>
    )
}

export default PostPage