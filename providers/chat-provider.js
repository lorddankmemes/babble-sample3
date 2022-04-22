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
            console.log("ENTERING FUNCTION")
            console.log(state.conversations)
            const existChat = state.conversations.find(
                (conversation) => conversation.roomName == action.payload.roomName
            )
            console.log(existChat)
            const newConversations = () => {
                if (existChat) {
                    // return state.conversations.map((conversation) => {
                    //     if (conversation.roomName == action.payload.roomName) {
                    //         // letak dalam conversation message
                    //         const tempCon = conversation
                    //         console.log("BEFORE")
                    //         console.log(tempCon)
                    //         tempCon.conversation.push(action.payload.conversation[0])
                    //         console.log("AFTER")
                    //         console.log(tempCon)
                    //         return conversation
                    //     } else {
                    //         return conversation
                    //     }
                    // })
                    console.log("ADD")
                    return state.conversations
                } else {
                    console.log("ELSE STATEMENT")
                    const tempArr = []
                    tempArr.push(action.payload)
                    console.log(tempArr)
                    return tempArr
                }
            }
            console.log("RETURN ANSWER")
            // const newConversations = existChat
            //     ? state.conversations.map((conversation) => {
            //         if (conversation.roomName == action.payload.roomName) {
            //             // letak dalam conversation message
            //             const tempCon = conversation
            //             console.log("BEFORE")
            //             console.log(tempCon)
            //             tempCon.conversation.push(action.payload.conversation[0])
            //             console.log("AFTER")
            //             console.log(tempCon)
            //             return conversation
            //         } else {
            //             return conversation
            //         }
            //     }) : [action.payload]
            // console.log("UPDATED_CONVERSATION")
            // console.log(newConversations)
            return { ...state, conversations: newConversations() }
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