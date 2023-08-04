import { createContext } from "react";

import { useProvideAuth } from "../hooks";

const initialState = {
    user : null,
    login: () => {},
    logout: () => {},
    loading: true,
    signUp: () => {}
}

export const AuthContext = createContext(initialState)

export const AuthProvider = ({ children }) => {
    const auth = useProvideAuth();  //state managed by custom hook useprovideAuthso that value={auth} will be available to all the children

    return <AuthContext.Provider value ={auth} >{children}</AuthContext.Provider> //this state is managed above useProvideAuth
}