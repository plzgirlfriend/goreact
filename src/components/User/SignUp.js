/*

Backend dto: String username, String password

 */

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

        // // axios로 UserController signup 사용
        // try {
        //     const response = await axiosInstance.post('/api/signup', {
        //         username,
        //         password
        //     });
        //
        //     // 회원가입 성공했을 때
        //     if (response.status === 200) {
        //         setErrorMessage('');
        //         alert('SignUp Success!');
        //         navigate('/login');
        //     }
        // } catch (error) {
        //     setErrorMessage('SignUp failed');
        //     console.error('SignUp failed: ', error);
        // }

        await axiosInstance.post(`/api/signup`,{
            // username, password 를 받아옴
            username,
            password
        })
            .then(response => {

                setUsername(response.data.username);
                setPassword(response.data.password);

                setErrorMessage('');
                alert('회원가입에 성공했습니다!');
                navigate('/login');
            })
            .catch(error => {
                setErrorMessage('회원가입에 실패했습니다.');
                console.error('회원가입에 실패했습니다. ', error);
            })
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
            <h2>회원가입</h2>
            <form onSubmit={handleSignUp}>
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
                    회원가입
                </button>
            </form>
            {errorMessage && <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>}
        </div>
    );
}

export default SignUp;
