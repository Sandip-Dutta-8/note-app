import React, { useState } from 'react'
import Profileinfo from './Profileinfo'
import { useNavigate } from 'react-router-dom'
import Searchbar from './Searchbar';
import toast from 'react-hot-toast';

const Navbar = ({ userInfo, searchNote, handelClearSearch }) => {

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate('/sign-in');
    toast.success("Account Logout")
  }

  const handelSearch = () => {
    if(searchQuery){
      searchNote(searchQuery)
    }
  }

  const onClearSearch = () => {
    setSearchQuery("");
    handelClearSearch();
  }

  return (
    <div className='bg-white flex items-center justify-between py-3 px-3 gap-3 drop-shadow lg:px-12'>
      <h2 className='text-black font-medium text-xl lg:text-2xl py-2'>Notes</h2>

      {userInfo ? <Searchbar 
        value={searchQuery}
        onChange={({target}) => setSearchQuery(target.value)}
        handelSearch={handelSearch}
        onClearSearch={onClearSearch}
      /> : ""}

      {userInfo? <Profileinfo userInfo={userInfo} onLogout={onLogout} /> : ""}
    </div>
  )
}

export default Navbar