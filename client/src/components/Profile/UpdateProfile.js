import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'
import { CheckIcon } from '@heroicons/react/24/solid'


const UpdateProfile = () => {
  const { user, token, dispatch } = useContext(AuthContext)
  const [url, setUrl] = React.useState("");
  const [thumbnail, setthumbnail] = React.useState("")
  const history = useNavigate()
  const [selectedImage, setSelectedImage] = useState()
  const [uploaded, setUploaded] = useState()

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0])
      setthumbnail(e.target.files[0])
    }
  }

  function redirects() {
    setTimeout(() => {
      history('/profile')
    }, 1000);
  }

  React.useEffect(() => {
    if (url) {
      fetch("/api/auth/user_avatar", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify({
          avatar: url
        })
      }).then(res => res.json())
        .then(data => {
          dispatch({ type: "GET_USER", payload: data.avatar });
          // console.log(data);
          if (data.error) {
            alert('error')
          }
          else {
            alert("Updated user avatar");
          }
        }).catch(err => {
          console.log(err);
        })
    }

  }, [url])


  const updateAvatar = async () => {
    if (thumbnail.size > 393377) {
      alert("Your File is too large")
    }
    else {
      try {
        const data = new FormData()
        data.append("file", thumbnail)
        data.append("upload_preset", "vidmid")
        data.append("cloud_name", "dclmigm1h")
        const res = await axios.post("https://api.cloudinary.com/v1_1/dclmigm1h/image/upload", data, {
          onUploadProgress: (data) => {
            setUploaded(Math.round((data.loaded / data.total) * 100));
          }
        })
        setUrl(res.data.url)

      } catch (error) {
        console.log(error)
      }


    }

  }
  return (
    <div>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
        <div className="lg:col-span-2 ...">
          <div>
            <label>Name</label>
            <input type='text'
              defaultValue={user.username}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-[#ffd000] focus:border-[#ffd000] outline-none block w-full p-3" />
          </div>
          <div>
            <label>About</label>
            <textarea name="Text1" rows="5"
              placeholder='About Me' className="bg-gray-50 border border-gray-300 text-gray-900 
                  text-sm rounded-lg focus:ring-[#ffd000] focus:border-[#ffd000] outline-none block w-full p-3"></textarea>
          </div>
          <div>
            <label>Avatar</label>
            <input type='file' onChange={imageChange} accept='image/png'
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-[#ffd000] focus:border-[#ffd000] outline-none block w-full p-3" />
          </div>
        </div>
        <div className="...">
          {
            selectedImage ? (
              <>
                <div className='flex justify-center mt-5'>
                  <div className='flex'>
                    <img src={URL.createObjectURL(selectedImage)}
                      alt="placeholder" className='h-64 w-64 rounded-full ring-2 ring-amber-600 bg-amber-500' />
                    <div className='flex justify-center lg:justify-end mt-20'>
                      <button className='w-10 h-10 rounded-full bg-lime-500 text-white ring-2 -mx-14 lg:-mx-5
         ring-rose-500 hover:bg-gray-200  hover:text-black' onClick={() => updateAvatar()}><CheckIcon className='h-9 w-9' /></button>
                    </div>

                  </div>
                </div>
                <div className='w-20 text-center mt-3'>
                  {
                    uploaded && (
                      <>
                        <div>
                          <p>{`${uploaded} %`}</p>
                        </div>

                      </>
                    )}
                </div>
              </>


            ) :
              <div class="flex justify-center mt-5">
                <img src={user.avatar}
                  alt="placeholder" className='h-64 w-64 rounded-full ring-2 ring-amber-600 bg-amber-500' />
              </div>
          }

        </div>
      </div>
      <div className='flex justify-center lg:justify-end mt-20'>
        <button className='w-32 h-10 rounded-full  text-rose-500 ring-2 
         ring-rose-500 hover:bg-lime-200'>Update</button>
      </div>


    </div>
  )
}

export default UpdateProfile