import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentLogin.css';


function StudentLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState('');

    const handleLogin = async () => {
        console.log('Logging in:', email, password);
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (data.success) {
                navigate('/student-page');
            } else {
                setSuccessMessage("Wrong credentials");
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="student-login-container">
            <h1 className="student-login-title">Student Login</h1>
            <input 
                type="email" 
                className="student-login-input"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Email"
            />
            <input 
                type="password" 
                className="student-login-input"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Password"
            />
            <div>{successMessage && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p>{successMessage}</p>
        </div>)}</div>
            <button className="student-login-button" onClick={handleLogin}>Login</button>
            
        </div>
        
        
    );
}

export default StudentLogin;
