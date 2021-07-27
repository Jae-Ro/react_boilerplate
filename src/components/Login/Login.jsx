import React, { useRef, useContext } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { CustomLink } from '../';
import { AuthContext } from '../../common/utils';
import logo from '../../assets/logo.png'
import DOMPurify from 'dompurify';
import './Login.scss';

const { VITE_API_URL } = import.meta.env;

const Login = () => {
    const usernameInputRef = useRef();
    const passwordInputRef = useRef();
    const history = useHistory()
    const { setAuth, isAuthenticated, setUser, setIsLoading } = useContext(AuthContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const resp = await fetch(`${VITE_API_URL}/api/auth/login`, {
                method: "POST",
                mode: "cors",
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                },
                body: new URLSearchParams(`username=${DOMPurify.sanitize(usernameInputRef.current.value)}&password=${DOMPurify.sanitize(passwordInputRef.current.value)}`)
            })
            if (resp.status >= 400) throw new Error("400 Error");
            const payload = await resp.json()
            setUser(DOMPurify.sanitize(payload))
            setAuth(true)
            history.push("/app/dashboard")

        } catch (err) {
            console.log(err.message)
        }
    }
    return (
        <>
            {
                isAuthenticated
                    ? <Redirect to='/app/dashboard' />
                    : <div className="login-wrapper">
                        <form className="login-form">
                            <h1 className="login-title">Login</h1>
                            <div className="login-logo">
                                <img src={logo} />
                                <div className="login-logo--text">Sample App</div>
                            </div>
                            <div className="login-fields">
                                <input type="text" id="inputUsername" className="form-control" placeholder="Username" required ref={usernameInputRef} />
                                <input type="password" id="inputPassword" className="form-control" placeholder="Password" required ref={passwordInputRef} />
                            </div>
                            <div className="login-actions">
                                <button className="btn btn-lg btn-primary btn-block" onClick={handleSubmit} >Sign in</button>
                                <CustomLink tag="a" to="/signup" className="btn btn-lg btn-secondary btn-block">Sign Up</CustomLink>
                            </div>
                        </form>
                    </div>
            }
        </>
    );
}

export { Login };