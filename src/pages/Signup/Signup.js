import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import style from "./Signup.module.css";
import InputControl from "../../components/InputControl/InputControl";

function Signup() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
  });

  const [setErrorMsg] = useState("");
  const [setSubmitButtonDisabled] = useState(false);

  const handleSubmission = (e) => {
    e.preventDefault();

    if (!values.name || !values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }

    setErrorMsg("");
    setSubmitButtonDisabled(true);

    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name,
        });
        navigate("/");
      })
      .catch((err) => {
        setErrorMsg(err.message);
      })
      .finally(() => {
        setSubmitButtonDisabled(false);
      });
  };

  return (
    <div className={style.register}>
       <div className={style.title}>Ro'yxatdan o'tish</div>
       <form className={style.form} onSubmit={handleSubmission}>
       <InputControl
            label="Name"
            type="text"
            placeholder="Enter your name"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, name: event.target.value }))
            }
          />
           <InputControl
            label="Email"
            type="email"
            placeholder="Enter email address"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, email: event.target.value }))
            }
          />
           <InputControl
            label="Password"
            type="password"
            placeholder="Enter password"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, pass: event.target.value }))
            }
          />
          <button type="submit" className={style.button}>
             Ro'yxatdan o'tish
          </button>
          <p className={style.haveAccount}>
             Akkauntingiz bormi? unda{" "}
             <Link to="/auth/login" className={style.registerLink}>
                bu yerga
             </Link>{" "}
             bosing
          </p>
       </form>
    </div>
 );
}

export default Signup;
