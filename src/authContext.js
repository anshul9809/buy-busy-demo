import { collection, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import {db} from "./firebaseInit";
import {bcrypt } from "bcryptjs";

import {ToastContainer, toast} from "react-toastify";
import { setLogLevel } from "firebase/app";

const authContext = createContext();

export function useAuth(){
    return useContext(authContext);
}

export function AuthContext({children}){
    const [userList, setuserList] = useState([]);

    const [userLoggedIn, setUserLoggedIn] = useState(null);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(()=>{
        const unsub = onSnapshot(collection(db,"busybuy"), (snapshot)=>{
            const userd = snapshot.docs.map((doc)=>{
                return {
                    id: doc.id,
                    ...doc.data()
                };
            });
        });
    },[isLoggedIn]);
    async function createUser(data){
        const index = userList.findIndex((user)=>user.email===data.email);
        if(index===-1){
            toast.error("email already exist, Please Sing in");
            return;
        }
        
        async function hashPassword(password) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            return hashedPassword;
        }


        const docref = await addDoc(collection(db, "busybuy"),{
            name: data.name,
            email:data.email,
            password:hashPassword,
            cart:[],
            orders:[]
        });
    }
    async function signInUser(data){
        const user = userList.findIndex((user)=user.email === data.email);
        if(user===-1){
            toast.error("email does not exist, Please Sign up");
            return;
        }

        async function comparePassword(password, dbpassword){
            return await bcrypt.compare(password, dbpassword);
        }

        const passwordMatch = await bcrypt.compare(data.password, user.password);

        if(!passwordMatch){
            toast.error("wrong username/password");
            return;
        }
        toast.success("singed in successfully");
        setUserLoggedIn(userList[user]);
        setIsLoggedIn(true);
        window.localStorage.setItem("token",true);
        window.localStorage.setItem("index",JSON.stringify(userList[user]));
        return true;
    }
    function signOut(){
        window.localStorage.removeItem("index");
        window.localStorage.removeItem("token");
        setIsLoggedIn(false);
        setUserLoggedIn(null);
        toast.success("signed out successfully");
    }


    return (
        <>
            <authContext.Provider value={
                {
                    createUser,
                    signInUser,
                    signOut,
                    userLoggedIn,
                    setUserLoggedIn,
                    isLoggedIn,
                    setUserLoggedIn
                }
            }>
                <ToastContainer />
                {children}

            </authContext.Provider>
        </>
    );
}