// src/components/ForgotPassword.jsx

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
  AlertDescription 
} from "@chakra-ui/react";
import { resetPassword } from "../report_submission/helpers/firebase"; // Corrected relative import
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [authError, setAuthError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handle form submission for password reset.
   */
  const handleReset = async (e) => {
    e.preventDefault();
    setAuthError("");
    setSuccessMessage("");

    try {
      setIsLoading(true);
      await resetPassword(email);
      setSuccessMessage("Password reset email sent. Please check your inbox.");
    } catch (error) {
      console.error("Reset password error:", error);
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
          <Heading size="lg" color="blue.500">Forgot Password</Heading>
          <Text>Enter your email to reset your password.</Text>
        </Box>
      </Box>

      {/* Password Reset Form */}
      <Box 
        w="full" 
        maxW="md" 
        p={8} 
        bg="white" 
        shadow="md" 
        rounded="md"
      >
        <form onSubmit={handleReset}>
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input 
                type="email" 
                placeholder="username@nitk.edu.in" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
          </Stack>

          {authError && (
            <Alert status="error" mt={4}>
              <AlertIcon />
              <AlertDescription>{authError}</AlertDescription>
            </Alert>
          )}

          {successMessage && (
            <Alert status="success" mt={4}>
              <AlertIcon />
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          )}

          <Button 
            colorScheme="blue" 
            w="full" 
            mt={4} 
            type="submit" 
            isLoading={isLoading}
          >
            Reset Password
          </Button>
        </form>

        <Box textAlign="center" mt={4}>
          <Link to="/login" style={{ fontSize: "sm", color: "blue.500", textDecoration: "underline" }}>
            Back to Login
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
