import { Container, Typography, TextField, Button } from '@mui/material';
import { useState } from 'react';

function SignupBox({ onSwitch }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = () => {
    if (!/^[a-zA-Z]+[a-zA-Z0-9.]*@[a-zA-Z]+\.[a-zA-Z]+\.[a-zA-Z]{2,}$/.test(username))
      alert('Invalid email id');
    else if (password !== confirmPassword) {
      alert('Passwords do not match!');
    } else {
      console.log('Username:', username);
      console.log('Password:', password);
      console.log('Confirm Password:', confirmPassword);
      onSwitch();
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '1rem' , marginBottom: '1rem'}}>
      {/* Header Section with Logo, College Name, and Page Title */}
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
          src="src\images\nitk_logo.png" // Replace with your logo path
          alt="NITK Logo"
          style={{ width: '80px', marginBottom: '1rem' , marginTop: '1rem'}}
        />
        <Typography variant="h3" sx={{ fontSize: '30px', fontFamily: 'Arial, sans-serif', color: '#555' }}>
          Major Project Allotment Software
        </Typography>
      </Container>

      {/* Sign-Up Form */}
      <Typography
    component="div"
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      height: 'auto', // Adjust height as needed
      borderRadius: '8px',
      opacity: '.7',
      padding: '2rem', // Add padding to increase size
      width: '100%',   // Increase width to take full container width
      maxWidth: '800px', // You can set a max-width for larger screens
      margin: '0 auto', // Center it horizontally
    }}
  >
    <h1 style={{ fontFamily: 'Arial, sans-serif', color: '#333', fontSize: '3rem' , marginBottom: '1.5rem'}}>Sign Up</h1>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
        width: '100%',  // Take full width of the container
        maxWidth: '600px', // Max width for the form fields
      }}
    >
      <TextField
        label="NITK email"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginBottom: '16px', width: '100%' }} // Adjust width for form fields
      />

      <TextField
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginBottom: '16px', width: '100%' }} // Adjust width for form fields
      />

      <TextField
        label="Confirm Password"
        type="password"
        variant="outlined"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        style={{ marginBottom: '16px', width: '100%' }} // Adjust width for form fields
      />

      <a href="#!" onClick={onSwitch} style={{ marginBottom: '16px' }}>
        Already have an account? Login
      </a>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSignup}
        style={{ width: '100%' }} // Adjust width for button
      >
        Sign Up
      </Button>
    </div>
  </Typography>
    </Container>
  );
}

export default SignupBox;