import { useRef } from "react";
import styles from "./signup.module.css";
import { NavLink } from "react-router-dom";
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
            <main className={styles.main}>
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
                            <button className={styles.btn_grad}>Submit</button>
                        </form>
                        <div>
                            <p>Already have an account? <NavLink to="/signin" className={styles.link}>Sign In</NavLink></p>
                        </div>
                    </div>

                </div>
            </main>
        </>
    );
}