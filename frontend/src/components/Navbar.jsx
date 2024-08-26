import React, { useState } from 'react'
import Profileinfo from './Profileinfo'
import { useNavigate } from 'react-router-dom'
import Searchbar from './Searchbar';

const Navbar = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const onLogout = () => {
    navigate('/sign-in');
  }

  const handelSearch = () => {

  }

  const onClearSearch = () => {
    setSearchQuery("");
  }

  return (
    <div className='bg-white flex items-center justify-between py-3 px-3 gap-3 drop-shadow lg:px-12'>
      <h2 className='text-black font-medium text-2xl py-2'>Notes</h2>

      <Searchbar 
        value={searchQuery}
        onChange={({target}) => setSearchQuery(target.value)}
        handelSearch={handelSearch}
        onClearSearch={onClearSearch}
      />

      <Profileinfo onLogout={onLogout} />
    </div>
  )
}

export default Navbar