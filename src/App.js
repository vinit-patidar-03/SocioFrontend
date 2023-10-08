import './App.css';
import {Toaster} from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PostPage from './pages/PostPage';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Warning from './components/Warning';
import { useContext } from 'react';
import Context from './context/Context';

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
          <Route path='/signup' element={<SignUp />} />
        </Routes>
        <Warning message={message} />
      </Router>
    </>
  );
}

export default App;
