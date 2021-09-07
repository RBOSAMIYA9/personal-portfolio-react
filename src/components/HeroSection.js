import React, { useEffect } from 'react'
import {

    Box,

    Button, Heading, useColorMode

} from '@chakra-ui/react';
import HeroSVG from './HeroSVG'
import ContactData from '../contactInfo.json'

function HeroSection() {

    // eslint-disable-next-line 
    const { colorMode, toggleColorMode } = useColorMode();


    function consoleText(words, id, colors) {
        // if (colors === undefined) colors = ['#fff'];
        var visible = true;
        var con = document.getElementById('console');
        var letterCount = 1;
        var x = 1;
        var waiting = false;
        var target = document.getElementById(id)
        // target.setAttribute('style', 'color:' + colors[0])
        window.setInterval(function () {

            if (letterCount === 0 && waiting === false) {
                waiting = true;
                target.innerHTML = words[0].substring(0, letterCount)
                window.setTimeout(function () {
                    // var usedColor = colors.shift();
                    // colors.push(usedColor);
                    var usedWord = words.shift();
                    words.push(usedWord);
                    x = 1;
                    // target.setAttribute('style', 'color:' + colors[0])
                    letterCount += x;
                    waiting = false;
                }, 1000)
            } else if (letterCount === words[0].length + 1 && waiting === false) {
                waiting = true;
                window.setTimeout(function () {
                    x = -1;
                    letterCount += x;
                    waiting = false;
                }, 1000)
            } else if (waiting === false) {
                target.innerHTML = words[0].substring(0, letterCount)
                letterCount += x;
            }
        }, 120)
        window.setInterval(function () {
            if (visible === true) {
                con.className = 'console-underscore hidden'
                visible = false;

            } else {
                con.className = 'console-underscore'

                visible = true;
            }
        }, 400)
    }
    useEffect(() => {
        // consoleText(['Fullstack Engineer', 'Tech geek', 'Learner'], 'text', ['black']);
        consoleText(['Fullstack Engineer', 'Tech geek', 'Learner'], 'text');


        // eslint-disable-next-line 
    }, [])

    return (
        <>
            <Box d="flex" bg={colorMode === "light" ? "bodyBackground" : ""} flexDirection={["column", "column", "row", "row"]} alignItems="center">
                <Box w={["100vw", "100vw", "50vw", "50vw"]} p="10" order={["2", "2", "1", "1"]} >
                    <Heading fontSize="4xl" fontWeight="500" >👋 Hi, I am</Heading>
                    <Heading color="royalblue" fontSize="5xl" fontWeight="500">Ravindra Bosamiya
                    </Heading>
                    <Box d="flex" alignItems="baseline" my="2" >
                        <Heading fontSize="4xl" as="span" id='text' fontWeight="500" color={colorMode === "light" ? "black" : "#fff"}></Heading>
                        <Heading className='console-underscore' id='console' fontWeight="500" color={colorMode === "light" ? "black" : "#fff"}>&nbsp; _</Heading>
                    </Box>

                    <Box as="a" href={`mailto:${ContactData.email}`}><Button variant="primary" m="8" ml="0">Hire me</Button></Box>

                    <Button variant="secondary">View Resume</Button>
                </Box>
                <Box w={["100vw", "100vw", "50vw", "50vw"]} order={["1", "1", "2", "2"]}>
                    <HeroSVG />

                </Box>
            </Box>
        </>
    )
}

export default HeroSection
