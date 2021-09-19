import React, { useEffect, useState } from 'react'
import {

    Box, Tag,
    Text, Image, Center,
    Spinner, useColorMode

} from '@chakra-ui/react';
import {
    Link
} from "react-router-dom";
import parse from 'html-react-parser';
import WPAPI from 'wpapi';
import '../pages/customStyles.css'
import NoImage from '../images/noImage.jpg'
import readingTime from 'reading-time';


const url = "https://ravindra-portfolio.000webhostapp.com/wp-json/"
// const url = "http://rb-portfolio.rf.gd/wp-json/wp/v2/posts"

const wp = new WPAPI({
    endpoint: url,
});


function BlogPostComponent({ postData, postCategories }) {
    // eslint-disable-next-line 
    const { colorMode, toggleColorMode } = useColorMode();
    const [imageUrl, setImageUrl] = useState("")
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false);
    const [postReadingTime, setPostReadingTime] = useState("")


    var postDate = new Date(postData.modified);
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    var slug = "/blog/" + postData.slug;


    const fetchData = () => {
        return new Promise((resolve, reject) => {
            const stats = readingTime(postData.content.rendered);
            setPostReadingTime(stats.text)
            // console.log("postdata", postData.featured_media)
            if (postData.featured_media > 0) {
                wp.media().id(postData.featured_media).get().then((data) => {
                    // console.log("data in media",data);
                    setImageUrl(data.guid.rendered);
                    resolve("done")
                }).catch((error) => {
                    console.log("no featured Image", error);
                })
            }
            else {
                // console.log("else ma ivu")
                setImageUrl(NoImage);
                resolve("noImage");
            }


        })
    }



    useEffect(() => {
        setLoading(true);

        var category = [];

        for (var i = 0; i <= postCategories.length; i++) {
            for (var j = 0; j <= postData.categories.length; j++) {
                if (postCategories[i]) {
                    // console.log("postCategories", postCategories[i].id)
                    // console.log("posta", postData.categories)
                    if (postCategories[i].id === postData.categories[j]) {
                        // console.log("mateched")
                        category = [...category, { "id": postData.categories[j], "name": postCategories[i].name }]
                    }
                }

            }

        }

        // console.log("category", category)
        setCategories(category);


        Promise.all([fetchData()]).then(values => {
            // console.log("values", values); // [3, 1337, "foo"]
            setLoading(false);
        });

        // eslint-disable-next-line 
    }, [])


    return (
        <>
            <Box bg={colorMode === "light" ? "#fff" : "gray.600"} borderRadius="lg" w={["90vw", "90vw", "70vw", "70vw"]} my="3" minH="20vh" d="flex" p="8" flexDirection={["column", "column", "row", "row"]} >
                {loading ?
                    <>
                        <Center w="100%">
                            <Spinner size="xl" />

                        </Center>

                    </>
                    :
                    <>
                        <Box minW="60%" order={["2", "2", "1", "1"]}>

                            <Text fontSize="sm" color="gray.400">{postDate.toLocaleDateString('default', options)}</Text>
                            <Box as="a" href={slug}>
                                <Text fontSize="4xl" as="h1" lineHeight="shorter" >{postData.title.rendered}</Text>
                            </Box>

                            <Text fontSize="xs" color="gray.400">{postReadingTime}</Text>
                            <Text fontSize="md" mt="3" as="p" pr="5"  >{parse(postData.excerpt.rendered)}</Text>

                            {categories.map((category) => (
                                <Link to={`/category/${category.name}`}>
                                    <Tag variant="solid" cursor="pointer" colorScheme="blackAlpha" m="2" key={category.id} >{category.name}</Tag>
                                </Link>
                            ))}

                        </Box>
                        <Box minW="40%" order={["1", "1", "2", "2"]} alignSelf="center" as="a" href={slug} >
                            {/* <Image src={"https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Hello_Web_Series_%28Wordmark%29_Logo.png/1200px-Hello_Web_Series_%28Wordmark%29_Logo.png"} /> */}

                            <Image src={imageUrl} />


                        </Box>

                    </>
                }


            </Box>
        </>
    )
}

export default BlogPostComponent
