import React,{useState} from "react";
import { GiButterfly } from "react-icons/gi";
import M from 'materialize-css'
import {useNavigate} from 'react-router-dom'

const Signup = () => {
    const navigate=useNavigate();
    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const PostData=()=>
    {
        fetch("/signup",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"  
            },
            body:JSON.stringify({
                username,
                password,
                email     
            })      
        }).then(res=>res.json())
        .then(data=>
            {
                if(data.error)
                {
                    M.toast({html:data.error,classes:"rounded #ec407a pink lighten-1"})
                }
                else
                {
                    M.toast({html:data.message,classes:"rounded #ec407a pink lighten-1"})
                    navigate('/login');
                }
            })
            .catch(err=>
                {
                    console.log(err)
                });
    }

    return (
        <div className="signup-card">
            <div className="card">
                <div className="authcard">
                    <h2 style={{ fontFamily: "Grand Hotel, cursive", color: "rgb(255, 37, 146)", display: 'inline' }}>Instagram </h2>
                    <div style={{ color: 'rgb(255, 37, 146)', display: 'inline-block' }}>
                        <GiButterfly size="50px" />
                    </div>
                    <input type="text" placeholder="email"
                    value={email} onChange={e=> setEmail(e.target.value)}/>

                   
                    <input type="text" placeholder="username"
                    value={username} onChange={e=>setUsername(e.target.value)}
                    />

                
                    <input type="password" placeholder="password"
                    value={password} onChange={e=>setPassword(e.target.value)}/>


                    <button className="btn" style={{ backgroundColor: "rgb(255, 37, 146)", color: "white" }} 
                    type="submit" name="action" onClick={()=>PostData()}>Sign up</button>
                </div>

            </div>
        </div>
    )
}

export default Signup;