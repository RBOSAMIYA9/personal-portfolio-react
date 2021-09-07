import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import {
    useParams
} from "react-router-dom";
import {

    Box, Tag,
    Text, Image, Center, Divider,
    useColorMode, Spinner

} from '@chakra-ui/react';
import {
    Link
} from "react-router-dom";
// import BlogPostComponent from '../components/BlogPostComponent';
import dp from '../images/RavindraBosamiyaDp.jpg'
import instagram from '../images/instagram.png'
import twitter from '../images/twitter.png'
import linkedin from '../images/linkedin.png'

import { AiFillStar } from 'react-icons/ai'
import WPAPI from 'wpapi';
import ShareBar from "../components/ShareBar";
import parse from 'html-react-parser';
import Empty from '../images/empty.svg'
import Sharebuttons from '../components/Sharebuttons'
import ContactData from '../contactInfo.json'
import readingTime from 'reading-time';
import { Helmet } from "react-helmet";

const url = "https://ravindra-portfolio.000webhostapp.com/wp-json/"

// const url = "http://rb-portfolio.rf.gd/wp-json/wp/v2/posts"

const wp = new WPAPI({
    endpoint: url,
});

//todo 
//add try catch in getElement By tag name in Table of content 



function BlogPost() {

    var options = { year: 'numeric', month: 'long', day: 'numeric' };

    let { id } = useParams();

    // eslint-disable-next-line 
    const { colorMode, toggleColorMode } = useColorMode();
    const [post, setPost] = useState(null);
    const [recomededPost, setRecomededPost] = useState(null);
    const [postDate, setPostDate] = useState(null);
    const [loading, setloading] = useState(false);
    const [categories, setCategories] = useState([])
    const [TOCcontent, setTOCcontent] = useState(null)
    const [imageUrl, setImageUrl] = useState("")
    const [postReadingTime, setPostReadingTime] = useState("")



    function shuffle(array) {
        var currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex !== 0) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    useEffect(() => {
        setloading(true);
        // console.log("id", id);



        wp.posts().slug(id).get().then((data) => {
            if (data.length > 0) {
                setPost(data[0]);
                try {
                    var doc = new DOMParser().parseFromString(data[0].content.rendered, "text/html");

                    var toc = doc.getElementsByClassName("toc_list");
                    // console.log("element by Id", toc.[0].getElementsByTagName('li')[0].getElementsByTagName('a')[0].href.split("#")[1])
                    var tocArr = []
                    var tableOfContent = toc[0];
                    // console.log("tableof content", tableOfContent)
                    for (var i = 0; i < tableOfContent.getElementsByTagName('li').length; i++) {
                        var tocObj = {
                            "no": tableOfContent.getElementsByTagName('li')[i].getElementsByTagName('span')[0].textContent,
                            "href": "#" + tableOfContent.getElementsByTagName('li')[i].getElementsByTagName('a')[0].href.split("#")[1],
                            "text": tableOfContent.getElementsByTagName('li')[i].getElementsByTagName('a')[0].textContent
                        }

                        // console.log("tocObj",tocObj)
                        tocArr = [...tocArr, tocObj]
                        setTOCcontent(tocArr);
                    }
                }
                catch (e) {
                    console.log("no table of content");
                    setTOCcontent(null);
                }

                var postDate = new Date(data[0].modified);
                // console.log("tocArr", tocArr)
                const stats = readingTime(data[0].content.rendered);
                // console.log("stats",stats)
                setPostReadingTime(stats.text)

                setPostDate(postDate)


                wp.posts().get().then((allpost) => {
                    var twoRandomPost = [];
                    // console.log("data f categoory", data);
                    var shuffledData = shuffle(allpost)

                    twoRandomPost = [...twoRandomPost, shuffledData[0]]
                    twoRandomPost = [...twoRandomPost, shuffledData[1]]

                    // setloading(false);


                    wp.categories().get().then((category) => {

                        setCategories(category);
                        for (var i = 0; i < twoRandomPost.length; i++) {
                            var categoryNameArr = [];
                            for (var j = 0; j < twoRandomPost[i].categories.length; j++) {
                                // console.log("categoryaaa", twoRandomPost[i].categories[j])

                                for (var k = 0; k < category.length; k++) {
                                    if (category[k].id === twoRandomPost[i].categories[j]) {
                                        //   console.log("matched","id",category[k].id,"name",category[k].name)
                                        categoryNameArr = [...categoryNameArr, category[k].name]


                                    }
                                }

                            }
                            // console.log("category arr", categoryNameArr)
                            twoRandomPost[i].categoryNames = categoryNameArr;
                        }
                        // console.log("twoRandomPost", twoRandomPost)
                        setRecomededPost(twoRandomPost);
                        // console.log("categoryNameArr", categoryNameArr);


                    }).catch((error) => { console.log("error occured in fetching category") })


                    wp.media().id(data[0].featured_media).get().then((data) => {
                        setImageUrl(data.guid.rendered);

                    }).catch((error) => { console.log("error occured in fetching media") })
                }).catch((error) => { console.log("error occured in getting post") })


            }





            setloading(false);
        })

        // eslint-disable-next-line 
    }, [])
    // console.log("id", id);


    // function removeTags(str) {
    //     if ((str === null) || (str === ''))
    //         return false;
    //     else
    //         str = str.toString();
    //     return str.replace(/(<([^>]+)>)/ig, '');
    // }

    const content = () => {
        if (loading) {
            return (<>
                <Helmet>

                    <title> loading... </title>

                </Helmet>
                <Center w="100%">
                    <Spinner size="xl" mt="12" />
                </Center>
            </>)
        }
        else if (post === null) {
            return (<>


                {/* <VStack>
                    <Center>
                        <Text textAlign="center" fontSize="2xl">Opps.. something went wrong</Text>
                        <Image src={Empty} w="30%" mt="12" />
                    </Center>
                </VStack> */}

                <Helmet>

                    <title> No blog </title>

                </Helmet>
                <Box w="100%">
                    <Text textAlign="center" fontSize="5xl">Opps.. something went wrong</Text>
                    <Center>
                        <Image src={Empty} w="30%" mt="12" />
                    </Center>
                </Box>
                {/* <Center>
                </Center> */}
            </>)
        }

        else {




            return (
                <>
                    <Helmet>

                        <title>{post.title.rendered}     </title>

                    </Helmet>
                    <Box h="100vh" position="sticky" top="5%" bottom="5%" w="20vw" p="8" d={["none", "none", "none", "block"]}>

                        {TOCcontent &&
                            <Box h="60vh"
                                overflowY="auto"
                                css={{
                                    '&::-webkit-scrollbar': {
                                        width: '4px',
                                    },
                                    '&::-webkit-scrollbar-track': {
                                        width: '6px',
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        background: "lightgray",
                                        borderRadius: '24px',
                                    },
                                }}
                            >
                                <Text as="h2" fontSize="xl" fontWeight="500">Table of content</Text>
                                <Box fontWeight="400">
                                    {TOCcontent.map((toc) => (
                                        <Box as="a" href={`${toc.href}`}>
                                            <Text as="span" d="block" fontSize="md" my="3" cursor="pointer" m="1">{toc.text}</Text>
                                        </Box>
                                    ))}


                                </Box>
                            </Box>
                        }

                    </Box>

                    <Box w={["100vw", "100vw", "100vw", "60vw"]} p="8">
                        <Text fontSize="4xl" as="h1">{post.title.rendered}</Text>
                        <Box d="flex" justifyContent="space-between" >
                            <Box d="flex" color="gray" flexGrow="2"><Text as="span">{postDate.toLocaleDateString('default', options)}</Text><Text as="span" mx="2">|</Text><Text as="span">{postReadingTime}</Text></Box>
                            <Box d={["none", "flex", "flex", "flex"]} justifyContent="space-between" flexGrow="1" >

                                <Sharebuttons variant={"smaller"} textToShare={`Check this out *${post.title.rendered}* \n\n ${window.location.href}`} />
                            </Box>
                        </Box>

                        <Text mt="4">
                            <Image src={imageUrl} />

                            {parse(post.content.rendered)}

                        </Text>

                        <ShareBar textToShare={`Check this out *${post.title.rendered}* \n\n ${window.location.href}`} />
                        <Divider my="8" borderColor="gray.400" />
                        <Box>
                            <Center flexDirection="column">
                                <Box bg="gray" p="1" borderRadius="50%" w="24px" color="white" >
                                    <AiFillStar />
                                </Box>
                                <Text mt="2" fontSize="xl">Recommended Articles</Text>

                            </Center>
                            <Box d="flex" justifyContent="space-between" flexDirection={["column", "column", "row", "row"]} >
                                {recomededPost && recomededPost.map((post) => (
                                    <Box w={["90%", "90%", "50%", "50%"]} borderRadius="md" bg={colorMode === "light" ? "#fff" : "gray.500"} p="4" m="2">
                                        <Box as="a" href={post.slug}>
                                            <Text as="h3" fontSize="2xl" key={Math.floor(Math.random()).toString()}>{post.title.rendered}</Text>
                                        </Box>


                                        {post.categoryNames.map((category) => (
                                            <Link to={`/category/${category}`} key={Math.floor(Math.random()).toString()}>
                                                <Tag variant="solid" cursor="pointer" colorScheme="blackAlpha" m="2" key={Math.floor(Math.random()).toString()} >{category}</Tag>
                                            </Link>
                                        ))}

                                        {/* <Tag colorScheme="gray" m="2">React</Tag> */}
                                    </Box>
                                ))}




                            </Box>

                        </Box>


                    </Box>
                    <Box h="100vh" top="20%" w="20vw" p="8" d={["none", "none", "none", "block"]} >
                        <Text as="span" d="block">Discover By category</Text>
                        <Box>
                            <Center>
                                <Box mt="2" d="flex" justifyContent="left" flexWrap="wrap">
                                    {categories.map((category) => (
                                        <Link to={`/category/${category.name}`} key={Math.floor(Math.random()).toString()}>
                                            <Tag variant="solid" bg="royalBlue" cursor="pointer" m="1" >{category.name}</Tag>
                                        </Link>
                                    ))}
                                </Box>

                            </Center>
                        </Box>

                        <Box bg={colorMode === "light" ? "#fff" : "gray.500"} p="5" borderRadius="lg" my="8">
                            <Text textAlign="center" as="span" d="block" fontSize="xl" fontWeight="500">Follow me</Text>
                            <Center>
                                <Image src={dp} borderRadius="50%" w="90px" />
                            </Center>
                            <Text textAlign="center" as="span" d="block" mt="2">Ravindra Bosamiya</Text>
                            <Box d="flex" mt="2" justifyContent="space-around">
                                <Box as="a" href={ContactData.instagram} target="_blank" rel="noopener noreferrer">
                                    <Image src={instagram} w="19px" h="19px" />
                                </Box>


                                <Box as="a" href={ContactData.twitter} target="_blank" rel="noopener noreferrer" >
                                    <Image src={twitter} w="21px" h="19px" />
                                </Box>



                                <Box as="a" href={ContactData.linkedIn} target="_blank" rel="noopener noreferrer">
                                    <Image src={linkedin} w="19px" h="19px" />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </>
            )
        }
    }

    return (
        <>
            <Navbar />
            <Box className="customStyles" minH="100vh" for="main-container" bg={colorMode === "light" ? "bodyBackground" : ""} d="flex">

                {content()}



            </Box>

            <Footer />
        </>
    )
}

export default BlogPost
