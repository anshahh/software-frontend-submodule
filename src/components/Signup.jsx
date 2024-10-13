// src/components/Signup.jsx

import React, { useState } from "react";
import { 
  Box, 
  Button, 
  FormControl, 
  FormLabel, 
  Input, 
  Heading, 
  Text, 
  Stack, 
  Alert, 
  AlertIcon, 
  AlertDescription, 
  ButtonGroup 
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../report_submission/helpers/firebase"; // Corrected relative import
import { Link } from "react-router-dom";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState(null);
  const [authError, setAuthError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  /**
   * Validate the email format to ensure it matches @nitk.edu.in
   */
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@nitk\.edu\.in$/;
    if (!regex.test(email)) {
      setAuthError("Please enter a valid @nitk.edu.in email address");
      return false;
    }
    setAuthError("");
    return true;
  };

  /**
   * Handle form submission for user sign-up.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");

    // Validate email format
    if (!validateEmail(email)) {
      return;
    }

    // Validate password match
    if (password !== confirmPassword) {
      setAuthError("Passwords do not match.");
      return;
    }

    // Validate role selection
    if (!userType) {
      setAuthError("Please select your role (Faculty/Student).");
      return;
    }

    try {
      setIsLoading(true);
      await signupUser(email, password, userType);
      console.log("Signup successful.");
      alert("Signup successful! Please check your email to verify your account.");
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      setAuthError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box 
      minH="100vh" 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      bgGradient="linear(to-b, blue.100, purple.100)" 
      p={4}
    >
      {/* Top Container with Image */}
      <Box 
        w="full" 
        maxW="md" 
        mb={6} 
        p={8} 
        bg="white" 
        shadow="md" 
        rounded="md"
      >
        <Box textAlign="center" mb={4}>
          <img 
            src="src/images/nitk_logo.png" // Ensure the image is placed in public/images/
            alt="Logo"
            style={{ width: '100px', margin: '0 auto 16px' }}
          />
          <Heading size="lg" color="blue.500">Sign Up</Heading>
          <Text>Create an account to access the Project Allocation System</Text>
        </Box>
      </Box>

      {/* Signup Form */}
      <Box 
        w="full" 
        maxW="md" 
        p={8} 
        bg="white" 
        shadow="md" 
        rounded="md"
      >
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            {/* User Type Selection */}
            <Box textAlign="center">
              <FormLabel>Select Your Role</FormLabel>
              <ButtonGroup isAttached>
                <Button
                  colorScheme={userType === "faculty" ? "blue" : "gray"}
                  onClick={() => setUserType("faculty")}
                  variant={userType === "faculty" ? "solid" : "outline"}
                >
                  Faculty
                </Button>
                <Button
                  colorScheme={userType === "student" ? "blue" : "gray"}
                  onClick={() => setUserType("student")}
                  variant={userType === "student" ? "solid" : "outline"}
                >
                  Student
                </Button>
              </ButtonGroup>
            </Box>

            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="username@nitk.edu.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormControl>
          </Stack>

          {authError && (
            <Alert status="error" mt={4}>
              <AlertIcon />
              <AlertDescription>{authError}</AlertDescription>
            </Alert>
          )}

          <Text mt={6} textAlign="center" fontSize="sm">
            Already have an account?{" "}
            <Link to="/login" style={{ color: "blue.500", textDecoration: "underline" }}>
              Log in
            </Link>
          </Text>

          <Button 
            colorScheme="blue" 
            w="full" 
            mt={4} 
            type="submit" 
            isLoading={isLoading}
          >
            Sign Up
          </Button>
        </form>
      </Box>
    </Box>
  );
}
