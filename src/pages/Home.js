import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios';
import CreatedPostCard from '../components/CreatedPostCard';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

const Home = () => {
    const Navigate = useNavigate('');
    const [data, setData] = useState([]);
    const [skip, setSkip] = useState(0);

    const fetchPosts = useCallback(async () => {
        if (localStorage.getItem('token1')) {
            const response = await axios.get(`https://sociogrambackendapi.vercel.app/sociogram/posts/posts?skip=${skip}&limit=10`,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            setData((prev)=>prev.concat(response.data));
        }
    }, [skip])

    const userCheck = useCallback(() => {
        if (localStorage.getItem('token1') === null) {
            Navigate('/login');
        }
    }, [Navigate])

    const handleScroll = useCallback(() =>
        {
            if (Math.ceil(document.documentElement.clientHeight + document.documentElement.scrollTop) >= document.documentElement.scrollHeight) {
                setSkip((prev)=>prev+10)
             }
        },[])
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
                <div className=' mt-[80px]'>{
                    data.map((elem, index) => {
                        return <CreatedPostCard post={elem} key={index} />
                    })
                }
                </div>
            }
                {!data && <Spinner />}
            </div>
        </>
    )
}

export default Home