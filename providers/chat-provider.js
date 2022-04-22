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

            const newConversations = existChat
                ? state.conversations.map((conversation) => {
                    if (conversation.roomName == action.payload.roomName) {
                        // letak dalam conversation message
                        conversation.conversation.push(action.payload.conversation)
                        return conversation
                    } else {
                        return conversation
                    }
                }
                )
                : [...state.conversations, action.payload];
            return { ...state, conversations: newConversations }
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