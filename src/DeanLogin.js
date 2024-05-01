import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DeanLogin.css';


function DeanLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState('');

    const handleLogin = async () => {
        console.log('Logging in:', email, password);
        try {
            const response = await fetch('/login-dean', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (data.success) {
                navigate('/main');
            } else {
                setSuccessMessage("Wrong credentials");
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="dean-login-container">
            <h1 className="dean-login-title">Dean Login</h1>
            <input 
                type="email" 
                className="dean-login-input"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Email"
            />
            <input 
                type="password" 
                className="dean-login-input"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Password"
            />
            <div>{successMessage && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p>{successMessage}</p>
        </div>)}</div>
            <button className="dean-login-button" onClick={handleLogin}>Login</button>
        </div>
    );
}    

export default DeanLogin;
