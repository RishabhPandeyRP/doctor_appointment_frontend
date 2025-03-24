"use client"

import { createContext , useContext, useState, ReactNode, useEffect } from "react"
import Cookies from "js-cookie"

interface AuthContextInterface{
    username : string | null;
    login : (username:string , token:string)=>void;
    logout: ()=>void;
    token:string | null;
}

const AuthContext = createContext<AuthContextInterface | undefined>(undefined);

export const AuthProvider = ({children} : {children : ReactNode})=>{
    const [username , setUsername] = useState<string | null>(null)
    const [token , setToken] = useState<string | null>(null);

    useEffect(()=>{
        const cookieToken = Cookies.get("token")
        const cookieUsername = Cookies.get("username")

        if(cookieToken && cookieUsername ){
            setToken(cookieToken)
            setUsername(cookieUsername)
        }
        else{
            setToken(null)
            setUsername(null)
        }
    },[])
    
    const login = (token:string , username:string)=>{
        Cookies.set("token" , token , {expires:1})
        Cookies.set("username" , username , {expires:1})
        setUsername(username)
        setToken(token)
    }

    const logout = ()=>{
        Cookies.remove("token")
        Cookies.remove("username")
        setUsername(null)
        setToken(null)
    }
    return(
        <AuthContext.Provider value={{username, token , login ,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = ()=>{
    const context = useContext(AuthContext)
    if(!context){
        throw new Error("UseAuth error")
    }
    return context
}