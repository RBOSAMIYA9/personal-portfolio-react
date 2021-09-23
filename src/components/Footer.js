import React from 'react'
import {


    Text, Box

} from '@chakra-ui/react';
function Footer() {

    return (
        <>
            <Box bg='#343a40' p='5'  >
                <Box as="a" href="/">
                    <Text textAlign='center' fontSize="lg" color='white'> ©{new Date().getFullYear()} Ravindra Bosamiya</Text>
                </Box>

            </Box>
        </>
    )
}

export default Footer
