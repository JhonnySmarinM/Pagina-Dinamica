import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThreeDots } from 'react-loader-spinner';
import styled from 'styled-components';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [isRegistering, setIsRegistering] = useState(false);
    const [password2, setPassword2] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    const toggleShowPassword = () => setShowPassword(!showPassword);
    const toggleShowPassword2 = () => setShowPassword2(!showPassword2);
    const toogleLogin = () => {
        setIsChangingPassword(false);
        setIsRegistering(false);
    };

    const handleLogin = () => {
        setLoading(true);
        axios.post('https://login-1k91.onrender.com/api/v1/token/', { email, password })
        .then(response => {
            const { access } = response.data;
            localStorage.setItem('token', access);
            setToken(access);
            toast.success('Success login 🎉');
            setTimeout(() => {
                window.location.href = '/FormData';
            }, 1500);
        })
        .catch(error => {
            toast.error('Error in login 😞');
        })
        .finally(() => setLoading(false));
    };

    const handleRegister = () => {
        if (password !== password2) {
            toast.error('Passwords do not match ❌');
            return;
        }
        
        setLoading(true);
        axios.post('https://login-1k91.onrender.com/api/v1/register/', { email, username, password, password2 })
        .then(() => {
            toast.success('Registration successful! 🎉');
            setTimeout(() => setIsRegistering(false), 1500);
        })
        .catch(error => {
            toast.error('Error in registration ❌');
        })
        .finally(() => setLoading(false));
    };

    const handlePasswordChange = async () => {
        if (password !== password2) {
            toast.error('Passwords do not match ❌');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.get(`https://login-1k91.onrender.com/api/v1/register/`);
            const users = response.data;

            if (!users.length) {
                throw new Error('User not found');
            }

            const user = users.find(user => user.email === email);
            if (!user) {
                throw new Error('User not found');
            }

            const payload = {
                email: user.email,  // Asegúrate de obtener estos valores correctamente
                username: user.username,
                password,
                password2
            };
            console.log('Sending PUT request to:', `https://login-1k91.onrender.com/api/v1/register/${user.id}/`);
            console.log('Payload:', JSON.stringify(payload));

            await axios.put(`https://login-1k91.onrender.com/api/v1/register/${user.id}/`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            toast.success('Password changed successfully! 🎉');
            setIsChangingPassword(false);
            setIsRegistering(false);
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
            toast.error(error.response?.data?.message || error.message || 'Error changing password ❌');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
            <ToastContainer position="top-right" autoClose={2000} />
            
            { isChangingPassword ? (
                <>
                    <Title>Change Password</Title>
                    <InputWrapper>
                        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </InputWrapper>
                    <InputWrapper>
                        <Input type={showPassword ? 'text' : 'password'} placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <Icon onClick={toggleShowPassword}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </Icon>
                    </InputWrapper>
                    <InputWrapper>
                        <Input type={showPassword2 ? 'text' : 'password'} placeholder="Confirm New Password" value={password2} onChange={(e) => setPassword2(e.target.value)} />
                        <Icon onClick={toggleShowPassword2}>
                            {showPassword2 ? <FaEyeSlash /> : <FaEye />}
                        </Icon>
                    </InputWrapper>
                    <Button onClick={handlePasswordChange} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {loading ? <ThreeDots color="#fff" height={20} width={50} /> : 'Change Password'}
                    </Button>
                    <Text>
                        <LinkText onClick={toogleLogin}>Back to Login</LinkText>
                    </Text>
                </>
            ) : isRegistering ? (
                <>
                    <h2>Register</h2>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        style={inputStyle} 
                    />
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        style={inputStyle} 
                    />
                    
                    <div style={{ position: 'relative', width: '80%', maxWidth: '400px' }}>
                        <input 
                            type={showPassword ? 'text' : 'password'} 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            style={{ ...inputStyle, width: '100%' }} 
                        />
                        <span 
                            style={eyeIconStyle} 
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? '🙈' : '👁️'}
                        </span>
                    </div>

                    <div style={{ position: 'relative', width: '80%', maxWidth: '400px' }}>
                        <input 
                            type={showPassword2 ? 'text' : 'password'} 
                            placeholder="Confirm Password" 
                            value={password2} 
                            onChange={(e) => setPassword2(e.target.value)} 
                            style={{ ...inputStyle, width: '100%' }} 
                        />
                        <span 
                            style={eyeIconStyle} 
                            onClick={() => setShowPassword2(!showPassword2)}
                        >
                            {showPassword2 ? '🙈' : '👁️'}
                        </span>
                    </div>

                    <button onClick={handleRegister} style={buttonStyle}>
                        {loading ? <ThreeDots color="#fff" height={20} width={50} /> : 'Register'}
                    </button>

                    <button onClick={() => setIsRegistering(false)} style={buttonStyleGray}>
                        Back to Login
                    </button>
                </>
            ) : (
                <>
                    <h2>Login</h2>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        style={inputStyle} 
                    />
                    
                    <div style={{ position: 'relative', width: '80%', maxWidth: '400px' }}>
                        <input 
                            type={showPassword ? 'text' : 'password'} 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            style={{ ...inputStyle, width: '100%' }} 
                        />
                        <span 
                            style={eyeIconStyle} 
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? '🙈' : '👁️'}
                        </span>
                    </div>

                    <button onClick={handleLogin} style={buttonStyle}>
                        {loading ? <ThreeDots color="#fff" height={20} width={50} /> : 'Login'}
                    </button>

                    <button onClick={() => setIsRegistering(true)} style={buttonStyleGray}>
                        Register
                    </button>

                    {/* Added link to change password */}
                    <Text>
                        <LinkText onClick={() => setIsChangingPassword(true)}>
                            Change Password?
                        </LinkText>
                    </Text>
                </>
            )}
        </div>
    );
};

const inputStyle = {
    margin: '10px 0', 
    padding: '10px', 
    width: '80%', 
    maxWidth: '400px', 
    color: 'black'
};

const buttonStyle = {
    margin: '10px 0', 
    padding: '10px', 
    width: '80%', 
    maxWidth: '400px', 
    backgroundColor: 'blue', 
    color: 'white', 
    border: 'none', 
    cursor: 'pointer'
};

const buttonStyleGray = {
    margin: '10px 0', 
    padding: '10px', 
    width: '80%', 
    maxWidth: '400px', 
    backgroundColor: 'gray', 
    color: 'white', 
    border: 'none', 
    cursor: 'pointer'
};

const eyeIconStyle = {
    position: 'absolute', 
    right: '10px', 
    top: '50%', 
    transform: 'translateY(-50%)', 
    cursor: 'pointer', 
    fontSize: '18px'
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const AuthBox = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 350px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 94%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #2563eb;
  }
`;

const Button = styled.button`
  background-color: #2563eb;
  color: white;
  padding: 12px;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s ease;
  &:hover {
    background-color: #1e40af;
  }
`;

const Text = styled.div`
  font-size: 0.9rem;
  color: #555;
  margin-top: 10px;
`;

const LinkText = styled.span`
  color: #2563eb;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  width: 20%;
  margin-bottom: 10px;
`;

const Icon = styled.span`
  position: absolute;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;

export default Auth;
