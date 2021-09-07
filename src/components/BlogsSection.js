import React, { useEffect, useState } from 'react'
import {

    Box, Text,
    Spinner, Center, Grid,
    Button, Heading, Divider, useColorMode


} from '@chakra-ui/react';
import BlogComponent from './BlogComponent'
import {
    Link
} from "react-router-dom";
import WPAPI from 'wpapi';
import Error from "./ErrorComponent";

// Football@10

const url = "https://ravindra-portfolio.000webhostapp.com/wp-json/"


const wp = new WPAPI({
    endpoint: url,
});

function BlogsSection() {

    // eslint-disable-next-line 
    const { colorMode, toggleColorMode } = useColorMode();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)
    const [post, setPost] = useState(null);
    useEffect(() => {

        setLoading(true);


        wp.posts().get().then((data) => {
            var firstThreePost = [];
            // console.log("data", data.length)
            if (data.length > 0) {
                for (var i = 0; i < 3; i++) {
                    if (data[i] !== undefined) {
                        firstThreePost = [...firstThreePost, data[i]]
                    }
                    // firstThreePost = [...firstThreePost, data[i]]
                }
                // console.log("data", firstThreePost)
                setPost(firstThreePost)
            }

            setLoading(false);
        }).catch((error) => {
            console.log("error in fetching post", error);
            setError(true);
        });



        // eslint-disable-next-line 
    }, [])


    var animationDuration = 0.4;
    return (
        <>
            <Box bg={colorMode === "light" ? "bodyBackground" : ""} id="blogs">
                <Heading textAlign="center" fontWeight="500" >Blogs</Heading>
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
                                    {post && post.map((blogPost) => (
                                        <>

                                            <BlogComponent animationDuration={animationDuration = animationDuration + 0.1} key={blogPost.id} data={blogPost} />
                                        </>
                                    ))}
                                </Grid>
                                {/* </Box> */}


                                {
                                    post ?
                                        <Box textAlign="center">
                                            <Link to="/blog">
                                                <Button variant="primary">View More</Button>
                                            </Link>
                                        </Box>
                                        :
                                        <Box w="100%" mt="-12">
                                            <Center>
                                                <Text>No Blogpost  found</Text>
                                            </Center>

                                        </Box>

                                }
                            </>
                        )}
                </>}



                <Center>
                    <Divider w="80vw" borderColor="gray" my="5" />
                </Center>

            </Box>
        </>
    )
}

export default BlogsSection






