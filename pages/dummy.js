import React from 'react'

function Dummy() {
  return (
    <div className='bg-gray-100 dark:bg-gray-800'>
      <div className='flex flex-1 overflow-hidden h-screen max-w-screen-2xl m-auto'>
        <div className='p-12 lg:p-20 w-full'>
          <div className='max-h-full h-full flex flex-row'>

            {/* left sidebar start */}
            <aside className='w-full lg:w-2/6 bg-white rounded-lg mr-5'>
              <div className='max-w-full h-full w-full flex flex-col'>
                <div className='flex p-10 justify-between'>
                  <div className='text-4xl font-semibold-white'>
                    Chat
                  </div>

                  {/* switcher start */}
                  <div>
                    <button id='theme-toggle' type='button' className='text-gray-500 text-sm p-2.5'>
                      {/* sun icon start */}
                      {/* button toggle */}
                      <svg id='theme-toggle-dark-icon' className='w-5 h-5 hidden' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M17.293 13.293AB 8 0 016.707 2.707a8 8.001 0 1010.586 10.586z'></path>
                      </svg>
                      {/* sun icon end */}
                      {/* moon icon start */}
                      <svg id='theme-toggle-dark-icon' className='w-5 h-5 hidden' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.46' fillRule='evenodd' clipRule={"evenodd"}></path>
                      </svg>
                      {/* moon icon end */}
                    </button>
                  </div>
                  {/* switcher end */}
                </div>
                {/* user section start */}
                <div className='flex-1 overflow-y-scroll scrollbar-thumb-color dark:scrollbar-thumb-color-dark'>
                  <div className='w-full space-y-10'>
                    {/* user */}
                    <div className='cursor-pointer flex px-10'>
                      <div className='mr-4 relative w-12'>
                        <img className='rounded-full w-full mr-2' src='https://i.pravatar.cc/300?img=3' />
                      </div>
                      <div className='w-3 h-3 bg-green-500 rounded-full absolute bottom-0 right-0'></div>
                      <div className='flex flex-col flex-1'>
                        <div className='flex justify-between items-center'>
                          <div className='text-gray-800 text-base font-semibold'>James Bone</div>
                          <div className='text-gray-700 text-xs'>
                            17:31
                          </div>
                        </div>
                        <div className='text-gray-400 text-sm'>
                          How are you around?
                        </div>
                      </div>
                    </div>
                    <div className='cursor-pointer flex px-10'>
                      <div className='mr-4 relative w-12'>
                        <img className='rounded-full w-full mr-2' src='https://i.pravatar.cc/300?img=4' />
                      </div>
                      <div className='w-3 h-3 bg-green-500 rounded-full absolute bottom-0 right-0'></div>
                      <div className='flex flex-col flex-1'>
                        <div className='flex justify-between items-center'>
                          <div className='text-gray-800 text-base font-semibold'>James Bone</div>
                          <div className='text-gray-700 text-xs'>
                            17:31
                          </div>
                        </div>
                        <div className='text-gray-400 text-sm'>
                          How are you around?
                        </div>
                      </div>
                    </div>
                    {/* end user */}
                  </div>
                </div>
              </div>
            </aside>
            {/* left sidebar end */}

            {/* right section start */}
            <section className='relative max-h-full bg-white rounded-lg w-full flex flex-col lg:flex hidden'>
              {/* all message start */}
              <div id='allmessanges' className='flex-1 overflow-y-scroll p-5 scrollbar-thumb-color space-y-5'>
                {/* left message start */}
                <div className='flex justify-start'>
                  <div className='w-14 mr-5'>
                    <img className='rounded-full w-full mr-2' src='https://i.pravatar.cc/300?img=4' />
                  </div>
                  <div className='flex flex-col space-y-5 text-left'>
                    <div>
                      <span className='bg-gray-100 text-gray-900 p-5 text-base rounded-r-lg rounded-b-lg inline flex max-w-xl'>How are you?</span>
                    </div>
                  </div>
                </div>
                {/* left message end */}

                {/* right message start */}
                <div className='flex justify-end'>
                  <div className='space-y-5 text-right'>
                    <div className='bg-indigo-800 text-white p-5 text-base rounded-l-lg rounded-b-lg inline-block max-w-xl'>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five centuries,
                      but also the leap into electronic typesetting,
                      remaining essentially unchanged.
                    </div>
                  </div>
                </div>
                {/* right message end */}
              </div>
              {/* all message end */}
              <div className='flex-none p-5'>
                <div>
                  <div className='relative flex'>
                    <span className='absolute inset-y-0 flex-items-center'>
                      <button type='button' className='inline-flex items-center justify-center rounded-full h-12 w-12 transition dration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:otline-none'>
                        {/* icon smile */}
                        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='crrentColor' className='h-6 w-6 text-gray-600'>
                          <path strokeLinecap="round" strokeLinejoin='rond' strokeWidth={2} d='M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 011'></path>
                        </svg>
                      </button>
                    </span>
                    <input type='text' placeholder='type here...' className='w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-400 pl-12 bg-gray-100 rounded-full py-3 pr-5' />
                    <div className='ml.5'>
                      <button className='inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-100 ease-in-out text-white bg-indigo-800 focus:outline-none'>
                        {/* send icon */}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* right section start */}
          </div>
        </div>
      </div>



    </div>
  )
}

export default Dummy