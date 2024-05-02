import React, { useState } from "react";
import { GiButterfly } from "react-icons/gi";
import { BiUser } from 'react-icons/bi';
import M from 'materialize-css'
import { useNavigate } from 'react-router-dom'

const ChatSupport = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim() !== '') {
            setMessages([...messages, message]);
            setMessage('');
        }
    }

    return (
        <div className="chat" style={{ position: 'fixed', bottom: 0, width: '100%', padding: '10px' }}>

            <div style={{ height: '60vh', overflowY: 'auto' }}>
                {messages.map((msg, index) => (
                    <div key={index} style={{
                        display: 'flex', alignItems: 'center', textAlign: 'left', marginBottom: '5px',
                        marginLeft: '5px', color: 'white', borderRadius: '10px', padding: '8px',
                        maxWidth: '300px', wordWrap: 'break-word',
                        background: 'linear-gradient(to right, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))'
                    }}>
                        <div style={{ color: 'white', marginLeft: '8px', display: 'inline-flex', alignItems: 'center' }}>
                            <BiUser size="18px" />
                        </div>
                        <div style={{ marginLeft: '8px' }}>: {msg}</div>
                    </div>
                ))}
            </div>



            <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={handleMessageChange}
                    style={{ color: 'white', fontWeight: '600', maxWidth: '600px' }}
                />

                <button
                    type="submit"
                    style={{
                        marginLeft: '10px',backgroundColor: 'midnightblue',color: 'white',
                        border: '1px solid white',padding: '8px 12px', borderRadius: '4px',
                        display: 'flex',alignItems: 'center', justifyContent: 'center' 
                    }}>
                    Send
                    <div style={{ color: 'white', marginLeft: '8px' }}> 
                        <GiButterfly size="15px" /> 
                    </div>
                </button>


            </form>
        </div>
    );
}

export default ChatSupport;
