// src/components/Login.jsx

import { useState } from "react";
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
import { loginUser } from "../report_submission/helpers/firebase"; // Corrected relative import
import { useAdminContext } from '../context/AdminContext';
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [authError, setAuthError] = useState("");
  const [userType, setUserType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  const { setAdminUser } = useAdminContext();

  /**
   * Validate the email format to ensure it matches @nitk.edu.in
   */
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@nitk\.edu\.in$/;
    if (!regex.test(email)) {
      setEmailError("Please enter a valid @nitk.edu.in email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  /**
   * Handle form submission for user login.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");

    // Validate input fields
    if (validateEmail(email) && userType && password) {
      try {
        setIsLoading(true);
        console.log("Attempting login with:", email, userType);
        const fetchedUserType = await loginUser(email, password);
        
        if (userType === fetchedUserType) {
          setAdminUser(userType);
          console.log("Login successful:", email, userType);
          
          if (userType === "faculty") {
            navigate('/faculty-home'); // Navigate to faculty home
          } else if (userType === "student") {
            navigate('/student-home'); // Navigate to student home
          }
        } else {
          setAuthError("User type does not match our records.");
        }
      } catch (error) {
        console.error("Login error:", error);
        setAuthError(error.message); // Display the specific error message
      } finally {
        setIsLoading(false);
      }
    } else if (!userType) {
      setAuthError("Please select your role (Faculty/Student)");
    } else if (!password) {
      setAuthError("Please enter your password.");
    }
  };

  /**
   * Handle resending the email verification link.
   */
  const handleResendVerification = async () => {
    try {
      setIsLoading(true);
      const user = auth.currentUser;
      if (user && !user.emailVerified) {
        await sendEmailVerification(user);
        alert("Verification email resent. Please check your inbox.");
      }
    } catch (error) {
      console.error("Error resending verification email:", error);
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
          <Heading size="lg" color="blue.500">Major Project Guide Allotment Software</Heading>
          <Text size="md">NITK IT Department</Text>
        </Box>
      </Box>

      {/* Login Form */}
      <Box 
        w="full" 
        maxW="md" 
        p={8} 
        bg="white" 
        shadow="md" 
        rounded="md"
      >
        <Box textAlign="center" mb={4}>
          <Heading size="md">Login</Heading>
          <Text>Enter your NITK credentials to access the Project Allocation System</Text>
        </Box>

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
              <FormLabel>Password</FormLabel>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
          </Stack>

          {authError && (
            <Alert status="error" mt={4}>
              <AlertIcon />
              <AlertDescription>{authError}</AlertDescription>
            </Alert>
          )}

          {/* Resend Verification Email Button */}
          {authError === "Please verify your email before logging in." && (
            <Button 
              colorScheme="teal" 
              w="full" 
              mt={4} 
              onClick={handleResendVerification}
              isLoading={isLoading}
            >
              Resend Verification Email
            </Button>
          )}

          <Text mt={6} textAlign="center" fontSize="sm">
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "blue.500", textDecoration: "underline" }}>
              Sign up
            </Link>
          </Text>

          <Button 
            colorScheme="blue" 
            w="full" 
            mt={4} 
            type="submit" 
            isLoading={isLoading}
          >
            Login
          </Button>
        </form>

        <Box textAlign="center" mt={4}>
          <Link to="/forgot-password" style={{ fontSize: "sm", color: "gray.600", textDecoration: "underline" }}>
            Forgot your password?
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
