import React, { useState } from 'react';
import {
    Center, Spacer,
    Box, Text, Button, Heading, Select, UnorderedList, ListItem, IconButton,
    useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons'; // For delete button icon

// Import sample guide data
import { Guides } from './GuideData';

export const PreferenceForm = () => {
    const [availableGuides, setAvailableGuides] = useState(Guides); // Available guides for selection
    const [selectedGuides, setSelectedGuides] = useState([]); // Selected guides
    const [selectedGuide, setSelectedGuide] = useState(''); // Track the selected guide from the dropdown
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [modalMessage, setModalMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    // Handle selection from dropdown
    const handleSelectGuide = (event) => {
        const guideName = event.target.value;
        if (guideName === '') return;

        // Add the selected guide to the list and remove it from available guides
        const selectedGuide = availableGuides.find(guide => guide.name === guideName);
        setSelectedGuides([...selectedGuides, selectedGuide]);
        setAvailableGuides(availableGuides.filter(guide => guide.name !== guideName));
        setSelectedGuide(''); // Reset dropdown
    };

    // Handle deletion from the selected list
    const handleDeleteGuide = (guideName) => {
        const deletedGuide = selectedGuides.find(guide => guide.name === guideName);
        setSelectedGuides(selectedGuides.filter(guide => guide.name !== guideName)); // Remove from list
        setAvailableGuides([...availableGuides, deletedGuide]); // Re-add to dropdown
    };

    // Submit handler for form submission
    const handleSubmit = () => {
        if (availableGuides.length === 0) {
            // All guides have been selected, show success message
            setModalMessage('Preferences submitted successfully!');
            setIsSuccess(true);
        } else {
            // Not all guides selected, show error message
            setModalMessage('Please select all the available Guides in order of your preference.');
            setIsSuccess(false);
        }
        onOpen(); // Open the modal
    };

    return (
        <Center
            bgGradient="linear(to-r, purple.100, white)"
            w="100vw"
            h="100vh"
        >
            <Box
                maxW="800px"
                maxH="800px"
                mx={["10px", "20px", "40px"]}
                mt={8}
                py={4}
                px={['10px', '20px', '30px', '150px']}
                borderWidth="1px"
                borderRadius="md"
                boxShadow="md"
                bg="white" // Background remains white


            >
                <Heading fontFamily="'Sanchez', serif" size={['lg', 'xl']} textAlign="center" mt={6} mb={8}>
                    Minor Project Allocation Form
                </Heading>

                <Text fontFamily="'Poppins', sans-serif" textAlign="center" mb={6} fontSize={['sm', 'md']}>
                    Select Your Guide Preferences
                </Text>

                {/* Dropdown menu */}
                <Select
                    placeholder="Select a Guide"
                    value={selectedGuide}
                    onChange={handleSelectGuide}
                    fontFamily="'Poppins', sans-serif"
                    mb={6}
                >
                    {availableGuides.map((guide) => (
                        <option key={guide.id} value={guide.name}>
                            {guide.name}
                        </option>
                    ))}
                </Select>

                {/* List of selected guides with faint gradient */}
                {/* List of selected guides with black to white gradient */}
                <UnorderedList fontFamily="'Poppins', sans-serif" mb={6}>
                    {selectedGuides.map((guide, index) => (
                        <ListItem
                            key={guide.id}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            mb={2}
                            borderWidth="1px" // Light border around the list item
                            borderRadius="md" // Rounded corners for list items
                            borderColor="gray.200"
                            bgGradient="linear(to-r, purple.600, purple.100)" // Black to white gradient
                            color="white" // Dark text color for better contrast

                        >
                           <Text
                                                     
                                                     px={4} // Padding inside each list item
                                                     py={2}
                           > {`${index + 1}. ${guide.name}`} </Text>
                            <Spacer />
                            <IconButton
                            px={4} // Padding inside each list item
                            py={2}
                                // w="20%"
                                icon={<CloseIcon />}
                                size="sm"
                                colorScheme="white"
                                onClick={() => handleDeleteGuide(guide.name)}
                                aria-label="Delete guide"
                            // ml={4}
                            />
                            
                        </ListItem>
                    ))}
                </UnorderedList>

                <Box display="flex" justifyContent="center" my={6}>
                    <Button
                        fontFamily="'Poppins', sans-serif"
                        colorScheme="purple"
                        onClick={handleSubmit}
                        fontSize={['xs', 'md']}
                    >
                        Submit Preferences
                    </Button>
                </Box>

                {/* Modal for error/success messages */}
                <Modal isOpen={isOpen} onClose={onClose} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader fontFamily="'Sanchez', serif">{isSuccess ? 'Success' : 'Error'}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody fontFamily="'Poppins', sans-serif">
                            {modalMessage}
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme={isSuccess ? 'green' : 'red'} mr={3} onClick={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
        </Center>


    );
};
