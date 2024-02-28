import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {db} from "./firebaseInit";
import bcrypt from "bcryptjs";


const authContext = createContext();

export function useAuthContext(){
    return useContext(authContext);
}

export function AuthProvider({children}){
    const [userList, setUserList] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userLoggedIn, setUserLoggedIn] = useState(null);

    useEffect(()=>{
        onSnapshot(collection(db, "buy-busy"), (snapshot)=>{
            const users = snapshot.docs.map((doc) => {
                return {
                    id:doc.id,
                    ...doc.data()
                }
            });
            setUserList(users);
        })
    },[isLoggedIn]);


    async function hashPassword(password) {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    }
    
    const createUser = async (data)=>{
        const hashedPassword = await hashPassword(data.password);
        await addDoc(collection(db, "buy-busy"),{
            name: data.name,
            email: data.email,
            password: hashedPassword,
            cart:[],
            order:[],
        }); 
        toast.success("Account created successfully!");
    }

    const signin = async (data)=>{
        const index = userList.findIndex((user) => user.email === data.email);
        if(index===-1){
            toast.error("Invalid email or password");
            return false;
        }
        const passwordMatch = await bcrypt.compare(data.password, userList[index].password);
        if(!passwordMatch){
            toast.error("Incorrect Password");
            return false;
        }
        toast.success("Login Successful");
        setUserLoggedIn(userList[index]);
        setIsLoggedIn(true);
        window.localStorage.setItem("token", true);
        window.localStorage.setItem("user", JSON.stringify(userList[index]));
        return true;
    }


    const signOut = ()=>{
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("user");

        setUserLoggedIn(null);
        setIsLoggedIn(false);
        toast.success("signed out Successfully");
        
        
    }
     



    return (
        <authContext.Provider value={{createUser, signin, signOut, isLoggedIn, userLoggedIn}}>
            <ToastContainer />
            {children}
        </authContext.Provider>
    )
}
