import React, { useContext, useEffect } from 'react'
import CreatedPostCard from '../components/CreatedPostCard';
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context'
import Spinner from '../components/Spinner';

const Home = () => {
    const Navigate = useNavigate('');
    const { data } = useContext(Context);

    useEffect(() => {
        userCheck();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const userCheck = () => {
        if (localStorage.getItem('token1') === null) {
            Navigate('/login');
        }
    }

    return (
        <>
            <div>{data &&
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