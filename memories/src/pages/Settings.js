import styles from '../styles/settings.module.css'
import {useAuth} from '../hooks'


const Settings = () => {
    const auth =useAuth();
    return <div className={styles.Settings}>
        <div className={styles.imgContainer}>
            <img src='dummy img src' alt=''></img>
        </div>

        <div className={styles.field}>
            <div className={styles.fieldLabel}>Email</div>
            {/* <div className={styles.fieldValue}>{auth.user && auth.user.email ? email : null}</div>  */}
            {/* can be written as below */}
            <div className={styles.fieldValue}>{auth.user?.email}</div>
        </div>

        <div className={styles.field}>
            <div className={styles.fieldLabel}>Name</div>
            {/* <div className={styles.fieldValue}>{auth.user && auth.user.name ? email : null}</div> */}
            <div className={styles.fieldValue}>{auth.user?.Name}</div>
        </div>

        <div className={styles.field}>
            <div className={styles.fieldLabel}>Password</div>
            <input type='password' />
        </div>

        <div className={styles.field}>
            <div className={styles.fieldLabel}>COnfirm Password</div>
            <input type='password' />
        </div>
        <div className='styles.btnGrp'>
            {/* defined in index.css styles will be picked from there */}
            <button className={`button ${styles.editBTn}`}>Edit Profile</button>
        </div>
    </div>
};

export default Settings;