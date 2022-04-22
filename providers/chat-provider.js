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
                    console.log("1.1")
                    console.log(state.conversations)
                    console.log(action.payload)
                    let tempoConv = []
                    state.conversations.forEach((conversation) => {
                        if (conversation.roomName == action.payload.roomName) {
                            console.log("1.2")
                            // console.log(action.payload.conversation)
                            let convertConv = conversation.conversation
                            let emptyArr = []
                            console.log(emptyArr)
                            action.payload.conversation.forEach((cov) => {
                                console.log("1.2.1")
                                console.log(cov)
                                emptyArr.push(cov)
                            })
                            console.log("PP")
                            console.log(emptyArr)
                            let emptyAr2 = emptyArr
                            console.log("1.3")
                            console.log(emptyAr2)
                            // conversation.conversation.forEach((cov) => {
                            //     emptyAr2.push(cov)
                            // })
                            // console.log(emptyAr2)
                            // console.log(action.payload.conversation[0])
                            // convertConv.push(action.payload.conversation[0])
                            // console.log(convertConv)

                            let finalConv = conversation
                            finalConv.conversation = convertConv
                            console.log("END_SEND")
                            tempoConv.push(conversation)
                        } else {
                            tempoConv.push(conversation)
                        }
                    })
                    console.log(tempoConv)
                    return state.conversations.map((conversation) => {
                        if (conversation.roomName == action.payload.roomName) {
                            // letak dalam conversation message
                            // const tempCon = conversation
                            // console.log("BEFORE")
                            // console.log(tempCon)
                            // console.log(action.payload.conversation[0])
                            // let tempConv = tempCon.conversation
                            // console.log(tempConv)
                            // tempConv.push(action.payload.conversation[0])
                            // tempCon.conversation = tempConv
                            // console.log("TEMPCON")
                            // console.log(tempCon)
                            // console.log(tempConv)
                            // tempCon.conversation.push(action.payload.conversation[0])
                            // console.log("AFTER")
                            // console.log(tempCon)
                            // console.log("SAMA")
                            return conversation
                        } else {
                            return conversation
                        }
                    })
                } else {
                    console.log("2.1")
                    const tempArr = []
                    tempArr.push(action.payload)
                    console.log(tempArr)
                    return tempArr
                }
            }
            console.log("RETURN ANSWER")

            const setNewChats = newConversations()
            console.log("FINAL_OUTPUT")
            console.log(setNewChats)
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