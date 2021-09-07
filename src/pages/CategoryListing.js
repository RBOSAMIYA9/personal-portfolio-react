import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import {

    Box,
    Image, Center, Spinner,
    Heading, useColorMode

} from '@chakra-ui/react';
import WPAPI from 'wpapi';
import Empty from '../images/empty.svg'
import {
    useParams
} from "react-router-dom";
import BlogPost from '../components/BlogPostComponent';



const url = "https://ravindra-portfolio.000webhostapp.com/wp-json/"
// const url = "http://rb-portfolio.rf.gd/wp-json/wp/v2/posts"

const wp = new WPAPI({
    endpoint: url,
});


function CategoryListing() {
    let { id } = useParams();

    // eslint-disable-next-line 
    const { colorMode, toggleColorMode } = useColorMode();
    const [loading, setloading] = useState(false);
    const [postByCategory, setPostByCategory] = useState([]);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        // id = parseInt(id);
        setloading(true);
        console.log(id)
        wp.categories().get().then((allCategories) => {
            console.log("all category", allCategories)
            setCategories(allCategories);
            for (var i = 0; i < allCategories.length; i++) {
                if (allCategories[i].name === id) {
                    console.log("matched", allCategories[i].name)
                    wp.posts().categories(allCategories[i].id).get().then((data) => {
                        console.log("data of category", id, ": ", data);
                        setPostByCategory(data);
                        setloading(false);
                    })
                    break;
                }
            }
        });


        // eslint-disable-next-line 
    }, [])
    return (
        <>
            <Navbar />
            <Box minH="100vh" for="main-container" bg={colorMode === "light" ? "bodyBackground" : ""}>
                <Box for="hero-section">
                    <Heading textAlign="center" pt="8">Blog by category : {id} </Heading>


                    {/* category info can be show here */}


                    {/* <Text textAlign="center" >Actively writing about technology, finance etc.<br />
                        Here are some of my most recent thoughts and hacks I’ve published.</Text> */}
                </Box>







                {loading ? <>
                    <Center w="100%">
                        <Spinner size="xl" mt="12" />

                    </Center>
                </> : <>
                    <Center>
                        <Box for="blog-list-container" my="2">
                            {postByCategory.length > 0 ?
                                (
                                    postByCategory.map((post) => (
                                        <BlogPost postCategories={categories} postData={post} key={post.id} />
                                    ))
                                )



                                :
                                <>
                                    <Center>
                                        <Image src={Empty} w="30%" mt="12" />
                                    </Center>
                                </>
                            }

                            {/* <BlogPost />
                        <BlogPost /> */}
                        </Box>
                    </Center>
                </>}

            </Box>
            <Footer />

        </>
    )
}

export default CategoryListing
