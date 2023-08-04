import { useState } from 'react';
import styles from '../styles/login.module.css';
import { useToasts } from 'react-toast-notifications';

import { useAuth } from '../hooks';

const Login =  () => {
    const [email, setEmail] = useState('');
    const [loggingIn, setLoggingIn] = useState(false);
    const [password, setPassword] = useState('');
    const {addToast} = useToasts;
    const auth = useAuth();

    const handleSubmit = async (e) =>{
      e.preventDefault();     //as soon as we sbmt the frm prevent it  from reloading the page
      setLoggingIn(true);

      if(!email || !password){
          return addToast('Please Enter both email and Password',{
          appearance  : 'error',
        });
      }
    

    const response = await auth.login(email,password);
    if(response.success){
       addToast('Successfully Logged in',{
        appearance  : 'success',
      }); 
    } else{
      return addToast(response.message,{
      appearance  : 'error'
      });
    }

    setLoggingIn(false);
  };

    return <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Log In</span>

      <div className={styles.field}>
        <input 
        type="email"
        placeholder="Email"
        value={email} 
        onChange={(e) => setEmail(e.target.value)}/>
      </div>

      <div className={styles.field}>
        <input type="password" placeholder="password"
        value={password} 
        onChange={(e) => setPassword(e.target.value)}/>
      </div>

      <div className={styles.field} > 
        <button disabled={loggingIn}>
          {loggingIn ? 'Logging In...' : 'Log In' } 
        </button>
      </div>
    </form>
  };

  export default Login;