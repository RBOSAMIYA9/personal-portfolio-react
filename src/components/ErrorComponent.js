import React from 'react'
import {

    Box,
    Text,
    VStack,useColorMode

} from '@chakra-ui/react';
import { IoMdAlert } from "react-icons/io"

function ErrorComponent() {
    
    // eslint-disable-next-line 
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <>
            <Box bg={colorMode === "light" ? "red.100" : "gray"} w="50%" p="8">

                {/* <Box d="flex" flexDirection="column"> */}
                <VStack>
                    <Box color="red.300">
                        <IoMdAlert size={30} />
                    </Box>

                    <Text mr={2}>Some error occured!</Text>
                    <Text>Error occured while fetching data. Please <Text as="u" cursor="pointer" onClick={() => { window.location.reload() }}>retry</Text> </Text>

                </VStack>




            </Box>
        </>
    )
}

export default ErrorComponent
