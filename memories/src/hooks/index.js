import { useContext, useState } from "react"
import {AuthContext} from '../providers/AuthProvider' // so that we dont to use provider again and aigain
import { login as userLogin } from "../api";

export const useAuth =() => {
    return useContext(AuthContext)
}

export const useProvideAuth = () =>{
    const [user, setUser] = useState(null);         //-----------A (once resp is succes suser will be set)
    const [loading, setLoading] = useState(true);

    const login = async (email,password) => {
        const response = await userLogin (email,password);

        if(response.success){                //------A
            setUser(response.data.user)     // to reatin the data once logged in 
            return {
                success : true
            }
        }else{
            return{
                success: true,
                message : response.message,
            }
        }

    }
    
    const logout =() => {
        setUser(null);
    }
    return {
        user ,
        login ,
        logout,
        loading
    }
}