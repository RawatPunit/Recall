import { useState } from 'react';
import styles from '../styles/login.module.css';
import { useToasts } from 'react-toast-notifications';

const Login =  () => {
    const [email, setEmail] = useState('');
    const [loggingIn, setLoggingIn] = useState(false);
    const [password, setPassword] = useState('');
    const {addToast} = useToasts;
    const handleSubmit = (e) =>{
      e.preventDefault();     //as soon as we sbmt the frm prevent it  from reloading the page
      setLoggingIn(true);

      if(!email || !password){
          return addToast('Please Enter both email and Password'),{
          appearance  : 'error',
        }
      }
    }

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

      <div className={styles.field} disabled={loggingIn}> 
        <button>
          {loggingIn ? 'Logging In...' : 'Log In' } 
        </button>
      </div>
    </form>
  };

  export default Login;