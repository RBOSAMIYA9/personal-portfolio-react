import React from 'react'
import {

    Box, useToast

} from '@chakra-ui/react';
import { FaTwitter } from 'react-icons/fa'
import { FaFacebook } from 'react-icons/fa'
import { IoLogoWhatsapp } from 'react-icons/io'
import { FaLink } from 'react-icons/fa'
import { FaLinkedin } from 'react-icons/fa'
// import linkedin from '../images/linkedin.png'


// https://www.facebook.com/sharer/sharer.php?u=https://ravindra-portfolio.000webhostapp.com/demo-post-it-is/

// https://twitter.com/intent/tweet?url=https://ravindra-portfolio.000webhostapp.com/demo-post-it-is/&text="



// https://twitter.com/intent/tweet/?text=""&url=""
// encodedURI()+encodedURI("@_rb_23")+encodedURI("current url")




// https://www.facebook.com/sharer/sharer.php?u=encodedURI


// https://www.linkedin.com/shareArticle/?mini=true&url=()&title=()&summary=()&source=()



// const websiteUrl = "https://ravindra-portfolio.000webhostapp.com/how-to-drive-4-digits-seven-segment-with-arduino-using-just-3-pins/"


var encodedWebsiteURL = encodeURI(window.location.href) // getcurrent page url 
// var encodedWebsiteURL = encodeURI(websiteUrl) // getcurrent page url 

var encodedUsername = encodeURI('@_rb_23')
var twitterURL = `https://twitter.com/intent/tweet/?text=View this by ${encodedUsername}&url=${encodedWebsiteURL}`

var facebookURL = `https://www.facebook.com/sharer/sharer.php?u=${encodedWebsiteURL}`

var linkedinURL = `https://www.linkedin.com/shareArticle/?mini=true&url=${encodedWebsiteURL}`


function Sharebuttons({ variant }) {
    const toast = useToast()
    const toastIdRef = React.useRef()
    var IconSize;
    if (variant === "smaller") {
        console.log("smaller variant")
        IconSize = 20;
    }
    else {
        console.log("larger variant", variant)
        IconSize = 25
    }

    function addToast() {
        toastIdRef.current = toast({ description: "Copied" })
    }

    const copy = () => {

        var dummy = document.createElement('input'),
            text = window.location.href;

        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
        addToast()
    }
    return (
        <>
            <Box cursor="pointer" as="a" href={twitterURL} target="_blank" rel="noopener noreferrer" ><FaTwitter size={IconSize} /></Box>
            <Box cursor="pointer" as="a" href={facebookURL} target="_blank" rel="noopener noreferrer" ><FaFacebook size={IconSize} /></Box>
            <Box cursor="pointer" d={["block", "block", "none", "none"]} as="a" href="whatsapp://send?text=The text to share!" data-action="share/whatsapp/share" target="_blank" rel="noopener noreferrer"><IoLogoWhatsapp size={IconSize} /></Box>
            <Box cursor="pointer" d={["none", "none", "block", "block"]} as="a" href={linkedinURL} data-action="share/whatsapp/share" target="_blank" rel="noopener noreferrer"><FaLinkedin size={IconSize} /></Box>
            <Box cursor="pointer" as="a" onClick={() => copy()} ><FaLink size={IconSize} /></Box>
            {/* <Image src={linkedin} w={`${IconSize.toString()}px`} h={`${IconSize.toString()}px`} /> */}
        </>
    )
}

export default Sharebuttons
