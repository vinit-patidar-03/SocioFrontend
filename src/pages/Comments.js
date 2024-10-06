import React, { useCallback, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CreatedPostCard from '../components/CreatedPostCard';
import Context from '../context/Context';
import CommentCard from '../components/CommentCard';
import Spinner from '../components/Spinner';

const Comments = () => {
    const Navigate = useNavigate();
    const { id } = useParams();
    const { post, fetchPost, impressionStatus } = useContext(Context);

    const userCheck = useCallback(() => {
        if (localStorage.getItem('token1') === null) {
            Navigate('/login');
        }
    }, [Navigate])

    useEffect(() => {
        fetchPost(id);
        userCheck();
    }, [fetchPost, id, impressionStatus, userCheck])

    return (
        <>
            <div className='h-[100vh] lg:flex lg:justify-center'>
                {post &&
                    <div className='lg:flex mt-20 mb-5 p-3 lg:shadow-[0_0px_5px_1px_rgba(0,0,0,0.2)] lg:rounded-md'>
                        <CreatedPostCard post={post} />
                        <div className='lg:ml-3 lg:mt-2 lg:overflow-scroll'>
                            <h3 className='font-bold text-lg text-center'>Comments</h3>
                            {post.comments.length !== 0 ?
                                Array.from(post.comments).reverse().map((elem, index) => {
                                    return <CommentCard comment={elem} postId={post._id} key={index} />
                                }) : <h3 className='text-center mt-5'>No Comments</h3>
                            }
                        </div>
                    </div>
                }
                {!post && <Spinner />}
            </div>
        </>
    )
}

export default Comments