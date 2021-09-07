import React from 'react'
import {

    Box,
    Text,
    useColorMode

} from '@chakra-ui/react';
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";
import parse from 'html-react-parser';

function BlogComponent({ animationDuration, data }) {
    
    // eslint-disable-next-line 
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <>
            <ScrollAnimation animateIn="animate__fadeInUp"
                // animateOut="fadeOut"
                duration={animationDuration}
                delay={0.8}>

                <Box bg={colorMode === "light" ? "#fff" : "gray.500"} borderRadius="xl" minH="100%" cursor="pointer" boxShadow=" 0 15px 5px 0 rgba(29, 78, 216, 0.2)" p="5" flexWrap="wrap" m="2">
                    <Box as="a" href={`/blog/${data.slug}`} >
                        <Text as="h1" fontWeight="bold" fontSize="xl">{data.title.rendered}</Text>
                        <Text as="p" mt="2" noOfLines={4}>{parse(data.excerpt.rendered)}</Text>
                    </Box>

                </Box>

            </ScrollAnimation>

        </>
    )
}

export default BlogComponent
