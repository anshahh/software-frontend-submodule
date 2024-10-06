import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, FormControl, FormLabel, Input, Text, Alert, AlertIcon, AlertDescription, Heading, Stack, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  let navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@nitk\.edu\.in$/;
    if (!regex.test(email)) {
      setEmailError("Please enter a valid @nitk.edu.in email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePasswords = () => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return false;
    }
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(email) && validatePasswords()) {
      // Proceed with signup logic
      console.log("Signup attempt with:", email);
      navigate('/login');
    }
  };

  return (
    <Box minH="100vh" display="flex" alignItems="center" flexDirection="column" justifyContent="center" bgGradient="linear(to-b, blue.100, purple.100)" p={4}>
      <Box w="full" maxW="md" mb={6} p={8} bg="white" shadow="md" rounded="md">
        <Box textAlign="center" mb={4}>
        <Image 
            src="src/images/nitk_logo.png" // Replace with your image path
            alt="Logo"
            boxSize="100px" // Adjust the size as needed
            mx="auto" // Center the image horizontally
            mb={4} // Add margin below the image
          />
          <Heading size="lg" color="blue.500">Major Project Guide Allotment Software</Heading>
          <Text size="md">NITK IT Department</Text>
        </Box>
      </Box>
        <Box bg="white" p={8} shadow="md" rounded="md" w="full" maxW="md">
          <Box textAlign="center" mb={4}>
            <Heading size="md">Sign Up</Heading>
            <Text>Create an account to access the NITK Project Allocation System</Text>
          </Box>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="username@nitk.edu.in" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                />
                {emailError && (
                  <Alert status="error" mt={2}>
                    <AlertIcon />
                    <AlertDescription>{emailError}</AlertDescription>
                  </Alert>
                )}
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                <Input 
                  id="confirmPassword" 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                />
                {passwordError && (
                  <Alert status="error" mt={2}>
                    <AlertIcon />
                    <AlertDescription>{passwordError}</AlertDescription>
                  </Alert>
                )}
              </FormControl>
            </Stack>

            <Text mt={6} textAlign="center" fontSize="sm">
              Already have an account? <Link to="/login" style={{ color: "blue.500", textDecoration: "underline" }}>Log in</Link>
            </Text>

            <Button colorScheme="blue" w="full" mt={4} type="submit">Sign Up</Button>
          </form>
        </Box>
    </Box>
  );
}

export default SignupPage;
