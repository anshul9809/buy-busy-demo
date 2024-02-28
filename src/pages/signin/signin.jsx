import styles from "../signup/signup.module.css";
import { createRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../authContext";
export default function SignIn(){
    const emailRef = createRef();
    const passwordRef = createRef();
    const {signin} = useAuthContext();
    const navigate = useNavigate();

    function handleSubmit(event){
        event.preventDefault();
        const data = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        const result = signin(data);
        result?navigate("/"):navigate("/signin");
        
    }
    return (
        <>
            <main className={styles.main}>
            <div className={styles.container}>
            
            <div className={styles.inputForm}>
                {/* heading */}
                <h1>SignIn</h1>
                {/* form */}
                <form onSubmit={handleSubmit}>
                    {/* email */}
                    <input type="email" 
                        placeholder="Enter Email" 
                        required
                        ref={emailRef} />

                    <br />
                    {/* password */}
                    <input type="password" 
                        placeholder="Enter Password"
                        required
                        ref={passwordRef} />
                    <br />
                    {/* submit button */}
                    <button className={styles.btn_grad}>Submit</button>
                </form>
                <br /> 
                <span>or &nbsp;</span>
                {/* link for signup page */}
                <p>Don't have an account? &nbsp;
                <NavLink to="/signup" className={styles.link}>
                    Create
                </NavLink>
                </p>
                
            </div>
            
        </div>
            </main>
        </>
    );
}