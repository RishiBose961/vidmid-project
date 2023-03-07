import React from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from '../../layout/AuthLayout'
import photo from '../Image/android-chrome-512x512.png'

const Header = () => {
    return (
        <>
            <nav className='mb-2'>
                <div className='flex justify-between mx-2 lg:justify-around mt-3'>
                <Link to='/'>
                <div className='text-xl font-bold inline-flex cursor-pointer'>
                        <img src={photo} alt='loading' className='h-12' />
                        <p className='mt-2 mx-2 text-2xl'>VidWit</p>
                    </div>
                </Link>
                    
                    <div>
                        <AuthLayout/>
                    </div>
                </div>
            </nav>
            <hr/>
        </>


    )
}

export default Header