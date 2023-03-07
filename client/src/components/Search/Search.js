import { Avatar } from '@mui/material'
import React from 'react'

const Search = () => {
    return (
        <div>
            <div className='mt-12'>
                <input type='text'
                    placeholder='Search'
                    className="bg-transparent border border-gray-300 dark:text-white
                 text-gray-900 text-sm rounded-lg focus:ring-[#ffd000] focus:border-[#ffd000] 
                 outline-none block w-full p-3" />
            </div>
            <div>
                <div class="grid grid-cols-3 gap-4 mt-3">
                    <div class="..."></div>
                    <div class="...">
                    <div className='inline-flex mt-2 text-left'>
                                        <Avatar className='mt-2 ring-amber-600 bg-amber-500' alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                        <div className='mx-2'>
                                            <p className='font-bold text-lg'>rohit raoy</p>
                                            <p>rohit</p>
                                        </div>

                                    </div>

                    </div>
                    <div class="..."></div>
                </div>
            </div>
        </div>
    )
}

export default Search