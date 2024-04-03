import React, { useContext, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoMdSend } from "react-icons/io";
import Context from '../context/Context';
import { Avatars } from '../utils/Avatars';
import Spinner from './Spinner.js'

const PostCard = () => {

    const Navigate = useNavigate();
    const [preview, setPreview] = useState('');
    const [image, setImage] = useState('');
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const { user, showAlert } = useContext(Context);


    //FOR SELECTING FILE AND CREATE PREVIEW
    const selectFile = (event) => {
        setPreview(URL.createObjectURL(event.target.files[0]));
        setImage(event.target.files[0]);
    }

    //TO SAVE POST
    const savePost = async () => {
        if (image && text) {
            setLoading(true);
            const data = new FormData();
            data.append("file", image);
            data.append("upload_preset", "hackerInsta");
            data.append("cloud_name", "hacker03");

            const photoRes = await axios.post('https://api.cloudinary.com/v1_1/hacker03/image/upload', data);

            const response = await axios.post("https://sociogrambackendapi.vercel.app/sociogram/posts/createPosts", JSON.stringify({ description: text, photo: photoRes.data.url, avatar: user.avatar }), {
                headers: {
                    "Content-Type": "application/json",
                    "authToken": localStorage.getItem('token1')
                }
            });

            if (response.data.success) {
                setLoading(false);
                Navigate('/');
                showAlert("success", "post created successfully")
                // setUpdate(true);
            }
            else {
                showAlert("danger", "some error occured");
            }
        }
        else {
            setMessage("Please fill up all the fields !!!")
        }
    }

    return (
        <>
            <div className='h-[88vh] sm:w-[90%] w-[100%]  flex justify-center items-center m-auto'>
                {user &&
                    <div className=' p-2 w-[70%] m-auto bg-[#ffffff] sm:shadow-[0_0px_10px_rgba(0,0,0,0.3)] text-black sm:rounded-2xl createPostCard flex flex-col justify-evenly'>
                        <h1 className='p-2 text-center font-bold text-xl'> Share Your Post</h1>
                        <hr />
                        <div className='m-2 flex items-center'>
                            <img src={Avatars[user.avatar]} className='w-10 rounded-full' alt="logo" />
                            <h5 className='ml-2 font-bold'>{user.name}</h5>
                        </div>
                        <div className='py-3 h-[50vh]'>
                            {preview ? <img src={preview} alt="preview" className=' h-[100%] m-auto' id='preview' loading='lazy' /> : <img src='/images/default_images.png' className='h-[100%] m-auto' alt="preview" id='preview' loading='lazy' />}
                        </div>
                        <div className='p-2'>
                            <input type="file" name="file" id="file" className='my-2 text-xs' onChange={selectFile} />
                            <div className='flex items-center'>
                                <textarea name="description" id="description" className='border-2  text-black px-2 text-sm w-full' placeholder='write something about your post...' onChange={(event) => { setText(event.target.value) }}></textarea>
                                <IoMdSend className='text-orange-600 text-5xl ml-3 hover:text-orange-400 transition-all hover:transition-all cursor-pointer' onClick={savePost} />
                            </div>
                            <p className=' text-white'>{message}</p>
                        </div>
                    </div>
                }
                {loading && <Spinner />}
            </div>
        </>
    )
}

export default PostCard