import styles from "./navbar.module.css";
import { NavLink, Outlet } from "react-router-dom";
import logo from "../../images/logo.png";
import { useAuthContext } from "../../authContext";


export default function Navbar(){
    const {isLoggedIn, signOut} = useAuthContext();
    return (
        <>
            <nav className={styles.nav_container}>
                <div className="main-container">
                    <div className={styles.logo}>
                        <NavLink to="/">
                            <img src={logo} alt="logo" />
                        </NavLink>
                    </div>

                    <div className={styles.navLinks}>
                        

                        {isLoggedIn && <NavLink to="/myorder"  className={styles.home}>
                            My Orders
                        </NavLink> }


                        {/* cart link */}
                        {/* show when user is logged in */}
                        {isLoggedIn && <NavLink to="/cart" className={styles.home}>
                            Cart
                        </NavLink> }

                        {isLoggedIn?<NavLink onClick={signOut} className={styles.home}>
                            SignOut
                        </NavLink>:<NavLink to="/signin" className={styles.home}>
                            Signin
                        </NavLink>}


                            
                        
                    </div>
                </div>

            </nav>
            <Outlet />
        </>
    );
}