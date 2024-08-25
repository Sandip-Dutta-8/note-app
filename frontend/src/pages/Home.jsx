import React, { useState } from 'react'
import Navbar from "../components/Navbar"
import Notecard from '../components/Notecard'
import { MdAdd } from 'react-icons/md'
import AddeditNote from '../components/AddeditNote'
import Modal from 'react-modal'

const Home = () => {

  const [openModal, setOpenModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  })

  return (
    <>
      <Navbar />

      <div className='container mx-auto'>
        <div className='grid grid-cols-3 gap-4 mt-10 mx-10'>
          <Notecard
            title={"Do coding"}
            date={"24th aug"}
            tags={"#coding"}
            content={"Do coding daily atleast 1hr. Web dev and solve DSA questions from the stiver sheet"}
            isPinned={true}
            onDelete={() => { }}
            onEdit={() => { }}
            onPinNote={() => { }}
          />
          <Notecard
            title={"Do coding"}
            date={"24th aug"}
            tags={"#coding"}
            content={"Do coding daily atleast 1hr. Web dev and solve DSA questions from the stiver sheet"}
            isPinned={true}
            onDelete={() => { }}
            onEdit={() => { }}
            onPinNote={() => { }}
          />
        </div>
      </div>

      <button className='w-16 h-16 flex items-center justify-center bg-primary rounded-full hover:bg-blue-600 fixed right-10 bottom-10 z-10'
        onClick={() => {
          setOpenModal({ isShown: true, type: 'add', data: null })
        }}>
        <MdAdd className='text-[32px] text-slate-100' />
      </button>

      <Modal
        isOpen={openModal.isShown}
        onRequestClose={() => { }}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.2)"
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll" 
      >
        <AddeditNote />
      </Modal>
    </>
  )
}

export default Home