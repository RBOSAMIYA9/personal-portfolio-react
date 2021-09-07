import React from 'react'
import {


    Text, Box

} from '@chakra-ui/react';
function Footer() {
    
    return (
        <>
            <Box bg='#343a40' p='5' >
                <Text textAlign='center' fontSize="lg" color='white'> ©{new Date().getFullYear()} Ravindra Bosamiya</Text>
            </Box>
        </>
    )
}

export default Footer
