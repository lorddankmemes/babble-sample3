
import ChatBody from '../components/chatBody/ChatBody'
import React, { useEffect } from 'react'
import useMatrixOrg from '../services/useMatrix';


export default function Home() {
  const { mStartClient } = useMatrixOrg()

  useEffect(() => {
    mStartClient()
  }, [])

  return (
    <div className='bg-gray-100 dark:bg-gray-800'>
      <div className='flex flex-1 overflow-hidden h-screen max-w-screen-2xl m-auto'>
        <div className='p-12 lg:p-20 w-full'>
          <ChatBody />
        </div>
      </div>
    </div>
  );
}
