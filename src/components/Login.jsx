import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Heading, Text, Stack, Alert, AlertIcon, AlertDescription, Image, ButtonGroup } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAdminContext } from '../context/AdminContext';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [userType, setUserType] = useState(null); // New state for user type
  let navigate = useNavigate();
  const { adminUser, setAdminUser } = useAdminContext();

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@nitk\.edu\.in$/;
    if (!regex.test(email)) {
      setEmailError("Please enter a valid @nitk.edu.in email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      // Proceed with login logic
      console.log("Login attempt with:", email, userType);
      //setAdminUser(userType); // Set user type in context
      navigate('/2fa');
    }
  };

  return (
    <Box minH="100vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center" bgGradient="linear(to-b, blue.100, purple.100)" p={4}>
      {/* Top Container with Image */}
      <Box w="full" maxW="md" mb={6} p={8} bg="white" shadow="md" rounded="md">
        <Box textAlign="center" mb={4}>
          {/* Add an Image above the text */}
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

      {/* Login Form */}
      <Box w="full" maxW="md" p={8} bg="white" shadow="md" rounded="md">
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
              <Input id="password" type="password" />
            </FormControl>
          </Stack>

          <Text mt={6} textAlign="center" fontSize="sm">
            Don't have an account?{" "}
            <a href="/signup" style={{ color: "blue.500", textDecoration: "underline" }}>
              Sign up
            </a>
          </Text>

          <Button colorScheme="blue" w="full" mt={4} type="submit">Login</Button>
        </form>

        <Box textAlign="center" mt={4}>
          <a href="/forgot-password" style={{ fontSize: "sm", color: "gray.600", textDecoration: "underline" }}>
            Forgot your password?
          </a>
        </Box>
      </Box>
    </Box>
  );
}
