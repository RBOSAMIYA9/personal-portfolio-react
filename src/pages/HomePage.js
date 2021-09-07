import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import ProjectsSection from '../components/ProjectsSection'
import AboutSection from '../components/AboutSection'
import SkillsSection from '../components/SkillsSection'
import BlogsSection from '../components/BlogsSection'
import ContactMe from '../components/ContactMe';
import Footer from '../components/Footer';
import { Helmet } from "react-helmet";

function HomePage() {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>HomePage</title>

            </Helmet>
            <Navbar />
            <HeroSection />

            <ProjectsSection />
            <AboutSection />
            <SkillsSection />
            <BlogsSection />
            <ContactMe />
            <Footer />
        </>
    )
}

export default HomePage
