import { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();

//eslint-disable-next-line react-refresh/onlyexport-components
export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(() => {
        const storedUser = localStorage.getItem("chat-user");
        try {
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (e) {
            console.error("Error parsing stored user data", e);
            return null;
        }
    });

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
};




{/*         Wrong 

import React,{createContext, useState,useContext} from 'react'

export const AuthContext = createContext()

export  const useAuthContext = () =>{
    return useContext(AuthContext)
}

 export const AuthContextProvider = ({children}) =>{

    const [authUser,setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null)

    return (
    <AuthContext.Provider value={{authUser,setAuthUser}}>
        {children}
    </AuthContext.Provider>
    )
}
 */}