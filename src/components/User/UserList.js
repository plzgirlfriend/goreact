import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper, Alert,
} from '@mui/material';
import Logout from './Logout';
import {axiosInstance} from "../Config/axiosConfig";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchUsers = async () => {
        try {
            const response = await axiosInstance.get('/api/user');
            setUsers(response.data);
            // errorMessage 비우기
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Failed to load posts');
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (errorMessage) {
        // return <div>{errorMessage}</div>;
        return <Alert severity="error">{errorMessage}</Alert>;
    }

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                User List

                <Logout/>
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Username</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.username}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default UserList;
