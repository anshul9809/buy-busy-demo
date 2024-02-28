import { useRef } from "react";
import styles from "./signup.module.css";
import { useAuthContext } from "../../authContext";
export default function SignUp(){
    const nameRef=useRef();
    const emailRef=useRef();
    const passwordRef=useRef();
    
    const {createUser} = useAuthContext();

    function handleSubmit(event){
        event.preventDefault();
        const data = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value 
        };
        createUser(data);
    }
    return (
        <>
            <main>
                <div className={styles.container}>
                    <div className={styles.inputForm}>
                        {/* heading */}
                        <h1>SignUp</h1>
                        {/* form to get user's data */}
                        <form onSubmit={handleSubmit}>
                            {/* for name */}
                            <input type="text" 
                                placeholder="Name" 
                                required
                                ref={nameRef} />
                            {/* for email */}
                            <input type="email" 
                                placeholder="Enter Email"
                                required 
                                ref={emailRef}/>
                            {/* for password */}
                            <input type="password" 
                                placeholder="Enter Password"
                                required
                                ref={passwordRef} />
                            {/* submit button */}
                            <button>Submit</button>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}