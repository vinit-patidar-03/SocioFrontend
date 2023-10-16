import './App.css';
import {Toaster} from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PostPage from './pages/Post';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Warning from './components/Warning';
import { useContext } from 'react';
import Context from './context/Context';
import Comments from './pages/Comments';
import OtherUserProfileCard from './pages/OtherUserProfileCard';
import UploadProfilephoto from './components/UploadProfilephoto';

function App() {
  const {message} = useContext(Context);
  return (
    <>
      <Router>
        <Navbar />
        <Toaster
                position="bottom-center"
                reverseOrder={false}
            />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/profile' element={<Profile />} />
          <Route exact path='/post' element={<PostPage />} />
          <Route exact path='/login' element={<SignIn />} />
          <Route exact path='/signup' element={<SignUp />} />
          <Route exact path='/profileEdit' element={<UploadProfilephoto/>} />
          <Route exact path='/comments/:id' element={<Comments />}/>
          <Route exact path='/otherUserProfile/:id' element={<OtherUserProfileCard />}/>
        </Routes>
        <Warning message={message} />
      </Router>
    </>
  );
}

export default App;
