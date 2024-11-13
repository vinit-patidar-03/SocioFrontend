import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios';
import CreatedPostCard from '../components/CreatedPostCard';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

const Home = () => {
    const Navigate = useNavigate('');
    const [data, setData] = useState([]);
    const [skip, setSkip] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchPosts = useCallback(async () => {
        if (localStorage.getItem('token1')) {
            setLoading(true);
            const response = await axios.get(`https://sociogrambackendapi.vercel.app/sociogram/posts/posts?skip=${skip}&limit=10`,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            setData((prev) => prev.concat(response.data));
            setLoading(false);
        }
    }, [skip])

    const userCheck = useCallback(() => {
        if (localStorage.getItem('token1') === null) {
            Navigate('/login');
        }
    }, [Navigate])

    const handleScroll = useCallback(() => {
        if (Math.ceil(document.documentElement.clientHeight + document.documentElement.scrollTop) + 5 >= document.documentElement.scrollHeight) {
            setSkip((prev) => prev + 10)
        }
    }, [])
    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        userCheck();
        fetchPosts();
        return () => { window.removeEventListener('scroll', handleScroll) }
    }, [fetchPosts, userCheck, handleScroll]);

    return (
        <>
            <div>{
                data &&
                <div className=' mt-[84px]'>{
                    data.map((elem, index) => {
                        return <div key={index}>
                            <CreatedPostCard post={elem} />
                            <hr className='block sm:hidden border-black' />
                        </div>
                    })
                }
                </div>
            }
                {loading && <Spinner />}
            </div>
        </>
    )
}

export default Home