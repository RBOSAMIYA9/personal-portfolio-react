import React from 'react'
import {

    Box,
    Center,
    Heading, Image, useColorMode

} from '@chakra-ui/react';
import dp from '../images/RavindraBosamiyaDp.webp'
import { FaGithub, FaInstagram, FaTwitter,FaLinkedin } from 'react-icons/fa'
import ContactButtons from "./ContactButtons";
import ContactData from '../contactInfo.json'
// l m8hmh88/.


function ContactMe() {

    // eslint-disable-next-line 
    const { colorMode, toggleColorMode } = useColorMode();
    console.log("ContactData", ContactData);
    return ( 
        <>
            <Box bg={colorMode === "light" ? "bodyBackground" : ""} pb="12" id="contact" >
                <Heading textAlign="center" fontWeight="500" >Contact Me</Heading>
                <Box d="flex" justifyContent="space-evenly" px="10" alignItems="center" mt="12" flexDirection={["column", "column", "row", "row"]}>

                    <Box w={["100vw", "100vw", "100vw", "100vw"]} h="30vh"  >
                        <Center>
                            <Box w={["90vw", "90vw", "50%", "50%"]} border={colorMode === "light" ? "2px solid royalBlue" : ""} borderRadius="lg" bg={colorMode === "light" ? "#fff" : "gray.600"} p="8" pos="relative" display="block">
                                <Image src={dp} borderRadius="50%" pos="absolute" h="75px" w="75px" top="-50px" left="48%" ml="-25px" border="5px solid royalBlue" />
                                <Heading textAlign="center" fontWeight="400" fontSize="32px" mt="5">Ravindra <br /> Bosamiya</Heading>
                                <Box d="flex" justifyContent="space-evenly" mt="5">
                                    <Box as="a" href={ContactData.instagram} target="_blank" rel="noopener noreferrer">
                                        
                                        <FaInstagram size={20} />
                                    </Box>


                                    <Box as="a" href={ContactData.twitter} target="_blank" rel="noopener noreferrer" >
                                       
                                        <FaTwitter size={20} />
                                    </Box>


                                    <Box as="a" href={ContactData.github} target="_blank" rel="noopener noreferrer" >
                                      
                                        <FaGithub size={20} />
                                    </Box>


                                    <Box as="a" href={ContactData.linkedIn} target="_blank" rel="noopener noreferrer">
                                       
                                        <FaLinkedin size={20} />
                                    </Box>


                                </Box>
                            </Box>
                        </Center>
                    </Box>

                    <ContactButtons defaultDirection="column" />

                </Box>


            </Box>
        </>
    )
}

export default ContactMe
