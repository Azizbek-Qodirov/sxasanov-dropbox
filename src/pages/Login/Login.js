import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

import style from './Login.module.css';
import InputControl from '../../components/InputControl/InputControl';

function Login() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = (e) => {
    e.preventDefault();
    
    if (!values.email || !values.password) {
      setErrorMsg('Fill all fields');
      return;
    }

    setErrorMsg('');
    setSubmitButtonDisabled(true);

    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((res) => {
        setSubmitButtonDisabled(false);
        navigate('/home');
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  return (
    <div className={style.login}>
       <div className={style.title}>Tizimga kirish</div>
       <form className={style.form} onSubmit={handleSubmission}>
          <InputControl
            label="Email"
            placeholder="Enter email address"
            type="email"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, email: event.target.value }))
            }
          />
           <InputControl
            label="Password"
            type="password"
            placeholder="Enter password"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, password: event.target.value }))
            }
          />
          <button type="submit" className={style.button}>
             Tizimga kirish
          </button>
          <p className={style.haveAccount}>
             Akkauntingiz yo’qmi? unda{" "}
             <Link to="/auth/register" className={style.registerLink}>
                ro'yxatdan o'ting
             </Link>
          </p>
       </form>
    </div>
 );
}

export default Login;
