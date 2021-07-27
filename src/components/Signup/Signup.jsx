import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { CustomLink } from '..';
import logo from '../../assets/logo.png';
import DOMPurify from 'dompurify';
import './Signup.scss';

const { VITE_API_URL } = import.meta.env;

const Signup = () => {
    const usernameInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPWInputRef = useRef();
    const history = useHistory()

    const handleSubmit = async (event) => {
        event.preventDefault()
        const un = DOMPurify.sanitize(usernameInputRef.current.value);
        const email = DOMPurify.sanitize(emailInputRef.current.value);
        const pw = DOMPurify.sanitize(passwordInputRef.current.value);
        const confirmPW = DOMPurify.sanitize(confirmPWInputRef.current.value);
        if (pw !== confirmPW) {
            alert('passwords do not match')
        }
        const formData = new URLSearchParams()
        formData.append("username", un)
        formData.append("email", email)
        formData.append("password", pw)

        try {
            const resp = await fetch(`${VITE_API_URL}/api/auth/signup`, {
                method: "POST",
                mode: "cors",
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                },
                body: formData
            })
            if (resp.status >= 400) throw new Error("400 Error");
            history.replace("/login")
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <>
            <div className="signup-wrapper">
                <form className="signup-form">
                    <h1 className="signup-title">Sign Up</h1>
                    <div className="signup-logo">
                        <img src={logo} />
                        <div className="signup-logo--text">Sample App</div>
                    </div>
                    <div className="signup-fields">
                        <input type="text" id="inputUsername" className="form-control" placeholder="Username" required ref={usernameInputRef} />
                        <input type="text" id="email" className="form-control" placeholder="Email" required ref={emailInputRef} />
                        <input type="password" id="inputPassword" className="form-control" placeholder="Password" required ref={passwordInputRef} />
                        <input type="password" id="confirmPassword" className="form-control" placeholder="Confirm Password" required ref={confirmPWInputRef} />
                    </div>
                    <div className="signup-actions">
                        <button className="btn btn-lg btn-primary btn-block" onClick={handleSubmit} >Sign Up</button>
                        <CustomLink tag="a" to="/login" className="btn btn-lg btn-secondary btn-block">Sign In</CustomLink>
                    </div>
                </form>
            </div>


        </>

    );
}

export { Signup };