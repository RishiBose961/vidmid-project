import { useContext, useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import { AuthContext } from './context/AuthContext';
import axios from 'axios';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './components/Home/Home';
import Post from './components/Post/Post';
import AuthLayout from './layout/AuthLayout';
import Profile from './components/Profile/Profile';
import Search from './components/Search/Search';
import Lhome from './components/LoadingScreens/Lhome';
import SearchResult from './components/Search/SearchResult';
import SearchProfile from './components/SearchProfile/SearchProfile';

function App() {
  const { dispatch, token, isLoggedIn } = useContext(AuthContext)

  const [loading, setLoading] = useState(false)

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "system"
  )
  const element = document.documentElement
  const darkQuery = window.matchMedia("(prefers-color-scheme:dark)")
  // console.log(darkQuery);
  const options = [
    {
      icon: "sunny",
      text: "light"
    },
    {
      icon: "moon",
      text: "dark"
    },
    {
      icon: "desktop-outline",
      text: "system"
    }
  ]

  function onWindowMatch() {
    if (localStorage.theme === 'dark' || (!("theme" in localStorage) && darkQuery.matches)) {
      element.classList.add("dark")
    } else {
      element.classList.remove("dark")
    }
  }
  onWindowMatch()
  useEffect(() => {
    switch (theme) {
      case "dark":
        element.classList.add("dark")
        localStorage.setItem('theme', 'dark')
        break;
      case "light":
        element.classList.remove("dark")
        localStorage.setItem('theme', 'light')
        break;
      default:
        localStorage.removeItem('theme')
        onWindowMatch()
        break;
    }
  }, [theme])


  //get ac token
  useEffect(() => {
    const _appSignging = localStorage.getItem("_appSignging");
    if (_appSignging) {
      const getToken = async () => {
        const res = await axios.post("api/auth/access", null);
        dispatch({ type: "GET_TOKEN", payload: res.data.ac_token });
      };
      getToken();
    }
  }, [dispatch, isLoggedIn]);

  //get user data

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        dispatch({ type: "SIGNING" });
        const res = await axios.get("api/auth/user", {
          headers: { Authorization: token },
        });
        dispatch({ type: "GET_USER", payload: res.data });
      };
      getUser();
    }
  }, [dispatch, token])


  // setTimeout(() => {
  //   setLoading(true);
  // }, 1000);

  return (
    <div className="min-h-screen pt-1 dark:text-gray-100 dark:bg-slate-900 duration-100">
    
        {loading ? <BrowserRouter>
        <Header />
        <div className='container mx-auto'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/createpost' element={isLoggedIn ? <Post /> : <AuthLayout />} />
            <Route path='/profile' element={isLoggedIn ? <Profile options={options} theme={theme} setTheme={setTheme} /> : <AuthLayout />} />
            <Route path='/:id' element={<SearchProfile />} />
            <Route path='/findfriends' element={<Search />} />
          </Routes>
        </div>
      </BrowserRouter>: <Lhome/>} 


    </div>
  );
}

export default App;
