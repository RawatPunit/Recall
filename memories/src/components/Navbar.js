import {Link} from 'react-router-dom';
import styles from '../styles/Navbar.module.css'

const Navbar = () =>{
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
                <div className={styles.user}>
                    <a href='/'>
                        <img src='https://image.flaticon.com/icons/svg/2154/2154651.svg' alt='' className={styles.userDp}/>
                    </a>
                    <span>Punit</span>
                </div>
                <div className={styles.navLinks}>
                    <ul>
                        <li>
                            <Link to='/Login'>Log In</Link>
                        </li>
                        <li>
                            <a href='/'>Log Out</a>
                        </li>
                        <li>
                            <a href='/'>Register</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Navbar;