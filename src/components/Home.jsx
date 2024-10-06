import React from 'react';
import { ChakraProvider, Box, Container, SimpleGrid, VStack, Heading, Text, Card, CardHeader, CardBody } from '@chakra-ui/react';
import { extendTheme, ColorModeScript } from '@chakra-ui/react';
import Navbar from './Navbar';  // Import the Navbar component
import { useAdminContext } from '../context/AdminContext';

// 1. Extend the Chakra theme to set up a dark mode
const customTheme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: 'gray.900',
        color: 'gray.100',
      },
      a: {
        color: 'blue.400',
        _hover: {
          textDecoration: 'underline',
        },
      },
    },
  },
});

// Mock user data
const user = {
  name: "Geetha V",
  status: "Admin",
  branch: "IT Dept",
  year: "2026"  
};

const reminders = [
  "Submit project report by Friday",
  "Attend seminar on AI at 2 PM tomorrow",
  "Register for the upcoming hackathon"
];

const quickLinks = [
  { name: "MTech Major Project guide allotment", url: "/mtech-major-guide-allotment" },
  { name: "MTech Minor Project guide allotment", url: "/mtech-minor-guide-allotment" },
  { name: "Report", url: "/report" },
];

function HomePage() {
  const {adminUser,setAdminUser} = useAdminContext();
  return (
    <ChakraProvider theme={customTheme}>
      <ColorModeScript initialColorMode={customTheme.config.initialColorMode} />

      <Box minH="100vh" bgGradient="linear(to-b, blue.100, purple.100)">
        {/* Navbar */}
        {/* <Navbar user={user} /> */}

        {/* Main Content */}
        <Container maxW="7xl" py={6} bg="grey.100">
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {/* User Details */}
            <Card color="blue.600">
              <CardHeader>
                <Heading size="md">Profile</Heading>
              </CardHeader>
              <CardBody>
                <VStack align="stretch" spacing={2}>
                  <Text><strong>Name:</strong> {adminUser}</Text>
                  <Text><strong>Status:</strong> {adminUser}</Text>
                  <Text><strong>Branch:</strong> {user.branch}</Text>
                  <Text><strong>Year:</strong> {user.year}</Text>
                </VStack>
              </CardBody>
            </Card>

            {/* Reminders */}
            <Card color="blue.600">
              <CardHeader>
                <Heading size="md">Reminders</Heading>
              </CardHeader>
              <CardBody>
                <VStack align="stretch" spacing={2}>
                  {reminders.map((reminder, index) => (
                    <Text key={index}>{reminder}</Text>
                  ))}
                </VStack>
              </CardBody>
            </Card>

            {/* Quick Links */}
            <Card color="blue.600">
              <CardHeader>
                <Heading size="md">Quick Links</Heading>
              </CardHeader>
              <CardBody>
                <VStack align="stretch" spacing={2}>
                  {quickLinks.map((link, index) => (
                    <a key={index} href={link.url} className='underline'>{link.name}</a>
                  ))}
                </VStack>
              </CardBody>
            </Card>
          </SimpleGrid>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default HomePage;
