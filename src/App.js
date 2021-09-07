import React, { Suspense } from 'react';
import { lazy } from '@loadable/component'
import {
  ChakraProvider,
  extendTheme, Spinner, Center, Box
} from '@chakra-ui/react';

import "@fontsource/bebas-neue";


// import Home from './pages/HomePage'
// import Blog from './pages/BlogListing'
// import ProjectListing from './pages/ProjectListing'
// import BlogPost from './pages/BlogPost'
// import ProjectDesctiption from './pages/ProjectDesctiption'
// import CategoryListing from './pages/CategoryListing'


import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";



const Home = lazy(() => import('./pages/HomePage'));
const Blog = lazy(() => import('./pages/BlogListing'));
const ProjectListing = lazy(() => import('./pages/ProjectListing'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const ProjectDesctiption = lazy(() => import('./pages/ProjectDesctiption'));
const CategoryListing = lazy(() => import('./pages/CategoryListing'));


// inspiration
// https://raptis.wtf/blog/create-a-navbar-with-chakra-ui-react/

function App() {
  const theme = extendTheme({
    fonts: {
      heading: "Bebas Neue",
      body: "inter",
    },
    colors: {
      "royalBlue": "#1D4ED8",
      "bodyBackground": "#ebf2ff"
    },
    // textStyles: {
    //   h1: {
    //     // you can also use responsive styles
    //     fontSize: "4rem",
    //     fontWeight: "bold",
    //     lineHeight: "110%",
    //     letterSpacing: "-2%",
    //   },
    //   h2: {
    //     fontSize: "3rem",
    //     fontWeight: "semibold",
    //     lineHeight: "110%",
    //     letterSpacing: "-1%",
    //   },
    //   h3: {
    //     fontSize: "2rem",
    //     fontWeight: "semibold",
    //     lineHeight: "110%",
    //     letterSpacing: "-1%",
    //   },
    //   h4: {
    //     fontSize: "1rem",
    //     fontWeight: "semibold",
    //     lineHeight: "110%",
    //     letterSpacing: "-1%",
    //   },
    // },
    components: {
      Button: {
        variants: {
          primary: {
            bg: "#1D4ED8",
            color: "white",
            fontWeight: "400",
            boxShadow: "0 4px 8px 0 royalBlue",
            _hover: {
              boxShadow: "unset"
            },
            _focus: {
              color: "white.500"
            },
            _active: {
              color: "white.200"
            }

          },
          secondary: {
            border: "2px solid royalBlue",
            color: "royalBlue",
            fontWeight: "400",

            _hover: {
              boxShadow: "0 4px 8px 0 royalBlue",
            },
            _focus: {
              color: "white.500"
            },
            _active: {
              color: "white.200"
            }
          }
        }
      }
    }
  })
  const renderLoader = () => <>
    <Box>

      
        <Center w="100%" minH="100vh">
          <Spinner size="xl" mt="12" />
        </Center>
      
    </Box>
  </>;
  return (
    <ChakraProvider theme={theme}>
      <Suspense fallback={renderLoader()}>
        <Router>
          <Switch>
            <Route path="/" exact={true}>
              <Home />
            </Route>
            <Route path="/blog/:id" exact={true} >
              <BlogPost />
            </Route>
            <Route path="/blog" exact={true}>
              <Blog />
            </Route>
            <Route path="/projects/:id" exact={true} >
              <ProjectDesctiption />
            </Route>
            <Route path="/projects" exact={true}>
              <ProjectListing />
            </Route>
            <Route path="/category/:id" exact={true} >
              <CategoryListing />
            </Route>


          </Switch>


        </Router>
      </Suspense>
    </ChakraProvider>
  );
}

export default App;
