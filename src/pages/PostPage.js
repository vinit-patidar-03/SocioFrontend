import React from 'react'
import PostCard from '../components/CreatePostCard'

const PostPage = () => {
    return (
        <>
            <div className='mx-auto mt-[75px]'>
                <div className='h-[88vh] w-[90%]  flex justify-center items-center m-auto'>
                    <PostCard />
                </div>
            </div>
        </>
    )
}

export default PostPage