import React from 'react'
import {

    Box,
    Text, Image, Center, Divider,
    Heading, useColorMode

} from '@chakra-ui/react';
import aboutSVG from '../images/Developer activity-bro.svg'

import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";

function AboutSection() {
    // eslint-disable-next-line 
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <>

            <Box bg={colorMode === "light" ? "bodyBackground" : ""} p="12" id="about">
                <Heading textAlign="center" fontWeight="500" >About me</Heading>
                <Box d="flex" justifyContent="space-evenly" alignItems="center" flexDirection={["column", "column", "row", "row"]} >
                    <Box w={["100w", "100vw", "50vw", "50vw"]}  >
                        <Image src={aboutSVG} h="md" w="100%" />
                    </Box>
                    <ScrollAnimation animateIn="animate__fadeInRight"
                        // animateOut="fadeOut"
                        duration={0.8}
                    // delay={0.8}
                    >
                        <Box w={["100vw", "100vw", "50vw", "50vw"]} p="8"  >
                            <Text as="h1" fontSize="3xl" fontWeight="500" lineHeight="1" mb="3"  >Little bit about
                                <Text color="royalblue">myself</Text> </Text>
                            <Text as="p" fontWeight="400" >
                                I'm an enthusiast embedded engineer
                                having one and half year of hands on experience
                                working in the tech industry.
                            </Text>
                        </Box>
                    </ScrollAnimation>
                </Box>


                <Center>
                    <Divider w="80vw" borderColor="gray" my="5" />
                </Center>

            </Box>
        </>
    )
}

export default AboutSection
