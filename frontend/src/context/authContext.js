import React, { useEffect } from "react";
import { useState } from "react";
import { createContext, useContext } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { auth } from "../firebase";
import { async } from "@firebase/util";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("There is no auth provider");
  return context;
};

export function AuthProvider({ children }) {


  const [user,setUser]= useState(null);
  const [loading, setLoading]=useState(true);
  
  const signup = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const login = async (email, password) => 
    signInWithEmailAndPassword(auth,email,password);

    const logout = () => signOut(auth);
    
  useEffect(()=>{
    onAuthStateChanged(auth,currenUser =>{
      setUser(currenUser)
      setLoading(false);
    })
  }, [])

  
  return (
    <authContext.Provider value={{ signup, login, user, logout, loading }}>
      {children}
    </authContext.Provider>
  );
}