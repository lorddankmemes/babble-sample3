import { createContext, useReducer } from 'react';

export const Chat = createContext();


const initialState = {
    rooms: [],
    conversations: []
}

function reducer(state, action) {
    switch (action.type) {
        case 'SET_ROOMS':
            return { ...state, rooms: action.payload }
        case 'ADD_CONVERSATION': {
            const existChat = state.conversations.find(
                (conversation) => conversation.roomName == action.payload.roomName
            )
            const newConversations = () => {
                if (existChat) {
                    return state.conversations.map((conversation) => {
                        if (conversation.roomName == action.payload.roomName) {
                            // letak dalam conversation message
                            const tempCon = conversation
                            let tempConv = tempCon.conversation
                            tempConv.push(action.payload.conversation[0])
                            tempCon.conversation = tempConv
                            return tempCon
                        } else {
                            return conversation
                        }
                    })
                } else {
                    const tempArr = []
                    tempArr.push(action.payload)
                    return tempArr
                }
            }

            const setNewChats = newConversations()
            console.log(setNewChats)
            setNewChats.map((c) => {
                c.conversation.map((con) => {
                    console.log("HER")
                })
            })
            return { ...state, conversations: setNewChats }
        }
        case 'CLEAR_CHAT_PROVIDER':
            return {
                rooms: [],
            }
        default:
            return state
    }
}

export function ChatProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };
    return <Chat.Provider value={value}>
        {props.children}
    </Chat.Provider>;
}

// conversations: [
//     {
//         roomName: "",
//         conversation: [
//             {
//                 message: "",
//                 from: "",
//                 created_at: "",
//             }
//         ]
//     }
// ]