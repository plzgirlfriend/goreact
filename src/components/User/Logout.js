import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // 로컬 스토리지에서 JWT 삭제
        localStorage.removeItem('accessToken');
        localStorage.removeItem('tokenType');

        // 로그아웃 후 로그인 페이지로 리다이렉트
        navigate('/login');
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
}

export default Logout;
