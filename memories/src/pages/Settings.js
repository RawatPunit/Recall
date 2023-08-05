import styles from '../styles/settings.module.css'
import {useAuth} from '../hooks'
import { useState } from 'react';
import { useToasts } from 'react-toast-notifications';

//here there was no async i had addedit remenber to rectify 
const Settings = async () => {
    const auth =useAuth(); 
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState(auth.user?.name ? auth.user.name : '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [savingForm, setSavingform] = useState(false);
    const{addToast} = useToasts();
  
    const clearform = () =>{
        setPassword('');
        setConfirmPassword('');
    };

    const updateProfile = async () =>{
        setSavingform(true);

        let error = false;
        if(!name || !password || !confirmPassword)
            addToast('Please fill alll the fields',{
            appearance: 'error'
            })
            
            error = true;
        }

        if(password!== confirmPassword){
            addToast('password and confirm password does not mathch',{
                appearance: 'error'
            });
        
            error = true;
        }

        if(error){
            return setSavingform(false);
        }

        const response = await auth.updateUser(auth.user._id, name,password,confirmPassword);

        if(response.success){
            setEditMode(false)
            setSavingform(false)
            clearform();
            return addToast('user updated successfully',{
                appearance: 'success'
            });
        }else{
            addToast('user updated successfully',{
            appearance: 'error'
        });
        setSavingform(false)
    };
    return (
    <div className={styles.Settings}>
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
            {editMode ? (
            <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                /> 
                /* <div className={styles.fieldValue}>{auth.user && auth.user.name ? email : null}</div> */ 
            ) : (
                <div className={styles.fieldValue}>{auth.user?.name}</div>
            )}
        </div>

                {/* will be open only if in  editmode */}
        {editMode && (
            <>
            <div className={styles.field}>
                <div className={styles.fieldLabel}>Password</div>
                <input type='password' 
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <div className={styles.field}>
                <div className={styles.fieldLabel}>Confirm Password</div>
                <input type='password' 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}/>
            </div>
            </>
        )}

        
        <div className='styles.btnGrp'>
            {/* defined in index.css styles will be picked from there */}
            {editMode ? (
                <>
                    <button className={`button ${styles.editBTn}`} 
                        onclick={updateProfile}
                        disabled ={savingForm} >
                        {savingForm ? 'Saving Profile...' :  'Save Profile' }
                    </button>
                    <button className={`button ${styles.editBTn}`} onclick={()=> setEditMode(false)}> Go back
                    </button>
                </>
            ):(
                 <button className={`button ${styles.editBTn}`}  onclick={()=> setEditMode(true)}>Edit Profile</button>
             )}
        </div>
    </div> );
};

export default Settings;