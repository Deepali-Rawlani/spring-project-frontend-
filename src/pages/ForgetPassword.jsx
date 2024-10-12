import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            await axios.post('http://localhost:8082/api/user/forget-password', { email });
            setMessage('Password reset link has been sent to your email.');
            navigate("/resetpassword");
        } catch (err) {
            setError('Error sending password reset link.');
        }
    };

    return (
        <div className="container">
            <h2>Forgot Password</h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </FormGroup>
                <Button type="submit" color="primary">Send Reset Link</Button>
            </Form>
            {message && <Alert color="success">{message}</Alert>}
            {error && <Alert color="danger">{error}</Alert>}
        </div>
    );
};

export default ForgetPassword;
