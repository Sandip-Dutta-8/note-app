import React, { useEffect, useState } from 'react'
import Navbar from "../components/Navbar"
import Notecard from '../components/Notecard'
import { MdAdd } from 'react-icons/md'
import AddeditNote from '../components/AddeditNote'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utils/axios'
import moment from "moment"

const Home = () => {

  const [openModal, setOpenModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  })

  const [allNotes, setAllNotes] = useState([])
  const [userInfo, setUserInfo] = useState(null)
  const navigate = useNavigate();

  //get user info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user)
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/sign-in")
      }
    }
  }

  //get all notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      if (response.data && response.data.allNote) {
        setAllNotes(response.data.allNote);
      }
    } catch (error) {
      console.log("An unexpected error occurred");
    }
  }

  // Use useEffect to log when allNotes is updated
  // useEffect(() => {
  //   if (allNotes.length > 0) {
  //     console.log(allNotes);
  //   }
  // }, [allNotes]); // This runs every time `allNotes` is updated

  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => { };
  }, [])


  return (
    <>
      <Navbar userInfo={userInfo} />

      <div className='container mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 mt-10 mx-10'>
          {allNotes.map((value, index) => (
            <Notecard
              key={value._id}
              title={value.title}
              date={moment(value.createdOn).format('Do MMM YYYY')}
              tags={value.tags}
              content={value.content}
              isPinned={value.isPinned}
              onDelete={() => { }}
              onEdit={() => { }}
              onPinNote={() => { }}
            />
          ))}
        </div>
      </div>

      <button className='w-10 h-10 lg:w-16 lg:h-16 flex items-center justify-center bg-primary rounded-full hover:bg-blue-600 fixed right-6 lg:right-10 bottom-10 z-auto'
        onClick={(e) => {
          setOpenModal({ isShown: true, type: 'add', data: null })
        }}>
        <MdAdd className=' text-[25px] lg:text-[32px] text-slate-100' />
      </button>

      <Modal
        isOpen={openModal.isShown}
        ariaHideApp={false}
        onRequestClose={() => { setOpenModal({ isShown: false, type: 'add', data: null }) }}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          },
        }}
        contentLabel=""
        className="w-[90%] lg:w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 z-20"
      >
        <AddeditNote
          type={openModal.type}
          noteData={openModal.data}
          setOpenModal={setOpenModal}
        />
      </Modal>
    </>
  )
}

export default Home
