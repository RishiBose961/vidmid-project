import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { isEmpty } from '../helper/validate';

const initialState = {
    otp: '',
    email: '',
}


const OtpForm = (props) => {
    const history = useNavigate()

    function getLogin() {
        history("/")
    }

    const [data, setData] = React.useState(initialState)
    const { otp, email } = data


    const handleChange = (e) => {
        setData({ ...data,email:props.email ,[e.target.name]: e.target.value });
        console.log(email);
    }

    
    const verify = async (e) => {
        e.preventDefault()
        //check field
        if (isEmpty(otp) || isEmpty(email))
            return alert("Please Fill in all fields")
        try {
            await axios.post("/api/auth/activation", {
                otp, email
            })
            alert("Verify successful")
            getLogin()

        } catch (error) {
            alert(error.response.data.message)
        }
    }

    return (
        <div>
            <div className='mt-5 relative'>
                <input
                    name='otp'
                    placeholder='ENTER YOUR OTP'
                    type='password'
                    onChange={handleChange}
                    className='peer h-10 w-full border-b-2 
                            border-gray-300 placeholder-transparent
                            text-gray-900 focus:outline-none
                            focus:border-rose-600'
                />
                <label for="otp"
                    className='peer-placeholder-shown:text-base
                            peer-placeholder-shown:text-gray-400
                            peer-placeholder-shown:top-2 transition-all 
                            peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm
                            absolute left-0 -top-3.5 text-gray-600 text-sm'>ENTER YOUR OTP</label>
            </div>
            <button
                    type="button"
                    onClick={verify}
                    className="inline-flex justify-center rounded-md border border-transparent
                     bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200
                      focus:outline-none focus-visible:ring-2
                     focus-visible:ring-blue-500 focus-visible:ring-offset-2 w-full mt-3"
                 
                  >
                    Register
                  </button>
        </div>
    )
}

export default OtpForm