import { createContext, useReducer } from 'react';

export const User = createContext();


const initialState = {
    access_token: "",
    public_address: "",
    amount: 0.0,
}

function reducer(state, action) {
    switch (action.type) {
        case 'SET_ACCESS_TOKEN':
            localStorage.setItem('access_token', action.payload)
            return { ...state, access_token: action.payload }
        case 'SET_PUBLIC_ADDRESS':
            localStorage.setItem('public_address', action.payload)
            return { ...state, public_address: action.payload }
        case 'SET_AMOUNT':
            localStorage.setItem('amount', action.payload)
            return { ...state, amount: action.payload }
        case 'CLEAR_USER_PROVIDER':
            localStorage.removeItem('access_token')
            localStorage.removeItem('public_address')
            localStorage.removeItem('amount')
            return {
                ...state,
                access_token: "",
                public_address: "",
                amount: 0.0,
            }
        default:
            return state
    }
}

export function UserProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };
    return <User.Provider value={value}>
        {props.children}
    </User.Provider>;
}