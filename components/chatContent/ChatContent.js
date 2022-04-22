import React, { useContext, useState, createRef, useEffect } from "react"
import Avatar from "../chatList/Avatar"
import ChatItem from "./ChatItem"
import ChatItemMe from "./ChatItemMe"
import { BsPlusSquare } from "react-icons/bs"
import { FaPaperPlane } from "react-icons/fa"
import { Chat } from "../../providers/chat-provider"

function ChatContent() {

  const chatContext = useContext(Chat)
  const [getMsg, setMsg] = useState()
  const [getChat, setChat] = useState([])

  const chatItms = [
    {
      key: 1,
      image:
        "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
      type: "",
      msg: "Hi Tim, How are you?",
    },
    {
      key: 2,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      type: "other",
      msg: "I am fine.",
    },
    {
      key: 3,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      type: "other",
      msg: "What about you?",
    },
    {
      key: 4,
      image:
        "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
      type: "",
      msg: "Awesome these days.",
    },
    {
      key: 5,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      type: "other",
      msg: "Finally. What's the plan?",
    },
    {
      key: 6,
      image:
        "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
      type: "",
      msg: "what plan mate?",
    },
    {
      key: 7,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      type: "other",
      msg: "I'm taliking about the tutorial",
    },
  ]

  let messagesEndRef = createRef(null)

  useEffect(() => {

    window.addEventListener("keydown", (e) => {
      if (e.keyCode == 13) {
        if (getMsg != "") {
          const tempChatList = getChat
          tempChatList.push({
            key: 1,
            type: "",
            msg: getMsg,
            image:
              "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
          })
          setChat(tempChatList)
          scrollToBottom()
          setMsg("")
        }
      }
    });
    scrollToBottom();

  })

  useEffect(() => {
    setChat(chatItms)
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }

  const onStateChange = (e) => {
    setMsg(e.target.value)
  }

  const sendMessageHandler = () => {
    chatContext.dispatch({
      type: "ADD_CONVERSATION",
      payload: {
        roomName: "room one",
        conversation: [
          {
            message: "hi",
            from: "aiman",
            created_at: "today",
          }
        ]
      }
    })
  }

  return (
    <div className="relative max-h-full h-full bg-white rounded-lg w-full flex flex-col lg:flex hidden" >
      <div className="bg-indigo-600 flex px-3 items-center text-white p-2 text-base rounded-t-lg">
        <Avatar
          isOnline="active"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU"
        />
        <p>Tim Hover</p>
      </div>
      <div className="flex-1 overflow-y-scroll p-5 space-y-5">
        {getChat.map((itm, index) => {
          return itm.type != '' ? (
            <ChatItem
              animationDelay={index + 2}
              key={itm.key}
              user={itm.type}
              msg={itm.msg}
            // image={itm.image}
            />
          ) : (
            <ChatItemMe
              animationDelay={index + 2}
              key={itm.key}
              user={itm.type}
              msg={itm.msg}
            />
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className='flex-none p-5'>
        <div>
          <div className='relative flex w-full'>
            <span className='absolute inset-y-0 flex-items-center'>
              <button type='button' className='inline-flex items-center justify-center rounded-full h-12 w-12 transition dration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:otline-none'>
                <BsPlusSquare className="h-6 w-6 text-gray-600" />
              </button>
            </span>
            <input
              type='text'
              placeholder='type a message here'
              className='w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-400 pl-12 bg-gray-100 rounded-full py-3 pr-5'
              onChange={onStateChange}
              value={getMsg}

            />
            <div className='ml.5'>
              <button
                onClick={sendMessageHandler}
                className='inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-100 ease-in-out text-white bg-indigo-600 hover:bg-indigo-400 focus:outline-none'
              >
                <FaPaperPlane className="h-6 w-6 text-white items-center" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatContent