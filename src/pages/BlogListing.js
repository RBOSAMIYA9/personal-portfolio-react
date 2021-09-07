import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import BlogPost from '../components/BlogPostComponent';
import {

    Box, Tag,
    Text, Image, Center, Spinner,
    Heading, useColorMode

} from '@chakra-ui/react';
import WPAPI from 'wpapi';
import Empty from '../images/empty.svg'
import { Helmet } from "react-helmet";


const url = "https://ravindra-portfolio.000webhostapp.com/wp-json/"
// const url = "http://rb-portfolio.rf.gd/wp-json/wp/v2/posts"

const wp = new WPAPI({
    endpoint: url,
});


function BlogListing() {

    // eslint-disable-next-line 
    const { colorMode, toggleColorMode } = useColorMode();
    const [loading, setloading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [blogPosts, setBlogPosts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");

    useEffect(() => {
        setloading(true);
        wp.categories().get(function (err, data) {
            if (err) {
                // handle err
            }
            // do something with the returned posts
            console.log("categories: ", data)
            setCategories(data);

        });

        wp.posts().get(function (err, data) {
            if (err) {
                // handle err
            }
            // do something with the returned posts
            console.log("data", data);
            setBlogPosts(data);
            setloading(false);
        });

        // eslint-disable-next-line 
    }, [])

    const getDataByCategory = (id, name) => {
        setloading(true);
        setSelectedCategory(name);
        console.log("typeof id", typeof id);
        if (id > 0) {
            wp.posts().categories(id).get().then((data) => {
                // console.log("data of category",id,": ",data);
                setBlogPosts(data);
                setloading(false);
            })
        } else {
            wp.posts().get().then((data) => {
                // console.log("data of category",id,": ",data);
                setBlogPosts(data);
                setloading(false);
            })
        }

    }

    return (
        <>
            <Helmet>

                <title> Blogs </title>

            </Helmet>
            <Navbar />
            <Box minH="100vh" for="main-container" bg={colorMode === "light" ? "bodyBackground" : ""}>
                <Box for="hero-section">
                    <Heading textAlign="center" pt="8">Blog</Heading>
                    <Text textAlign="center" >Actively writing about technology, finance etc.<br />
                        Here are some of my most recent thoughts and hacks I’ve published.</Text>
                </Box>



                <Center>
                    <Box mt="8" d="flex" justifyContent="left" flexWrap="wrap" px="8">

                        <Tag variant="solid" bg={selectedCategory === "all" ? "gray" : "royalBlue"} cursor="pointer" m="2" onClick={() => getDataByCategory(0, "all")}>All</Tag>

                        {categories && categories.map(((category) => (
                            <>
                                {/* {console.log("category",category)} */}
                                <Tag variant="solid" bg={selectedCategory === category.name ? "gray" : "royalBlue"} cursor="pointer" m="2" onClick={() => getDataByCategory(category.id, category.name)} key={category.id}>{category.name}</Tag>
                            </>
                        )))}
                    </Box>

                </Center>


                {loading ? <>
                    <Center w="100%">
                        <Spinner size="xl" mt="12" />

                    </Center>
                </> : <>
                    <Center>
                        <Box for="blog-list-container" my="2">
                            {blogPosts && blogPosts.length > 0 ?
                                (
                                    blogPosts.map((post) => (
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

export default BlogListing
