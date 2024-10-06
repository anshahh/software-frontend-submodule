import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Container,
    Card,
    CardHeader,
    Heading,
    Button,
    Image,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useDisclosure,
    CardFooter,
    HStack,
    Spacer,
    FormControl,
    FormLabel,
    Input,
    RadioGroup,
    Radio,
    Text,
    Stack
} from '@chakra-ui/react';

import projectImage from '../assets/project.png';

//exports cards for the major and minor project allotments
export const DisplayCards = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [modalMessage, setModalMessage] = useState('You are already assigned a Guide!');
    const [inInternship, setInInternship] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        rollNumber: '',
        companyName: '',
        managerName: '',
        duration: ''
    });
    const navigate = useNavigate();

    // Handle view details through modal
    const handleViewDetails = (projectType) => {
        if (projectType === 'major') {
            setModalMessage('You are already assigned a Guide!');
        } else {
            setModalMessage('Are you currently in an internship?');
        }
        setInInternship(null);
        onOpen(); // Open modal
    };

    // Handle form input change
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = () => {
        console.log(formData);
        onClose();
    };

    // Handle radio button change for internship
    const handleInternshipChange = (value) => {
        setInInternship(value);
        if (value === 'no') {
            onClose();
            navigate('/minor-allocation');
        }
    };

    return (
        <>
            <Container
                maxW={{ base: "95%", sm: "90%", md: "80%", lg: "container.lg", xl: "container.xl" }}
                my="120px"
                mx="auto"
                alignContent="center"
                justifyContent="center"
            >
                <Heading fontFamily="'Sanchez', serif" textAlign="center">
                    Project Details Are Given Below
                </Heading>

                {/* Major Project Card */}
                <Card
                    mt="50px"
                    mx="auto"
                    p="0"
                    boxShadow="lg"
                    borderRadius="lg"
                    maxW="85%"
                    _hover={{ boxShadow: "xl" }}
                >
                    <CardHeader borderTopRadius="md" _hover={{ bg: 'orange.400' }} transition="background 0.3s ease">
                        <HStack>
                            <Heading p="5" size={['md', 'lg']} fontFamily="'Poppins', serif" color="black">
                                Major Project
                            </Heading>
                            <Spacer />
                            <Image mr="10px" src={projectImage} alt="Project" boxSize={['50px', '80px']} objectFit="cover" mt={{ base: 4, md: 0 }} />
                        </HStack>
                    </CardHeader>
                    <CardFooter px="10" mb="2" fontFamily="'Poppins', serif">
                        <Button
                            mr="5px"
                            colorScheme="orange"
                            onClick={() => handleViewDetails('major')}  // Opens the modal with the major project message
                            _hover={{ bg: 'orange.300', color: 'white' }}
                            mb={{ base: 2, md: 0 }}
                        >
                            Apply
                        </Button>
                        <Link to="/major-allocation">
                            <Button
                                ml="5px"
                                colorScheme="orange"
                                _hover={{ bg: 'orange.300', color: 'white' }}
                            >
                                Apply
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>

                {/* Minor Project Card */}
                <Card
                    mt="50px"
                    mx="auto"
                    p="0"
                    boxShadow="lg"
                    borderRadius="lg"
                    maxW="85%"
                    _hover={{ boxShadow: "xl" }}
                >
                    <CardHeader borderTopRadius="md" _hover={{ bg: 'orange.400' }} transition="background 0.3s ease">
                        <HStack>
                            <Heading p="5" size={['md', 'lg']} fontFamily="'Poppins', serif" color="black">
                                Minor Project
                            </Heading>
                            <Spacer />
                            <Image mr="10px" src={projectImage} alt="Project" boxSize={['50px', '80px']} objectFit="cover" mt={{ base: 4, md: 0 }} />
                        </HStack>
                    </CardHeader>
                    <CardFooter px="10" mb="2" fontFamily="'Poppins', serif">
                        <Button
                            mr="5px"
                            colorScheme="orange"
                            onClick={() => handleViewDetails('minor')} // Open internship decision dialog for minor project
                            _hover={{ bg: 'orange.300', color: 'white' }}
                            mb={{ base: 2, md: 0 }}
                        >
                            Apply
                        </Button>
                        <Link to="/minor-allocation">
                            <Button
                                ml="5px"
                                colorScheme="orange"
                                _hover={{ bg: 'orange.300', color: 'white' }}
                            >
                                Apply
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            </Container>

            {/* Modal for Internship Details */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Notice</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody color="black" fontFamily="'Poppins', serif" mb="20px">
                        {modalMessage === 'Are you currently in an internship?' && (
                            <>
                                <Text fontFamily='Poppins, sans-serif'>Are you currently doing an internship?</Text>
                                <RadioGroup onChange={handleInternshipChange} value={inInternship}>
                                    <Stack direction="row">
                                        <Radio value="yes">Yes</Radio>
                                        <Radio value="no">No</Radio>
                                    </Stack>
                                </RadioGroup>

                                {inInternship === 'yes' && (
                                    <form>
                                        <FormControl mt="4">
                                            <FormLabel>Name</FormLabel>
                                            <Input name="name" value={formData.name} onChange={handleInputChange} />
                                        </FormControl>
                                        <FormControl mt="4">
                                            <FormLabel>Roll Number</FormLabel>
                                            <Input name="rollNumber" value={formData.rollNumber} onChange={handleInputChange} />
                                        </FormControl>
                                        <FormControl mt="4">
                                            <FormLabel>Company Name</FormLabel>
                                            <Input name="companyName" value={formData.companyName} onChange={handleInputChange} />
                                        </FormControl>
                                        <FormControl mt="4">
                                            <FormLabel>Manager's Name</FormLabel>
                                            <Input name="managerName" value={formData.managerName} onChange={handleInputChange} />
                                        </FormControl>
                                        <FormControl mt="4">
                                            <FormLabel>Duration (in months)</FormLabel>
                                            <Input name="duration" value={formData.duration} onChange={handleInputChange} />
                                        </FormControl>
                                    </form>
                                )}
                            </>
                        )}
                        {
                            modalMessage === 'You are already assigned a Guide!' && <Text fontFamily="'Poppins'">{modalMessage}</Text>
                        }
                    </ModalBody>
                    {inInternship === 'yes' && (
                        <ModalFooter>
                            <Button colorScheme="orange" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </ModalFooter>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};
