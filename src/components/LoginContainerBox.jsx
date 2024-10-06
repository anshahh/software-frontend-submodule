import { Container, Typography, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

function LoginContainerBox({ onSwitch, onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 

    const handleLogin = () => {
        console.log('Username:', username);
        console.log('Password:', password);

        if (username && password) {
            onLogin();
            navigate('/'); 
        } else {
            alert('Please enter valid credentials');
        }
    };

    
    return (
        <Container maxWidth="sm">
            <Container
        style={{
          display: 'flex',
          flexDirection: 'row',        // Align items in a row
          justifyContent: 'space-between', // Space between logo and title
          alignItems: 'center',        // Vertically align items in the center
          backgroundColor: 'white',
          padding: '1rem',
          borderRadius: '8px',
          opacity: '.8',
          marginBottom: '2rem',
        }}
      >
        <img
          src="/src/images/nitk_logo.png" // Replace with your logo path
          alt="NITK Logo"
          style={{ width: '80px', marginBottom: '1rem' , marginTop: '1rem'}}
        />
        <Typography variant="h3" sx={{ fontSize: '30px', fontFamily: 'Arial, sans-serif', color: '#555' }}>
          Major Project Allotment Software
        </Typography>
      </Container>
            <Typography
                component="div"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    height: '60vh',
                    borderRadius: '8px',
                    opacity: '.7',
                }}
            >
                <h1 style={{ fontFamily: 'Arial, sans-serif', color: '#333' , fontSize : '3rem', marginTop: '1.5rem'}}>Login</h1>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexGrow: 1,
                        width: 600,
                    }}
                >
                    <TextField
                        label="NITK email"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ marginBottom: '16px', width: '80%' }}
                    />

                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ marginBottom: '16px', width: '80%' }}
                    />

                    <a href="#!" onClick={onSwitch} style={{ marginBottom: '16px' }}>
                        Don't have an account? Create one
                    </a>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleLogin} 
                        style={{ width: '80%' }}
                    >
                        Login
                    </Button>
                </div>
            </Typography>
        </Container>
    );
}

export default LoginContainerBox;