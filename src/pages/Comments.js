import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CreatedPostCard from '../components/CreatedPostCard';
import Context from '../context/Context';
import CommentCard from '../components/CommentCard';

const Comments = () => {
    const { id } = useParams();
    const { post, fetchPost, likestatus } = useContext(Context);

    useEffect(() => {
        fetchPost(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [likestatus])



    return (
        <>
            <div className='mt-20'>
                { post &&
                    <div>
                        {
                            <CreatedPostCard post={post} />
                        }

                        <h3 className='text-center font-bold text-lg'>Comments</h3>
                        {
                            post.comments.map((elem, index) => {
                                return <CommentCard comment={elem} key={index} />
                            })
                        }
                    </div>
                }
            </div>
        </>
    )
}

export default Comments