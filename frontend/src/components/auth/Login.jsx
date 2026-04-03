import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import {PageHeader} from "@primer/react";
import {Button, Box} from "@primer/react";
import { useAuth } from "../../authContext";
import { Link } from "react-router-dom";

import logo from "../../assets/github-mark-white.svg";
import "./auth.css"

const Login = () => {

    // useEffect(() => {
    //     localStorage.removeItem("token");
    //     localStorage.removeItem("userId");
    //     setCurrentUser(null);
    // },[]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [currentUser, setCurrentUser] = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const res = await axios.post("http://localhost:3000/login", {
                email:email,
                password:password
            });
            
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.userId);

            setCurrentUser(res.data.userId);
            setLoading(false);

            window.location.href = "/";
        } catch (err) {
            console.error(err);
            alert("Signup failed!");
            setLoading(false);
        };
    }


    return (
        <div className="login-wrapper">
            <div className="login-logo-container">
                <img className="logo-login" src={logo} />
            </div>
            <div className="login-box-wrapper">
                <div className="login-heading">
                    <div sx={{ padding: 1}}>
                        <PageHeader.TitleArea variant="large">
                            <PageHeader.Title>Sign In</PageHeader.Title>
                        </PageHeader.TitleArea>
                    </div>
                </div>
                <div className="login-box">
                    <div>
                        <label htmlFor="" className="label">Email address</label>
                        <input 
                            type="email"
                            autoComplete="off"
                            name="Email"
                            id="Email"
                            className="input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="div">
                        <label className="label">Password</label>
                        <input 
                            type="password"
                            autoComplete="off"
                            name="Password"
                            id="Password"
                            className="input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <Button
                        variant="primary"
                        className="login-btn"
                        disabled={loading}
                        onClick={handleLogin}
                    >
                        {loading ? "Loading..." : "Login"}
                    </Button>
                </div>

                <div className="pass-box">
                    <p>
                        New to Github ? <Link to="/signup">Create Account</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
export default Login;