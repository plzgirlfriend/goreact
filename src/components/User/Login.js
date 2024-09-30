/*

Backend dto: String username, String password, String error String token

 */

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

        // try {
        //     const response = await axiosInstance.post('/api/login', { username, password });
        //
        //     // 로그인 성공했을 때
        //     if (response.status === 200) {
        //         const token = response.data.token;
        //
        //         // Token을 localStorage에 저장
        //         localStorage.setItem('ACCESS_TOKEN', token);
        //
        //         // 팝업으로 Token 표시
        //         alert(`환영합니다! : ${username}`);
        //
        //         setErrorMessage('');
        //
        //         // posts 페이지로 이동
        //         navigate('/posts');
        //     } else {
        //         alert(`로그인에 실패했습니다`)
        //         setErrorMessage('로그인에 실패했습니다.');
        //     }
        //
        // } catch (error) {
        //     setErrorMessage('Login failed. Please check your username and password.');
        //     console.error('Login failed: ', error);
        // }

        await axiosInstance.post(`/api/login`,{
            username,
            password
        })
            .then(response => {

                setUsername(response.data.username);
                setPassword(response.data.password);

                const token = response.data.token;

                // Token을 localStorage에 저장
                localStorage.setItem('ACCESS_TOKEN', token);

                // 팝업으로 Token 표시
                alert(`로그인에 성공하셨습니다. 환영합니다! ${username}님`);

                setErrorMessage('');

                // posts 페이지로 이동
                navigate('/posts');
            })
            .catch(error => {
                setErrorMessage('로그인에 실패했습니다.');
                console.error('로그안에 실패했습니다. ', error);
            })
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
            <h2>로그인</h2>
            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '10px' }}>
                    <label>아이디:</label>
                    <input
                        type="email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '5px' }}
                        required
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>비밀번호:</label>
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
                    로그인
                </button>
            </form>

            {errorMessage && <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>}
        </div>
    );
};

export default Login;
