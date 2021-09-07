import React, { useState, useEffect } from 'react'
import {

    Box,
    Text,
    Button, useColorMode

} from '@chakra-ui/react';

import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";
import parse from 'html-react-parser';

function ProjectComponent({ aimationDuration, data }) {

    // eslint-disable-next-line 
    const { colorMode, toggleColorMode } = useColorMode();
    const [seeDemoLink, setSeeDemoLink] = useState(null);

    useEffect(() => {
        var doc = new DOMParser().parseFromString(data.content.rendered, "text/html");
        var btn = doc.getElementsByClassName("wp-block-button__link")

        if (btn[0] && (btn[0].innerHTML.includes("demo"))) {
            console.log("data", btn[0].href)
            setSeeDemoLink(btn[0].href);
            // console.log("data",btn[0].innerHTML)

        }
        
        // eslint-disable-next-line 
    }, [])

    return (
        <>
            <ScrollAnimation animateIn="animate__fadeInUp"
                // animateOut="fadeOut"
                duration={aimationDuration}
                delay={0.8}>
                <Box bg={colorMode === "light" ? "#fff" : "gray.500"} minH="100%" borderRadius="xl" cursor="pointer" boxShadow=" 0 15px 5px 0 rgba(29, 78, 216, 0.2)" p="5" flexWrap="wrap" m="2">
                    {/* {console.log("data._links.self.href",data.slug)} */}
                    <Box as="a" href={`/projects/${data.slug}`}>
                        <Text as="h1" fontWeight="bold" fontSize="xl">{data.title.rendered}</Text>


                        <Text noOfLines={3} as="p" style={{ marginTop: "0 !important", marginBottom: 0 }} >{parse(data.content.rendered)}</Text>
                    </Box>

                    {seeDemoLink !== null &&
                        <Box as="a" href={seeDemoLink}>
                            <Button variant="secondary" my="5">See Demo</Button>
                        </Box>

                    }
                </Box>
            </ScrollAnimation>
        </>

    )
}

export default ProjectComponent
