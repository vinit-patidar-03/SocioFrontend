import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CreatedPostCard from '../components/CreatedPostCard';
import Context from '../context/Context';
import CommentCard from '../components/CommentCard';
import Spinner from '../components/Spinner';

const Comments = () => {
    const { id } = useParams();
    const { post, fetchPost, impressionStatus } = useContext(Context);

    useEffect(() => {
        fetchPost(id);
    }, [fetchPost, id, impressionStatus])



    return (
        <>
            <div>{post &&
                <div className='mt-20'>
                    <div>
                        <CreatedPostCard post={post} />
                        <h3 className='text-center font-bold text-lg'>Comments</h3>
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