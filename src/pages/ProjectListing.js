import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import ProjectComponent from '../components/ProjectComponent';

import Empty from '../images/empty.svg'
import { Helmet } from "react-helmet";


import {

    Box, Tag, Grid,
    Text, Image, Center,
    Heading, Spinner, useColorMode

} from '@chakra-ui/react';





function ProjectListing() {

    // eslint-disable-next-line 
    const { colorMode, toggleColorMode } = useColorMode();
    const [loading, setloading] = useState(false);
    const [projectCategories, setProjectCategories] = useState([])
    const [projects, setProjects] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("all");

    var projectCategoryURL = "https://ravindra-portfolio.000webhostapp.com/wp-json/wp/v2/projectcategory"
    var projectURL = "https://ravindra-portfolio.000webhostapp.com/wp-json/wp/v2/projects"
    var projectBycategoryURL = "https://ravindra-portfolio.000webhostapp.com/wp-json/wp/v2/projects?projectcategory="


    var aimationDuration = 0.4;

    const getDataByprojectCategory = (id, name) => {
        console.log("cateoryId", id);
        setloading(true);
        if (id !== 0) {
            fetch(projectBycategoryURL + id).then(response => response.json()).then((json) => {
                setProjects(json)
            }).catch((error) => console.log("error while fetching the projects", error))
            setSelectedCategory(name);
            setloading(false);
        }
        else {
            fetchAllProjects();
            setSelectedCategory("all");
        }
    }

    const fetchAllProjects = () => {
        setloading(true);
        fetch(projectURL).then(response => response.json()).then((json) => {
            setProjects(json);
            setloading(false);
        }).catch((error) => console.log("error while fetching the projects", error))
    }

    useEffect(() => {
        setloading(true);
        fetch(projectCategoryURL)
            // Handle success
            .then(response => response.json())  // convert to json
            .then((json) => {

                var projectCategoryArr = []

                for (var i = 0; i < json.length; i++) {
                    // console.log(json[i]["id"]);
                    var categoryObj = {
                        "id": json[i]["id"],
                        "name": json[i]["name"]
                    }
                    projectCategoryArr = [...projectCategoryArr, categoryObj]
                }

                setProjectCategories(projectCategoryArr);
                setloading(false);
            })    //print data to console
            .catch(err => {
                console.log('Request Failed', err)
                setloading(false);
            }); // Catch errors

        fetchAllProjects();


        // eslint-disable-next-line 
    }, [])
    return (
        <>
            <Helmet>
                
                <title> Projects </title>

            </Helmet>
            <Navbar />
            <Box minH="100vh" for="main-container" bg={colorMode === "light" ? "bodyBackground" : ""}>
                <Box for="hero-section">
                    <Heading textAlign="center" pt="8">Projects</Heading>
                    <Text textAlign="center">An overview of what I'm working on from time to time.</Text>
                </Box>
                <Center>
                    <Box mt="8" d="flex" justifyContent="left" flexWrap="wrap" px="8">

                        <Tag variant="solid"
                            bg={selectedCategory === "all" ? "gray" : "royalBlue"}
                            cursor="pointer" m="2" onClick={() => getDataByprojectCategory(0, "all")} >All</Tag>
                        {projectCategories.map((category) => (
                            <Tag variant="solid" key={category.id}
                                bg={selectedCategory === category.name ? "gray" : "royalBlue"}
                                onClick={() => getDataByprojectCategory(category.id, category.name)}
                                cursor="pointer" m="2">{category.name}</Tag>
                        ))}
                    </Box>

                </Center>
                {loading ? <Center w="100%">
                    <Spinner size="xl" mt="12" />

                </Center>
                    :
                    <>

                        <Center>
                            <Box for="blog-list-container" my="2" p="8">

                                {projects.length > 0 ?
                                    <>
                                        <Grid templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(3, 1fr)"]} gap={5}>
                                            {

                                                projects.map((project) => (
                                                    <ProjectComponent aimationDuration={aimationDuration + 0.1} data={project} />
                                                ))
                                            }
                                        </Grid>
                                    </>

                                    :
                                    <>

                                        <Box w="100%" p="5">
                                            <Center>
                                                <Image src={Empty} w="40%" mt="12" />
                                            </Center>
                                        </Box>



                                    </>
                                }


                                {/* <ProjectComponent aimationDuration={aimationDuration + 0.2}  />
                            <ProjectComponent aimationDuration={aimationDuration + 0.3}  /> */}



                            </Box>
                        </Center>
                    </>

                }

            </Box>
            <Footer />

        </>
    )
}

export default ProjectListing
