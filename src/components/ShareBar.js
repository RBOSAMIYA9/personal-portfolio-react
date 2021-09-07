import React from 'react'
import {

    Box,
    Text

} from '@chakra-ui/react';

import Sharebuttons from '../components/Sharebuttons'






function ShareBar({ textToShare }) {


    return (
        <>
            <Box borderRadius="md" border="1px solid gray" my="5" p="2" >
                <Text textAlign="center">Liked It? Share it with your friends</Text>
                <Box d="flex" justifyContent="space-around" p="5" my="3">
                    <Sharebuttons variant={"larger"} textToShare={textToShare} />
                </Box>
            </Box>

        </>
    )
}

export default ShareBar
