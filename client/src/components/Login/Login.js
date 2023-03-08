import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { isEmail, isEmpty } from '../helper/validate';
import axios from 'axios'
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';


const initialState = {
  email: '',
  password: ''
}

const Login = () => {
  const [data, setData] = useState(initialState);
  const { email, password } = data;
  const { dispatch } = useContext(AuthContext)

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const login = async (e) => {
    e.preventDefault()
    //check field
    if (isEmpty(email) || isEmpty(password))
      return alert("Please Fill in all fields")
    //check email
    if (!isEmail(email))
      return alert("Please Enter a Validate Email")

    try {
      await axios.post('api/auth/login', { email, password })
      localStorage.setItem('_appSignging', true)
      dispatch({ type: 'SIGNING' })
      alert("Successfully")

    } catch (error) {
      alert(error.response.data.message)
    }
  }

  const clientId = process.env.REACT_APP_G_CLIENT_ID
  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({ clientId: clientId })
    })
  }, [])


  const responseSuccessGoogle = async (res) => {

    const token = res?.tokenId;
    try {
      await axios.post("/api/auth/google_signing", { tokenId: token });
      // console.log(res);
      localStorage.setItem("_appSignging", true);
      dispatch({ type: "SIGNING" });
      // reloadWindow()

    } catch (err) {
      alert(err.response.data.msg)
    }
  };

  const responseErrorGoogle = () => {
    alert("Authentication failed")
  }

  return (
    <div>
      <div>
        <div className='mt-5 relative'>
          <input
            name='email'
            placeholder='Email'
            type='text'
            onChange={handleChange}
            className='peer h-10 w-full border-b-2 
                            border-gray-300 placeholder-transparent
                            text-gray-900 focus:outline-none
                            focus:border-rose-600'
          />
          <label for="email"
            className='peer-placeholder-shown:text-base
                            peer-placeholder-shown:text-gray-400
                            peer-placeholder-shown:top-2 transition-all 
                            peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm
                            absolute left-0 -top-3.5 text-gray-600 text-sm'>Email</label>
        </div>
      </div>
      <div className='mt-5 relative'>
        <input
          name='password'
          placeholder='Password'
          type='password'
          onChange={handleChange}
          className='peer h-10 w-full border-b-2 
                            border-gray-300 placeholder-transparent
                            text-gray-900 focus:outline-none
                            focus:border-rose-600'
        />
        <label for="password"
          className='peer-placeholder-shown:text-base
                            peer-placeholder-shown:text-gray-400
                            peer-placeholder-shown:top-2 transition-all 
                            peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm
                            absolute left-0 -top-3.5 text-gray-600 text-sm'>Password</label>
      </div>

      <button
        type="button"
        className="inline-flex justify-center rounded-md border border-transparent
                     bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200
                      focus:outline-none focus-visible:ring-2
                     focus-visible:ring-blue-500 focus-visible:ring-offset-2 w-full mt-3 shadow-lg shadow-rose-300"
        onClick={login}
      >
        Login
      </button>

      <GoogleLogin
        clientId={process.env.REACT_APP_G_CLIENT_ID}
        render={renderProps => (
          <button className='inline-flex justify-center rounded-md border border-transparent
                     bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200
                      focus:outline-none focus-visible:ring-2
                     focus-visible:ring-blue-500 focus-visible:ring-offset-2 w-full mt-3 shadow-lg shadow-orange-300'
            onClick={renderProps.onClick} disabled={renderProps.disabled}>Google</button>
        )}
        buttonText="Login"
        onSuccess={responseSuccessGoogle}
        onFailure={responseErrorGoogle}
        cookiePolicy={'single_host_origin'}
      />

    </div>
  )
}

export default Login