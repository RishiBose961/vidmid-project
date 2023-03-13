import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'

import { TrashIcon } from '@heroicons/react/24/solid'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";


const CreatePost = () => {
  const history = useNavigate()
  const { token } = useContext(AuthContext)
  const [selects, setSelect] = useState([])
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("")
  const [category, setcategory] = useState("")
  const [thumnail, setThumnail] = useState("")
  const [description, setDescription] = useState("")

  const [selectedImage, setSelectedImage] = useState()
  const [uploaded, setUploaded] = useState()


  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0])
      setThumnail(e.target.files[0])
    }
  }


  useEffect(() => {
    fetch('https://mocki.io/v1/1327fac2-089f-4d8a-83db-c89612b40bb8')
      .then((res) => res.json())
      .then((data) => setSelect(data))
  }, [])

  const removeHandle = () => {
    setSelectedImage()
  }

  useEffect(() => {
    if (url) {

      fetch("/api/auth/createimagepost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify({
          title,
          category,
          images: url
        })
      }).then(res => res.json())
        .then(data => {
          // console.log(data);
          if (data.error) {
            alert("Something went wrong")
          }
          else {
            redirects()
            alert(`Successfully created ${title}`)
          }
        }).catch(err => {
          console.log(err);
        })
    }

  }, [url])


  function redirects() {
    setTimeout(() => {
      history('/')
    }, 3000);
  }


  const postDetails = async () => {
    try {
      const data = new FormData()
      data.append("file", thumnail)
      data.append("upload_preset", "vidmid")
      data.append("cloud_name", "dclmigm1h")
      const res = await axios.post("https://api.cloudinary.com/v1_1/dclmigm1h/image/upload", data, {
        onUploadProgress: (data) => {
          setUploaded(Math.round((data.loaded / data.total) * 100));
        }
      })
      setUrl(res.data.url)

      // console.log(data);
    } catch (error) {
      console.log(error)
    }


  }




  return (
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="col-span-2 mt-4">
        <div>
          <label>Title</label>
          <input type='text'
            placeholder='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#ffd000] focus:border-[#ffd000] outline-none block w-full p-3" />
        </div>
        <div className='mt-4'>
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setcategory(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#ffd000] focus:border-[#ffd000] outline-none block w-full p-3">
            {
              selects.map((req) => {
                return (
                  <option value={req.title}>{req.title}</option>
                )
              })
            }

          </select>
        </div>

        <div className='mt-4'>
          <label>Image To Upload</label>
          <input type='file'
            accept='image/png,image/jpeg'
            onChange={imageChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#ffd000] focus:border-[#ffd000] outline-none block w-full p-3" />
        </div>
        {/* remove image */}
        <div className='flex justify-end space-x-2 mt-5'>
          <div>
            {
              selectedImage ? <button onClick={removeHandle}>
                <TrashIcon className='bg-amber-400 w-14 h-14 rounded-full hover:bg-gray-300' />
              </button> : ""
            }
          </div>
          <div>
            {
              selectedImage ?
                <button onClick={() => postDetails()}
                  className='bg-rose-400 w-32 rounded-2xl h-14 hover:bg-gray-300 hover:text-black'>
                  Upload

                </button> : ""
            }
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
        </div>



      </div>


      <div class="mt-10 relative">


        {
          selectedImage ? (
            <div className='flex justify-center'>
              <img src={URL.createObjectURL(selectedImage)} className='h-[316px] w-[459px] rounded-lg mb-4 bg-slate-300 object-cover absolute' />
            </div>


          ) :
            <img src="https://images.unsplash.com/photo-1678273114528-bd3ad3267030?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0MHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
              alt="loading" className='h-[316px] w-[459px] rounded-lg mb-4' />

        }
        {
          uploaded && (


            <div className='flex justify-center mt-20'>
              <Progress
                type="circle"
                percent={uploaded}

              />
            </div>
          )}


      </div>

    </div>
  )
}

export default CreatePost