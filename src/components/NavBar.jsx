import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Flex, Button, HStack, Menu, MenuButton, MenuList, MenuItem, VStack, Text } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useAdminContext } from '@/context/AdminContext';
import nitklogo from "../images/home_page.png"

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const {adminUser, setAdminUser} = useAdminContext();

  return (
    <Box bg="rgb(26, 28, 34)" boxShadow="md" as="nav">
      <Container maxW="7xl">
        <Flex align="center" justify="space-between" h="16">
          {/* Logo */}
          <Box>
            <img
              src={nitklogo}
              alt="NITK Logo"
              style={{ height: '60px', width: 'auto' }}
            />
          </Box>
  
          {/* Navigation Links */}
          <HStack spacing={4}>
            {/* Home Button */}
            <Button
              variant="ghost"
              color="white"
              _hover={{ bg: "gray.600", color: "white" }}
              onClick={() => navigate('/')}
            >
              Home
            </Button>
  
            {/* Allotment Dropdown */}
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                variant="gray.600"
                color="white"
                _hover={{ bg: "gray.600", color: "white" }}
              >
                Allotment
              </MenuButton>
               <MenuList bg="rgb(26, 28, 34)">
                {adminUser === 'student' ? (
                    <>
                    <MenuItem
                        color="white"
                        _hover={{ bg: "gray.600", color: "white" }}
                        onClick={() => navigate('/btech-guide-allotment')}
                        bg="rgb(26, 28, 34)"
                    >
                        B.Tech Guide Allotment
                    </MenuItem>
                    <MenuItem
                        color="white"
                        _hover={{ bg: "gray.600", color: "white" }}
                        onClick={() => navigate('/mtech-major-guide-allotment')}
                        bg="rgb(26, 28, 34)"
                    >
                        M.Tech Major Guide Allotment
                    </MenuItem>
                    <MenuItem
                        color="white"
                        _hover={{ bg: "gray.600", color: "white" }}
                        onClick={() => navigate('/mtech-minor-guide-allotment')}
                        bg="rgb(26, 28, 34)"
                    >
                        M.Tech Minor Guide Allotment
                    </MenuItem>
                    </>
                ) : (
                    <MenuItem
                    color="white"
                    _hover={{ bg: "gray.600", color: "white" }}
                    onClick={() => navigate('/student-allotment')}
                    bg="rgb(26, 28, 34)"
                    >
                    Student Allotment
                    </MenuItem>
                )}
                </MenuList>

            </Menu>
  
            {/* Reports Button */}
            <Button
              variant="ghost"
              color="white"
              _hover={{ bg: "gray.600", color: "white" }}
              onClick={() => navigate('/report')}
            >
              Reports
            </Button>

            <Button
              variant="ghost"
              color="white"
              _hover={{ bg: "gray.600", color: "white" }}
              onClick={() => {
                if(adminUser=='student')
                    navigate('/b/student');
                else
                    navigate('/b/Tw');
              }}
            >
              Grades
            </Button>
          </HStack>
  
          {/* User Info */}
          <VStack align="flex-end" spacing={0}>
            <Text fontWeight="medium" color="white">
              {adminUser}
            </Text>
            <Text fontSize="sm" color="gray.300" className="cursor-pointer" onClick={() => setAdminUser(null)}>
              Logout
            </Text>
          </VStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
