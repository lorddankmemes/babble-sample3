import React, { useState, useEffect } from "react";
import ChatListItems from "./ChatListItems";
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import UserProfile from '../userProfile/UserProfile';


const ChatList = () => {
    const [getAllChats, setAllChats] = useState([
        {
            image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
            id: 1,
            name: "Tim Hover",
            active: true,
            isOnline: true,
        },
        {
            image:
                "https://pbs.twimg.com/profile_images/1055263632861343745/vIqzOHXj.jpg",
            id: 2,
            name: "Ayub Rossi",
            active: false,
            isOnline: false,
        },
        {
            image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&usqp=CAU",
            id: 3,
            name: "Hamaad Dejesus",
            active: false,
            isOnline: false,
        },
        {
            image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRZ6tM7Nj72bWjr_8IQ37Apr2lJup_pxX_uZA&usqp=CAU",
            id: 4,
            name: "Eleni Hobbs",
            active: false,
            isOnline: true,
        },
        {
            image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRJo1MiPQp3IIdp54vvRDXlhbqlhXW9v1v6kw&usqp=CAU",
            id: 5,
            name: "Elsa Black",
            active: false,
            isOnline: false,
        },
        {
            image:
                "https://huber.ghostpool.com/wp-content/uploads/avatars/3/596dfc2058143-bpfull.png",
            id: 6,
            name: "Kayley Mellor",
            active: false,
            isOnline: true,
        },
    ]);

    let [isOpen, setIsOpen] = useState(true)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    useEffect(() => {
        setAllChats(getAllChats)
    }, [])

    return (
        <div className='flex-1'>
            <UserProfile />
            <button
                onClick={openModal}
                className={` flex truncate my-4 bg-white w-full border-2 border-blue rounded-lg h-11 p-5 inline-block items-center 'opacity-50 cursor-not-allowed'}`}
            >
                <AiOutlinePlus />
                <span>New Conversation</span>
            </button>

            {/* Popup input */}
            <>
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="fixed inset-0 z-10 overflow-y-auto"
                        onClose={closeModal}
                    >
                        <div className="min-h-screen px-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Dialog.Overlay className="fixed inset-0" />
                            </Transition.Child>

                            {/* This element is to trick the browser into centering the modal contents. */}
                            <span
                                className="inline-block h-screen align-middle"
                                aria-hidden="true"
                            >
                                &#8203;
                            </span>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        New conversation
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-700">
                                            Please input your Metamask CID of your friend to start chatting.
                                        </p>
                                        <div clasName="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" >
                                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Metamask CID" />
                                            </label>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                            onClick={closeModal}
                                        >
                                            Start chat!
                                        </button>
                                    </div>
                                </div>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition>
            </>

            <div className='flex justify-between justify-items-center my-4'>
                <div className='text-2xl font-bold-white'>Chats</div>
            </div>

            <div className="flex justify-center">
                <div className="mb-3 xl:w-96">
                    <div className="input-group relative flex items-stretch w-full mb-4">
                        <input type="search" className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon2" />
                        <button className="btn inline-block px-6 py-2.5 bg-indigo-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-indigo-400 hover:shadow-lg focus:bg-indigo-600  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-600 active:shadow-lg transition duration-150 ease-in-out flex items-center" type="button" id="button-addon2">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex-1 scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300 h-96 overflow-y-scroll">
                <div className='w-full space-y-8'>
                    {getAllChats.map((item, index) => {
                        return (
                            <ChatListItems
                                name={item.name}
                                key={item.id}
                                animationDelay={index + 1}
                                active={item.active ? "active" : ""}
                                isOnline={item.isOnline ? "active" : ""}
                                image={item.image}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default ChatList
