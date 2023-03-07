import { Avatar } from '@mui/material'
import React, { useState } from 'react'
import SearchResult from './SearchResult'

const Search = () => {
    const [search, setSearch] = useState('')
    const [userSearch, setUserSearch] = useState([])

    const fetchUsers = (query) => {
        setSearch(query)
        fetch('/api/auth/searchuser', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query
            })
        }).then(res => res.json())
            .then(results => {
                setUserSearch(results.user)
            })
    }
    return (
        <div>
            <div className='mt-12'>
                <input type='text'
                    name='search'
                    value={search}
                    onChange={(e) => fetchUsers(e.target.value)}
                    placeholder='Search'
                    className="bg-transparent border border-gray-300 dark:text-white
                 text-gray-900 text-sm rounded-lg focus:ring-[#ffd000] focus:border-[#ffd000] 
                 outline-none block w-full p-3" />
            </div>
            <div>
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-3">
                    <div class="..."></div>
                    <div class="...">
                        {
                            search.length > 0 ? <SearchResult userSearch={userSearch} /> :
                                <div className='flex justify-center'>
                                    <p className='mt-3 font-semibold text-[20px]'>Search to Found Think</p>
                                </div>

                        }
                        
                    </div>
                    <div class="..."></div>
                </div>
            </div>
        </div>
    )
}

export default Search