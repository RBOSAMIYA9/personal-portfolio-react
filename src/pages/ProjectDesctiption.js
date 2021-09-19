import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import {

    Box, Spinner,
    Text, Image, Center, Divider,
    useColorMode

} from '@chakra-ui/react';
import {
    useParams
} from "react-router-dom";

import "animate.css/animate.min.css";
import parse from 'html-react-parser';
import ShareBar from "../components/ShareBar";
import ContactButtons from "../components/ContactButtons";
import Empty from '../images/empty.svg'
import { Helmet } from "react-helmet";
import '../pages/customStyles.css'


// const url = "http://rb-portfolio.rf.gd/wp-json/wp/v2/posts"


function ProjectDesctiption() {
    let { id } = useParams();

    // eslint-disable-next-line 
    const { colorMode, toggleColorMode } = useColorMode();
    const [project, setProject] = useState(null);
    const [loading, setloading] = useState(false);
    var projectUrl = "https://ravindra-portfolio.000webhostapp.com/wp-json/wp/v2/projects?slug=" + id

    useEffect(() => {
        setloading(true);
        fetch(projectUrl)
            // Handle success
            .then(response => response.json())  // convert to json
            .then(json => {
                console.log("json", json.length, json[0])
                if (json.length > 0) {
                    setProject(json[0])
                }

                setloading(false);
            })    //print data to console
            .catch(err => {
                console.log('Request Failed', err)
                setloading(false);
            }); // Catch errors
        // setloading(false);


        // eslint-disable-next-line 
    }, [])
    const content = () => {
        if (loading) {
            return (<>
                <Helmet>

                    <title>Loading...</title>

                </Helmet>
                <Center w="100%">
                    <Spinner size="xl" mt="12" />
                </Center>
            </>)
        }
        else if (project === null) {
            return (<>
                <Helmet>

                    <title>No project</title>

                </Helmet>
                <Text textAlign="center" fontSize="2xl">Opps.. something went wrong</Text>
                <Center>

                    <Image src={Empty} w="30%" mt="12" />
                </Center>
            </>)
        }

        else {
            return (
                <>
                    <Helmet>

                        <title> {project.title.rendered}</title>

                    </Helmet>
                    <Center>
                        <Box w={["100vw", "100vw", "100vw", "60vw"]} p="8" minH="100vh">
                            <Text fontSize="4xl" as="h1" >{project.title.rendered}</Text>
                            {/* <Box d="flex" justifyContent="space-between" mt="4">
                                <Box d="flex" color="gray" flexGrow="2">

                                </Box>

                            </Box> */}

                            <Box>

                                <div  className="project-description">
                                    {parse(project.content.rendered)}

                                </div>
                                <Divider my="8" borderColor="gray.400" />
                                <ShareBar textToShare={`Check this out *${project.title.rendered}* \n\n ${window.location.href}`} />
                                <Divider my="8" borderColor="gray.400" />
                                <Box mt="5">

                                    <Text fontSize="2xl" as="h3" textAlign="center">Let's talk</Text>

                                    <Text textAlign="center" as="p">Wanna get in touch or talk about a project?</Text>
                                    <Center>
                                        <ContactButtons defaultDirection="row" />
                                    </Center>

                                </Box>
                            </Box>


                        </Box>

                    </Center>
                </>
            )
        }
    }
    return (
        <>
            <Navbar />
            <Box minH="100vh" for="main-container" bg={colorMode === "light" ? "bodyBackground" : ""}>

                {content()}


            </Box>
            <Footer />
        </>
    )
}

export default ProjectDesctiption
