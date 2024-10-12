// import React, { useState } from 'react';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';
// import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

// const ResetPassword = () => {
//     const location = useLocation();
//     const [token, setToken] = useState('');
//     const [newPassword, setNewPassword] = useState('');
//     const [message, setMessage] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [error, setError] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setMessage('');
//         setError('');

//         try {
//             await axios.post('http://localhost:8082/api/user/reset-password', { token, newPassword });
//             setMessage('Password has been successfully reset.');
//         } catch (err) {
//             setError('Error resetting password.');
//         }
//     };

//     return (
//         <div className="container">
//             <h2>Reset Password</h2>
//             <Form onSubmit={handleSubmit}>
//                 <FormGroup>
//                     <Label for="newPassword">New Password</Label>
//                     <Input
//                         type="password"
//                         name="newPassword"
//                         id="newPassword"
//                         value={newPassword}
//                         onChange={(e) => setNewPassword(e.target.value)}
//                         required
//                     />
//                 </FormGroup>

//                 <FormGroup>
//                     <Label for="confirmPassword">Re-Enter New Password</Label>
//                     <Input
//                         type="password"
//                         name="confirmPassword"
//                         id="confirmPassword"
//                         value={confirmPassword}
//                         onChange={(e) => setConfirmPassword(e.target.value)}
//                         required
//                     />
//                 </FormGroup>

//                 <FormGroup>
//                     <Label for="token">Token</Label>
//                     <Input
//                         type="text"
//                         name="token"
//                         id="token"
//                         value={token}
//                         onChange={(e) => setToken(e.target.value)}
//                         required
//                     />
//                 </FormGroup>



//                 <Button type="submit" color="primary">Reset Password</Button>
//             </Form>
//             {message && <Alert color="success">{message}</Alert>}
//             {error && <Alert color="danger">{error}</Alert>}
//         </div>
//     );
// };

// export default ResetPassword;


import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

const ResetPassword = () => {
    const [formData, setFormData] = useState({
        token: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (formData.newPassword !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            await axios.post('http://localhost:8082/api/user/reset-password', {
                token: formData.token,
                newPassword: formData.newPassword,
            });
            setMessage('Password has been successfully reset.');
            
            setFormData({
                token: '',
                newPassword: '',
                confirmPassword: ''
            });
        } catch (err) {
            setError('Error resetting password.');
        }
    };

    return (
        <div className="container">
            <h2>Reset Password</h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="newPassword">New Password</Label>
                    <Input
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="confirmPassword">Re-Enter New Password</Label>
                    <Input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="token">Token</Label>
                    <Input
                        type="text"
                        name="token"
                        id="token"
                        value={formData.token}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>

                <Button type="submit" color="primary" className='mb-3'>Reset Password</Button><br/>

                <Button type="button" color="primary" href="/login" className='mb-3'>Back to Login</Button>
            </Form>
            {message && <Alert color="success">{message}</Alert>}
            {error && <Alert color="danger">{error}</Alert>}
        </div>
    );
};

export default ResetPassword;

