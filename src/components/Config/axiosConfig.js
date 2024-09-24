/*

기본 URL: Spring Server localhost/80800
JSON type
get Token(refreshToken 구현 x)

 */

import axios from "axios";

const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN"); // 토큰을 로컬 스토리지에서 불러옴
const TOKEN_TYPE = "Bearer"; // 일반적으로 JWT 토큰의 타입은 Bearer입니다.

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${TOKEN_TYPE} ${ACCESS_TOKEN}`,
    },
});

// 요청 인터셉터를 통해 매번 헤더에 토큰을 자동으로 추가할 수 있게 설정
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("ACCESS_TOKEN");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
