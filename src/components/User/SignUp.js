import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {axiosInstance} from "../Config/axiosConfig";

function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        // axios로 UserController signup 사용
        try {
            const response = await axiosInstance.post('/api/signup', {
                username,
                password
            });

            // status == 200: 성공
            if (response.status === 200) {
                setErrorMessage('');
                alert('SignUp Success!');
                navigate('/login');
            }
        } catch (error) {
            setErrorMessage('SignUp failed');
            console.error('SignUp failed: ', error);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
            <h2>SignUp</h2>
            <form onSubmit={handleSignUp}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Username:</label>
                    <input
                        type="email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '5px' }}
                        required
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '5px' }}
                        required
                    />
                </div>
                <button
                    type="submit"
                    style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}
                >
                    SignUp
                </button>
            </form>
            {errorMessage && <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>}
        </div>
    );
}

export default SignUp;
