import React from 'react'
import {

    Box,
   
    Button, Image,

} from '@chakra-ui/react';
import email from "../images/email.webp"
import Phone from "../images/phone.webp"
import Message from "../images/message.webp"
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";
import ContactData from '../contactInfo.json'

function ContactButtons({ defaultDirection }) {
    var flexData = ["column", "column", defaultDirection, defaultDirection]
    return (
        <>
            <Box w="50vw" d='flex' flexDirection={flexData} justifyContent="center">
                <ScrollAnimation animateIn="animate__pulse"
                    // animateOut="fadeOut"
                    duration={0.4}
                    delay={0}>
                    <Box as="a" href={`mailto:${ContactData.email}`}>
                        <Button fontWeight="bold" variant="secondary" w={["80%", "80%", "", ""]} m='5' p="20px" justifyContent='center' textAlign='center'   >
                            <Image src={email} h="30px" w="30px" /> Email</Button>
                    </Box>
                </ScrollAnimation>

                <ScrollAnimation animateIn="animate__pulse"
                    // animateOut="fadeOut"
                    duration={0.5}
                    delay={0}>
                    <Box as="a" href={ContactData.whatsappLink}>
                        <Button fontWeight="bold" variant="secondary" m='5' w={["80%", "80%", "", ""]} p="20px" justifyContent='center' textAlign='center'   >
                            <Image src={Message} h="30px" w="30px" />Chat</Button>
                    </Box>
                </ScrollAnimation>

                <ScrollAnimation animateIn="animate__pulse"
                    // animateOut="fadeOut"
                    duration={0.6}
                    delay={0}>
                    <Box as="a" href={`tel:${ContactData.phone}`}>
                        <Button fontWeight="bold" variant="secondary" m='5' w={["80%", "80%", "", ""]} p="20px" justifyContent='center' textAlign='center'  >
                            <Image src={Phone} h="30px" w="30px" />Call</Button>
                    </Box>
                </ScrollAnimation>
            </Box>
        </>
    )
}

export default ContactButtons

