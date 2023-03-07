import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import axios from 'axios'
import { isEmail, isEmpty, isLength, isMatch } from '../helper/validate';
import OtpForm from './OtpForm';

const initialState = {
    username: '',
    email: '',
    avatar: '',
    password: '',
    cf_password: ''
}

const Register = () => {
    const [imgUrl, setimgUrl] = useState("")
    const [inputVal] = useState("")
    const [otpform, setotpForm] = useState(true)

    
  const [data, setData] = React.useState(initialState)
  const { username, email, avatar, password, cf_password } = data


    const handleChange = (e) => {
        setData({ ...data, avatar: imgUrl, [e.target.name]: e.target.value });

        setimgUrl(`https://api.dicebear.com/5.x/avataaars/svg?seed=${username}`)
        // setimgUrl(`https://api.multiavatar.com/${username}.png`)
        return e.target.value
    }

    const register = async (e) => {
        e.preventDefault()
        //check field
        if (isEmpty(email) || isEmpty(password))
            return alert("Please Fill in all fields")
        //check email
        if (!isEmail(email))
            return alert("Please Enter a Valid Email Address")
        //check password
        if (isLength(password))
            return alert("Password Must be a at least 6 character")
        //check match
        if (!isMatch(password, cf_password))
            return alert("Password did not match")
        try {
            const res = await axios.post("/api/auth/register", {
                username, email, avatar, password, cf_password
            })
            alert(res.data.message)
            setotpForm(false)

        } catch (error) {
            alert(error.response.data.message)
        }
    }


    return (
        <div>
        {otpform ? 
        <>
        <div className='flex justify-center mt-4 '>
            <Avatar alt={inputVal} sx={{ width: 56, height: 56 ,backgroundColor:"grey"}} src={imgUrl} />
            </div>
            <div>
                <div className='mt-5 relative'>
                    <input
                        name='username'
                        placeholder='Name'
                        type='text'
                        onChange={handleChange}
                        className='peer h-10 w-full border-b-2 
                            border-gray-300 placeholder-transparent
                            text-gray-900 focus:outline-none
                            focus:border-rose-600'
                    />
                    <label for="username"
                        className='peer-placeholder-shown:text-base
                            peer-placeholder-shown:text-gray-400
                            peer-placeholder-shown:top-2 transition-all 
                            peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm
                            absolute left-0 -top-3.5 text-gray-600 text-sm'>Name</label>
                </div>
            </div>
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
            <div className='mt-5 relative'>
                <input
                    name='cf_password'
                    placeholder='Confirm Password'
                    type='password'
                    onChange={handleChange}
                    className='peer h-10 w-full border-b-2 
                            border-gray-300 placeholder-transparent
                            text-gray-900 focus:outline-none
                            focus:border-rose-600'
                />
                <label for="cf_password"
                    className='peer-placeholder-shown:text-base
                            peer-placeholder-shown:text-gray-400
                            peer-placeholder-shown:top-2 transition-all 
                            peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm
                            absolute left-0 -top-3.5 text-gray-600 text-sm'>Confirm Password</label>
            </div>
            <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent
                     bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200
                      focus:outline-none focus-visible:ring-2
                     focus-visible:ring-blue-500 focus-visible:ring-offset-2 w-full mt-3"
                     onClick={register}
                  >
                    Next
                  </button>
        </>
        :<OtpForm email={email}/>}
            
        </div>
    )
}

export default Register