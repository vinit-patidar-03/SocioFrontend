import React, { useCallback, useContext, useEffect, useState } from 'react'
import axios from 'axios';
import CreatedPostCard from '../components/CreatedPostCard';
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context'
import Spinner from '../components/Spinner';

const Home = () => {
    const Navigate = useNavigate('');
    const [data, setData] = useState();
    const { impressionStatus } = useContext(Context);

    const fetchPosts = useCallback(async () => {
        if (localStorage.getItem('token1')) {
            const response = await axios.get(`https://sociogrambackendapi.vercel.app/sociogram/posts/posts`,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            setData(response.data);
            console.log(response);
        }
    }, [])

    const userCheck = useCallback(() => {
        if (localStorage.getItem('token1') === null) {
            Navigate('/login');
        }
    }, [Navigate])


    useEffect(() => {
        userCheck();
        fetchPosts();
    }, [impressionStatus, fetchPosts, userCheck]);

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