import React from 'react';
import { RxCross2 } from "react-icons/rx";
import FollowersCard from './FollowersCard';

const FollowersModal = ({ followers, followings, setShowfollowers, showFollower }) => {

    return (
        <>
            <div className='w-[100vw] h-[calc(100vh-70px)] mt-[70px] fixed top-0 left-0 z-50 flex justify-center items-center backdrop-blur-lg'>
                <div className='md:w-[40%] sm:[60%] w-[90%] h-[90%] bg-[#ffffff] text-black rounded-xl relative shadow-[0_0px_10px_rgba(0,0,0,0.5)]'>
                    <RxCross2 className='absolute top-3 right-3 text-3xl cursor-pointer' onClick={() => { setShowfollowers({ status: false, tabName: "" }) }} />
                    <ul className='flex justify-evenly list-none mt-16'>
                        <li className={`${showFollower.tabName === "Followers" ? 'border-[#ff4015]' : ''} border-2 py-1 px-2 cursor-pointer`} onClick={() => { setShowfollowers({ status: true, tabName: "Followers" }) }}>Followers</li>
                        <li className={`${showFollower.tabName === "Followings" ? 'border-[#ff4015]' : ''} border-2 py-1 px-2 cursor-pointer`} onClick={() => { setShowfollowers({ status: true, tabName: "Followings" }) }}>Followings</li>
                    </ul>
                    <div className='h-[75%] overflow-scroll mx-2 my-5 flex justify-center'>
                        <div>
                            {
                                showFollower.tabName === "Followers" ?
                                    followers.map((item, index) => {
                                        return <FollowersCard data={item} key={index} setShowfollowers={setShowfollowers} />
                                    }) :
                                    followings.map((item, index) => {
                                        return <FollowersCard data={item} key={index} setShowfollowers={setShowfollowers} />
                                    })
                            }
                            {followers.length === 0 && showFollower.tabName === 'Followers' && <h1 className='mt-14 text-2xl'>No Followers</h1>}
                            {followings.length === 0 && showFollower.tabName === 'Followings' && <h1 className='mt-14 text-2xl'>No Followings</h1>}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default FollowersModal