import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../Config/axiosConfig";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await axiosInstance.post('/api/login', { username, password });

            // 로그인 성공
            if (response.status === 200) {
                const token = response.data.token;

                // 토큰을 로컬 스토리지에 저장
                localStorage.setItem('ACCESS_TOKEN', token);

                // 팝업으로 토큰 표시
                alert(`Login Success! Token: ${token}`);

                // 오류 메시지 비우기
                setErrorMessage('');

                // posts 페이지로 이동
                navigate('/users');
            } else {
                setErrorMessage('Login failed. Please try again.');
            }

        } catch (error) {
            setErrorMessage('Login failed. Please check your username and password.');
            console.error('Login failed: ', error);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
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
                    Login
                </button>
            </form>

            {errorMessage && <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>}
        </div>
    );
};

export default Login;
