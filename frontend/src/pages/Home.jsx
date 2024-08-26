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
        <div className='grid grig-cols-1 lg:grid-cols-3 gap-4 mt-10 mx-10'>
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