import React, { useState } from 'react'

import { TrashIcon } from '@heroicons/react/24/solid'

const Comment = () => {
  
    
    return (
        <div>
            <div className='mt-3'>
                <textarea name="Text1" rows="3"
                    placeholder='Comments' className="bg-gray-50 border border-gray-300 text-gray-900 
                text-sm rounded-lg focus:ring-[#ffd000] focus:border-[#ffd000] outline-none block w-full p-3"></textarea>
                
                
            </div>

        </div>
    )
}

export default Comment