import React,{useState,useContext} from "react";
import { GiButterfly } from "react-icons/gi";
import M from 'materialize-css'
import {useNavigate} from 'react-router-dom'
import {UserContext} from '../App'

const Login = () => {

    const {state,dispatch}=useContext(UserContext)
    const navigate=useNavigate();
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")

    const PostData = () => {
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.error) {
                M.toast({ html: data.error, classes: "rounded #ec407a pink lighten-1" });
            } 
            else if (data.user && data.user.username)
             {
                // Ensure the user object and name property exist
                localStorage.setItem("jwt", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                dispatch({ type: "USER", payload: data.user });
                M.toast({ html: "Signed in", classes: "rounded #ec407a pink lighten-1" });
                navigate('/');
            } else {
                console.error("Invalid user data received from server:", data);
                M.toast({ html: "Invalid user data", classes: "rounded #ec407a pink lighten-1" });
            }
        })
        .catch(err => {
            console.error("Error during login:", err);
            M.toast({ html: "Error during login", classes: "rounded #ec407a pink lighten-1" });
        });
    };
    



    return (
        <div className="signup-card">
            <div className="card">
                <div className="authcard">
                    <h2 style={{ fontFamily: "Grand Hotel, cursive", color: "rgb(255, 37, 146)", display: 'inline' }}>Instagram </h2>
                    <div style={{ color: 'rgb(255, 37, 146)', display: 'inline-block' }}>
                        <GiButterfly size="50px" />
                    </div>

                    <input type="text" placeholder="username" 
                    value={username} onChange={e=> setUsername(e.target.value)}
                    />

                    <input type="password" placeholder="password" value={password} 
                    onChange={e=> setPassword(e.target.value)}/>

                    
                    <button className="btn" style={{ backgroundColor: "rgb(255, 37, 146)", color: "white" }}
                     type="submit" name="action" onClick={()=>PostData()}>Login</button>
                </div>

            </div>
        </div>
    )
}

export default Login;