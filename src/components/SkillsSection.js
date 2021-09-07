import React from 'react'
import {

    Box,
    Image, Center, Divider, useColorMode,
    Heading

} from '@chakra-ui/react';
import arduino from '../images/arduino.webp'
import cpp from '../images/cpp.webp'
import css from '../images/css.webp'
import express from '../images/express.webp'
import html from '../images/html.webp'
import js from '../images/js.webp'
import nodejs from '../images/nodejs.webp'
import pcb from '../images/pcb.webp'
import python from '../images/python.webp'
import mongodb from '../images/mongodb.webp'
import reactjs from '../images/reactjs.webp'

function SkillsSection() {

    // eslint-disable-next-line 
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <>
            <Box bg={colorMode === "light" ? "bodyBackground" : ""} p="5" id="skills">
                <Heading textAlign="center" fontWeight="500" >Skills</Heading>
                <Box d="flex" justifyContent="space-evenly" mt="8" flexDirection={["column", "column", "row", "row"]}>

                    <Image src={html} height="75px" width="auto" margin="10px auto" />
                    <Image src={css} height="75px" width="auto" margin="10px auto" />
                    <Image src={js} height="75px" width="auto" margin="10px auto" />
                    <Image src={cpp} height="75px" width="auto" margin="10px auto" />
                    <Image src={nodejs} height="75px" width="auto" margin="10px auto" />
                    <Image src={python} height="75px" width="auto" margin="10px auto" />
                </Box>
                <Box d="flex" justifyContent="space-evenly" mt="8" flexDirection={["column", "column", "row", "row"]}>
                    <Image src={mongodb} height="75px" width="auto" margin="10px auto" />
                    <Image src={reactjs} height="75px" width="auto" margin="10px auto" />
                    <Image src={express} height="75px" width="auto" margin="10px auto" />
                    <Image src={arduino} height="75px" width="auto" margin="10px auto" />
                    <Image src={pcb} height="75px" width="auto" margin="10px auto" />
                </Box>
                <Center my="8">
                    <Divider w="80vw" borderColor="gray" />
                </Center>

            </Box>
        </>
    )
}

export default SkillsSection
