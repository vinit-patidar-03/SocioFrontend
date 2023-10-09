import React, { useContext, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context';

const PostCard = () => {

    const Navigate = useNavigate();
    const [preview, setPreview] = useState('');
    const [image, setImage] = useState('');
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [message,setMessage] = useState('');
    const { user ,showAlert} = useContext(Context);


    const selectFile = (event) => {
        setPreview(URL.createObjectURL(event.target.files[0]));
        setImage(event.target.files[0]);
    }

    const savePost = async () => {
        if (image && text) {
            setLoading(true);
            const data = new FormData();
            data.append("file", image);
            data.append("upload_preset", "hackerInsta");
            data.append("cloud_name", "hacker03");

            const photoRes = await axios.post('https://api.cloudinary.com/v1_1/hacker03/image/upload', data);
            
            const response = await axios.post("https://sociogrambackendapi.vercel.app/instagram/posts/createPosts", JSON.stringify({ description: text, photo: photoRes.data.url }), {
                headers: {
                    "Content-Type": "application/json",
                    "authToken": localStorage.getItem('token1')
                }
            });
            
            if (response.data.success) {
                setLoading(false);
                Navigate('/');
                showAlert("success","post created successfully")
            }
            else{
                showAlert("danger","some error occured");
            }
        }
        else {
            setMessage("Please fill up all the fields !!!")
        }
    }

    return (
        <>
            {
                loading ?
                    <img src="/images/spinner.gif" alt="loader" />
                    :
                    <div className=' p-2 w-[70%] m-auto bg-[#ff5200] text-white rounded-2xl createPostCard flex flex-col justify-evenly'>
                        <h1 className='p-2 text-center font-bold text-xl'>Create Post and Share Your Best Time</h1>
                        <hr />
                        <div className='m-2 flex items-center'>
                            <img src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png" className='w-8' alt="logo" />
                            <h5 className='ml-2 font-bold'>{user.name}</h5>
                        </div>
                        <div className='py-3 h-[50vh]'>
                            {preview ? <img src={preview} alt="preview" className=' h-[100%] m-auto' id='preview' /> : <img src='/images/default_images.png' className='h-[100%] m-auto' alt="preview" id='preview' />}
                        </div>
                        <div className='p-2'>
                            <input type="file" name="file" id="file" className='my-2 text-xs' onChange={selectFile} />
                            <div className='flex'>
                                <textarea name="description" id="description" className='border-2  text-black px-2 text-sm w-full' placeholder='write something about your post...' onChange={(event) => { setText(event.target.value) }}></textarea>
                                <button className='py-1 ml-2 px-5 rounded-full bg-[#ff8f00] transition-all border-4 border-white hover:bg-orange-500 hover:transition-all' onClick={savePost}><i className="fa-solid fa-arrow-right fa-xl"></i></button>
                            </div>
                            <p className=' text-white'>{message}</p>
                        </div>
                    </div>
            }
        </>
    )
}

export default PostCard