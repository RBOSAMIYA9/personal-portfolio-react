import React from 'react'
import { Box, Flex, Text, Button, Stack, useColorMode } from "@chakra-ui/react";
import { BiMenu } from "react-icons/bi"
import { AiOutlineClose } from "react-icons/ai"
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { NavHashLink } from 'react-router-hash-link';


// https://github.com/dimitrisraptis96/chakra-ui-navbar/blob/main/src/components/Header.js
// https://raptis.wtf/freebies/color-pairs

function Navbar(props) {

    // eslint-disable-next-line 
    const { colorMode, toggleColorMode } = useColorMode();
    const [isOpen, setIsOpen] = React.useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <NavBarContainer {...props} bg={colorMode === "light" ? "bodyBackground" : ""}>
            <NavHashLink to="/">
                <Text as="h1" fontWeight="500" fontSize="4xl">Ravindra</Text>
            </NavHashLink>

            <MenuToggle toggle={toggle} isOpen={isOpen} />
            <MenuLinks isOpen={isOpen} />
        </NavBarContainer>
    );
}



const MenuToggle = ({ toggle, isOpen }) => {
    return (
        <Box display={{ base: "block", md: "none" }} onClick={toggle}>
            {isOpen ? <AiOutlineClose size={40} /> : <BiMenu size={40} />}
        </Box>
    );
};

// const MenuItem = ({ children, isLast, linkTo, ...rest }) => {
//     console.log("link to", linkTo)
//     return (
//         <NavHashLink to={linkTo}>
//             <Text display="block" fontWeight="700" {...rest}>
//                 {children}
//             </Text>
//         </NavHashLink>


//     );
// };

const MenuLinks = ({ isOpen }) => {
    return (
        <Box
            display={{ base: isOpen ? "block" : "none", md: "block" }}
            flexBasis={{ base: "100%", md: "auto" }}
        >
            <Stack
                spacing={8}
                align="center"
                justify={["center", "space-between", "flex-end", "flex-end"]}
                direction={["column", "row", "row", "row"]}
                pt={[4, 4, 0, 0]}

            >
                <NavHashLink to="/#projects">
                    <Text display="block" fontWeight="700" >
                        Projects
                    </Text>
                </NavHashLink>

                <NavHashLink to="/#skills">
                    <Text display="block" fontWeight="700" >
                        Skills
                    </Text>
                </NavHashLink>


                <NavHashLink to="/#about">
                    <Text display="block" fontWeight="700" >
                        About
                    </Text>
                </NavHashLink>

                <NavHashLink to="/#blogs">
                    <Text display="block" fontWeight="700" >
                        Blog
                    </Text>
                </NavHashLink>

                <NavHashLink to="/#contact">
                    <Button
                        size="sm"
                        variant="primary"
                    >
                        Contact Me
                    </Button>
                </NavHashLink>



                <ColorModeSwitcher />


            </Stack>
        </Box>
    );
};

const NavBarContainer = ({ children, ...props }) => {
    return (
        <Flex

            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            w="100%"

            p={5}

            {...props}
        >
            {children}
        </Flex>
    );
};


export default Navbar
