import {Link} from 'react-router-dom';
import styles from '../styles/Navbar.module.css'
import { useAuth } from '../hooks';

const Navbar = () =>{
    const auth =useAuth();
    return (
        <div className={styles.nav}>
            //two divs for left part and the right part
            <div className={styles.leftDiv}>
                {/* link to '/' --> Home  */}
                <Link to='/'>           
                    <img alt='' src='https://ninjasfiles.s3.amazonaws.com/0000000000003454.png'/>
                </Link>
            </div>
            <div className={styles.rightNav}>
                {auth.user && <div className={styles.user}>
                    {/* once user clicks on avatar icon redirect to settings */}
                    <Link to='/settings'>           
                        <img src='https://image.flaticon.com/icons/svg/2154/2154651.svg' 
                        alt=''
                        className={styles.userDp}/>
                    </Link >
                    {/* //using auth user name willb be shown when logged in */}
                    <span>{auth.user.name}</span>           
                </div>}
                <div className={styles.navLinks}>
                    <ul>
                    {auth.user ?    (
                        <>
                            <li>
                                <button onClick={auth.logout}>Log Out </button>
                            </li>
                        </>
                        ) : (
                        <>
                            <li>
                                <Link to='/Login'>Log In</Link>
                            </li>
                        
                            <li>
                                <Link to='/register'>Register</Link>
                            </li>
                        </>
                    )}
                        
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Navbar;