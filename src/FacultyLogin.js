import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import './FacultyLogin.css';

function FacultyLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState('');

    const handleLogin = async () => {
        console.log('Logging in:', email, password);
        try {
            const response = await fetch('/login-faculty', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (data.success) {
                navigate('/faculty-page');
            } else {
                setSuccessMessage("Wrong credentials");
            }
        } catch (error) {
            console.error('Error during login:', error);
        } // Use useNavigate to navigate
    };

    return (
        <div className="faculty-login-container">
            <h1 className="faculty-login-title">Faculty Login</h1>
            <input 
                type="email" 
                className="faculty-login-input"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Email"
            />
            <input 
                type="password" 
                className="faculty-login-input"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Password"
            />
            <div>{successMessage && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p>{successMessage}</p>
        </div>)}</div>
            <button className="faculty-login-button" onClick={handleLogin}>Login</button>
        </div>
    );
}    

export default FacultyLogin;
