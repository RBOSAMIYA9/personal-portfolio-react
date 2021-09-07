import React, { useEffect, useState } from 'react'
import {

    Box, Grid, Text,
    Spinner, Center,
    Button, Heading, Divider, useColorMode
} from '@chakra-ui/react';
import {
    Link
} from "react-router-dom";
import ProjectComponent from './ProjectComponent'
import Error from "./ErrorComponent";


// Football@10


var projectURL = "https://ravindra-portfolio.000webhostapp.com/wp-json/wp/v2/projects"

function ProjectsSection() {

    // eslint-disable-next-line 
    const { colorMode, toggleColorMode } = useColorMode();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)
    const [project, setProject] = useState(null);
    useEffect(() => {

        setLoading(true);


        fetch(projectURL).then(response => response.json()).then((json) => {
            // setProject(json);

            if (json.length > 0) {
                var firstThreeProject = [];

                for (var i = 0; i < 3; i++) {
                    if (json[i] !== undefined) {
                        firstThreeProject = [...firstThreeProject, json[i]]
                    }

                }
                console.log("data", firstThreeProject)
                setProject(firstThreeProject)
            }
            else {
                setProject(null)
            }

            setLoading(false);

        }).catch((error) => {
            console.log("error while fetching the projects", error)
            setError(true);
        })

        // wp.types().type('projects').then((data) => {
        //     var firstThreeProject = [];
        //     console.log("data", data)
        //     for (var i = 0; i < 3; i++) {
        //         firstThreeProject = [...firstThreeProject, data[i]]
        //     }
        //     // console.log("data", firstThreePost)
        //     setProject(firstThreeProject)
        //     setLoading(false);
        // }).catch((error) => {
        //     console.log("error in fetching post", error);
        //     setError(true);
        // });



        // eslint-disable-next-line 
    }, [])

    var animationDuration = 0.4;
    return (
        <>
            <Box bg={colorMode === "light" ? "bodyBackground" : ""} id="projects" >
                <Heading textAlign="center" fontWeight="500" >Projects</Heading>


                {error ? <>
                    <Center>
                        <Error />
                    </Center>
                </> : <>
                    {loading ?
                        <Center>
                            <Spinner size="xl" />
                        </Center>
                        : (
                            <>
                                {/* <Box d="flex" flexDirection={["column", "column", "row", "row"]} justifyContent="space-evenly" mt="5" p="10" > */}


                                <Grid p="10" templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(3, 1fr)"]} gap={5}>
                                    {project && project.map((projectData) => (
                                        <>

                                            <ProjectComponent animationDuration={animationDuration = animationDuration + 0.1} data={projectData} key={projectData.id} />
                                        </>
                                    ))}
                                </Grid>

                                {
                                    project ?
                                        <Link to="/projects">
                                            <Box textAlign="center">
                                                <Button variant="primary">View More</Button>
                                            </Box>
                                        </Link>
                                        :
                                        <Box w="100%">
                                            <Center>
                                                <Text>No projects found</Text>
                                            </Center>

                                        </Box>

                                }



                            </>
                        )}
                </>}




                {/* <Box d="flex" flexDirection={["column", "column", "row", "row"]} justifyContent="space-evenly" mt="5" p="10"> */}
                {/* <ProjectComponent aimationDuration={aimationDuration - 0.1} />
                    <ProjectComponent aimationDuration={aimationDuration + 0.1} />
                    <ProjectComponent aimationDuration={aimationDuration + 0.2} /> */}
                {/* <ProjectComponent aimationDuration={aimationDuration + 0.3} /> */}
                {/* </Box>
                <Link to="/project">
                    <Box textAlign="center">
                        <Button variant="primary">View More</Button>
                    </Box>
                </Link> */}

                <Center>
                    <Divider w="80vw" borderColor="gray" my="5" />
                </Center>

            </Box>

        </>
    )
}

export default ProjectsSection
