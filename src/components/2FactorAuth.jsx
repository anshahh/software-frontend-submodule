import { useState, useRef } from "react";
import { Box, Button, FormControl, FormLabel, Input, Heading, Text, Stack, HStack, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAdminContext } from '../context/AdminContext';

export default function LoginPage() {
  const [otp, setOtp] = useState(new Array(6).fill("")); // Array to hold each OTP digit
  let navigate = useNavigate();
  const { setAdminUser } = useAdminContext();
  const inputRefs = useRef([]);

  const handleChange = (element, index) => {
    // Updating the OTP array
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Move focus to the next input box automatically
    if (element.value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace to move focus to the previous input box
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join(""); // Join the OTP array into a single string
    console.log("Entered OTP:", otpValue);
    setAdminUser("student");
    // Navigate or handle OTP submission here
  };

  return (
    <Box minH="100vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center" bgGradient="linear(to-b, blue.100, purple.100)" p={4}>
      {/* Top Container with Image */}
      <Box w="full" maxW="md" mb={6} p={8} bg="white" shadow="md" rounded="md">
        <Box textAlign="center" mb={4}>
          <Image 
            src="src/images/nitk_logo.png" // Replace with your image path
            alt="Logo"
            boxSize="100px" 
            mx="auto" 
            mb={4} 
          />
          <Heading size="lg" color="blue.500">Major Project Guide Allotment Software</Heading>
          <Text size="md">NITK IT Department</Text>
        </Box>
      </Box>

      {/* OTP Form */}
      <Box w="full" maxW="md" p={8} bg="white" shadow="md" rounded="md">
        <Box textAlign="center" mb={4}>
          <Heading size="md">Email Verification</Heading>
          <Text>Enter the 6-digit OTP sent to your registered E-Mail ID</Text>
        </Box>

        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>One Time Password</FormLabel>
              <HStack spacing={2} justify="center">
                {otp.map((_, index) => (
                  <Input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)} // Store references to each input
                    type="text"
                    maxLength={1}
                    textAlign="center"
                    value={otp[index]}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    size="lg"
                    w="50px"
                  />
                ))}
              </HStack>
            </FormControl>
          </Stack>

          <Button colorScheme="blue" w="full" mt={4} type="submit">Submit OTP</Button>
        </form>

        <Box textAlign="center" mt={4}>
          <a href="/forgot-password" style={{ fontSize: "sm", color: "gray.600", textDecoration: "underline" }}>
            Resend OTP
          </a>
        </Box>
      </Box>
    </Box>
  );
}
