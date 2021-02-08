document.getElementById("logo").addEventListener("transitionend", onLogoTransformationEnd)
document.getElementById("about").addEventListener("transitionend", onAboutTransformationEnd)
document.getElementById("youtube").addEventListener("transitionend", onYoutubeTransformationEnd)
document.getElementById("instagram").addEventListener("transitionend", onInstagramTransformationEnd)
document.getElementById("github").addEventListener("transitionend", onGithubTransformationEnd)

document.getElementById("logo").addEventListener('click', function() {
    if(logoCollapsed) {
        hideAll()
        expandLogo()
    }
})
document.getElementById("scroll_arrows").addEventListener('click', function() {
    collapseLogo()
    showSocialMedia()
})
document.getElementById("about").addEventListener("click", function() {
    if(aboutOpen) {
        hideAbout()
        afterAboutHide()
    } else {
        showAbout()
    }
})
document.getElementById("about_text_photography").addEventListener("click", function() {
    hideAbout()
    showInstagram()
})
document.getElementById("about_text_filming").addEventListener("click", function() {
    hideAbout()
    showYoutube()
})
document.getElementById("about_text_programming").addEventListener("click", function() {
    hideAbout()
    showGithub()
})
document.getElementById("youtube").addEventListener("click", function() {
    if(youtubeOpen) {
        hideYoutube()
        showSocialMedia()
    } else {
        showYoutube()
    }
})
document.getElementById("instagram").addEventListener("click", function() {
    if(instagramOpen) {
        hideInstagram()
        showSocialMedia()
    } else {
        showInstagram()
    }
})
document.getElementById("github").addEventListener("click", function() {
    if(githubOpen) {
        hideGithub()
        showSocialMedia()
    } else {
        showGithub()
    }
})

document.addEventListener("wheel", scroll)
window.addEventListener("resize", function(event) {
    if(socialMediaOpen) showSocialMedia()
})

var picuresIndexOffset = 1

var logoCollapsed = false
var aboutOpen = false
var socialMediaOpen = false
var youtubeOpen = false
var instagramOpen = false
var githubOpen = false
var instagramOpen = false

var youtubeLoaded = false

var afterAboutHide

var videoSources = [
    "https://www.youtube-nocookie.com/embed/-i2GwcvDA1s",
    "https://www.youtube-nocookie.com/embed/k5O2HBL-euw",
    "https://www.youtube-nocookie.com/embed/sWHvbdEexeM",
    "https://www.youtube-nocookie.com/embed/5l95Jm90ilM",
    "https://www.youtube-nocookie.com/embed/oilqao_a-Hs",
    "https://www.youtube-nocookie.com/embed/T55dDCaWBFg",
]
var video = document.createElement("iframe")
video.classList.add("video")
video.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
video.allowFullscreen = true
video.frameBorder = 0

loadUrl()

window.onscroll = function() {
    if(window.pageYOffset > 150) {
        document.getElementById("logo").style.opacity = "0"
        if(!aboutOpen) {
            if(youtubeOpen) {
                document.getElementById("instagram").style.opacity = "0"
                document.getElementById("github").style.opacity = "0"
            }
        }
    } else {
        document.getElementById("logo").style.removeProperty("opacity")

        document.getElementById("instagram").style.removeProperty("opacity")
        document.getElementById("github").style.removeProperty("opacity")
    }
}

function scroll(event) {
    if(event.deltaY > 0 && !logoCollapsed) {
        collapseLogo()
        showSocialMedia()
    } else if(event.deltaY < 0 && socialMediaOpen) {
        expandLogo()
        hideSocialMedia()
    }
}

function collapseLogo() {
    if(!logoCollapsed) {
        document.getElementById("logo_disapear").style.opacity = "0";
        document.getElementById("logo_disapear").style.transitionDelay = "0s"
    
        document.getElementById("logo_H").style.transform = "translate(" + -452.5 + "px, " + 0.5 + "px)"
    
        document.getElementById("logo").style.left = 170 + "px"
        document.getElementById("logo").style.top = 50 + "px"
        document.getElementById("logo").style.width = "300px"
    
        document.getElementById("scroll_arrows").style.transitionDelay = ("0s")
        document.getElementById("scroll_arrows").style.transform = "translate(-50%, -500px) scale(0)"
        
        logoCollapsed = true
    }
}

function expandLogo() {
    if(logoCollapsed) {
        pushState("")

        document.getElementById("logo_disapear").style.removeProperty("opacity")
        document.getElementById("logo_disapear").style.removeProperty("transition")
    
        document.getElementById("logo_H").style.removeProperty("transform")
    
        document.getElementById("logo").style.removeProperty("left")
        document.getElementById("logo").style.removeProperty("top")
        document.getElementById("logo").style.removeProperty("width")
    
        document.getElementById("scroll_arrows").style.transitionDelay = ("0.5s")
        document.getElementById("scroll_arrows").style.removeProperty("transform")
    
        logoCollapsed = false;
    }
}

function onLogoTransformationEnd() {
    if(!logoCollapsed) {
        document.getElementById("scroll_arrows").style.removeProperty("transition-delay")
        document.getElementById("scroll_arrows").style.removeProperty("transform")
    }
}

function hideAll() {
    if(aboutOpen) hideAbout()
    if(socialMediaOpen) hideSocialMedia()
    if(youtubeOpen) hideYoutube()
    if(instagramOpen) hideInstagram()
    if(githubOpen) hideGithub()
}

function showSocialMedia() {
    pushState("")
    Array.from(document.getElementsByClassName("social_media")).forEach(element => {
        if(window.innerWidth > 1000) element.style.top = "50%"
        element.style.visibility = "visible"
    });

    if(window.innerWidth <= 1000) {
        document.getElementById("youtube").style.top = "30%"
        document.getElementById("instagram").style.top = "50%"
        document.getElementById("github").style.top = "70%"
    }
    socialMediaOpen = true;
}

function hideSocialMedia() {
    Array.from(document.getElementsByClassName("social_media")).forEach(element => {
        element.style.removeProperty("top")
    });
    socialMediaOpen = false;
}

function onSocialMediaTransformationEnd() {
    console.log("socialMediaTransformationEnd")
    Array.from(document.getElementsByClassName("social_media")).forEach(element => {
        element.style.removeProperty("visibility")
        element.style.removeProperty("position")
    });
    document.getElementById("youtube_content").style.removeProperty("visibility")
    document.getElementById("youtube_content").style.removeProperty("position")
}

function showAbout() {
    pushState("about")
  
    if      (!logoCollapsed)    afterAboutHide = expandLogo    
    else if (socialMediaOpen)   afterAboutHide = showSocialMedia
    else if (youtubeOpen)       afterAboutHide = showYoutube
    else if (instagramOpen)     afterAboutHide = showInstagram
    else if (githubOpen)        afterAboutHide = showGithub
    
    collapseLogo()
    hideAll()

    document.getElementById("about").style.position = "absolute"
    document.getElementById("about").style.transform = "translate(-50%,50%)"
    document.getElementById("about").style.fontSize = "50px"
    document.getElementById("about").style.left = "50%"
    document.getElementById("about").style.bottom = "70%"
    if(window.innerWidth < 780) document.getElementById("about").style.backgroundSize = "100% 3px"

    document.getElementById("about_text").style.visibility = "visible"
    document.getElementById("about_text").style.position = "absolute"
    document.getElementById("about_text").style.top = "30%"

    aboutOpen = true
}

function hideAbout() {
    document.documentElement.scrollTop = 0;

    document.getElementById("about").style.removeProperty("transform")
    document.getElementById("about").style.removeProperty("font-size")
    document.getElementById("about").style.removeProperty("left")
    document.getElementById("about").style.removeProperty("bottom")
    document.getElementById("about").style.removeProperty("background-size")

    document.getElementById("about_text").style.removeProperty("top")

    aboutOpen = false
}

function onAboutTransformationEnd() {
    if(!aboutOpen) {
        document.getElementById("about").style.removeProperty("position")

        document.getElementById("about_text").style.removeProperty("visibility")
        document.getElementById("about_text").style.removeProperty("position")
    }
}

function showYoutube() {
    pushState("youtube")
    hideAll()

    if(!youtubeLoaded) {
        videoSources.forEach(source => {
            var copy = video.cloneNode(true)
            copy.src = source
            document.getElementById("youtube_content").appendChild(copy)
        })
        youtubeLoaded = true
    }

    Array.from(document.getElementsByClassName("social_media")).forEach(element => {
        element.style.visibility = "visible"
    });

    document.getElementById("youtube_content").style.top = "calc(30% + 100px)"
    document.getElementById("youtube_content").style.position = "absolute"

    document.getElementById("youtube").style.right = "50%"
    document.getElementById("youtube").style.top = "30%"
    document.getElementById("youtube").style.fontSize = "50px"
    document.getElementById("youtube").style.position = "absolute"
    if(window.innerWidth < 780) document.getElementById("youtube").style.backgroundSize = "100% 3px"

    document.getElementById("instagram").style.transform = "translate(0, 0)"
    document.getElementById("instagram").style.top = "10px"
    document.getElementById("instagram").style.right = "10px"
    document.getElementById("instagram").style.fontSize = "20px"

    document.getElementById("github").style.transform = "translate(0, 150%)"
    document.getElementById("github").style.top = "10px"
    document.getElementById("github").style.right = "10px"
    document.getElementById("github").style.fontSize = "20px"

    youtubeOpen = true
}

function hideYoutube() {
    document.documentElement.scrollTop = 0;

    document.getElementById("youtube_content").style.removeProperty("top")

    document.getElementById("youtube").style.removeProperty("right")
    document.getElementById("youtube").style.removeProperty("top")
    document.getElementById("youtube").style.removeProperty("font-size")
    document.getElementById("youtube").style.removeProperty("background-size")

    document.getElementById("instagram").style.removeProperty("transform")
    document.getElementById("instagram").style.removeProperty("top")
    document.getElementById("instagram").style.removeProperty("right")
    document.getElementById("instagram").style.removeProperty("font-size")

    document.getElementById("github").style.removeProperty("transform")
    document.getElementById("github").style.removeProperty("top")
    document.getElementById("github").style.removeProperty("right")
    document.getElementById("github").style.removeProperty("font-size")
    youtubeOpen = false
}

function onYoutubeTransformationEnd() {
    if(!youtubeOpen) {
        if(githubOpen || instagramOpen) {
            document.getElementById("youtube_content").style.removeProperty("position")
            document.getElementById("youtube").style.removeProperty("position")
        }
    }
}

function showInstagram() {
    pushState("instagram")
    hideAll()

    if(!instagramLoaded) {
        for(int i )
        youtubeLoaded = true
    }

    Array.from(document.getElementsByClassName("social_media")).forEach(element => {
        element.style.visibility = "visible"
    });

    /*
    document.getElementById("youtube_content").style.top = "calc(30% + 100px)"
    document.getElementById("youtube_content").style.position = "absolute"
    */
   
    document.getElementById("instagram").style.right = "50%"
    document.getElementById("instagram").style.top = "30%"
    document.getElementById("instagram").style.fontSize = "50px"
    document.getElementById("instagram").style.position = "absolute"
    if(window.innerWidth < 780) document.getElementById("instagram").style.backgroundSize = "100% 3px"

    document.getElementById("youtube").style.transform = "translate(0, 0)"
    document.getElementById("youtube").style.top = "10px"
    document.getElementById("youtube").style.right = "10px"
    document.getElementById("youtube").style.fontSize = "20px"

    document.getElementById("github").style.transform = "translate(0, 150%)"
    document.getElementById("github").style.top = "10px"
    document.getElementById("github").style.right = "10px"
    document.getElementById("github").style.fontSize = "20px"

    instagramOpen = true
}

function hideInstagram() {
    document.documentElement.scrollTop = 0;

    //document.getElementById("youtube_content").style.removeProperty("top")

    document.getElementById("instagram").style.removeProperty("right")
    document.getElementById("instagram").style.removeProperty("top")
    document.getElementById("instagram").style.removeProperty("font-size")
    document.getElementById("instagram").style.removeProperty("background-size")

    document.getElementById("youtube").style.removeProperty("transform")
    document.getElementById("youtube").style.removeProperty("top")
    document.getElementById("youtube").style.removeProperty("right")
    document.getElementById("youtube").style.removeProperty("font-size")

    document.getElementById("github").style.removeProperty("transform")
    document.getElementById("github").style.removeProperty("top")
    document.getElementById("github").style.removeProperty("right")
    document.getElementById("github").style.removeProperty("font-size")
    instagramOpen = false
}

function onInstagramTransformationEnd() {
    if(!instagramOpen) {
        if(!youtubeOpen && !githubOpen && !socialMediaOpen) {onSocialMediaTransformationEnd(); return}
        //document.getElementById("youtube_content").style.removeProperty("position")
        if(youtubeOpen || githubOpen) document.getElementById("instagram").style.removeProperty("position")
    }
}

function showGithub() {
    pushState("github")
    hideAll()

    /*
    if(!youtubeLoaded) {
        videoSources.forEach(source => {
            var copy = video.cloneNode(true)
            copy.src = source
            document.getElementById("youtube_content").appendChild(copy)
        })
        youtubeLoaded = true
    }
    */
    Array.from(document.getElementsByClassName("social_media")).forEach(element => {
        element.style.visibility = "visible"
    });
    /*
    document.getElementById("youtube_content").style.top = "calc(30% + 100px)"
    document.getElementById("youtube_content").style.position = "absolute"
    */

    document.getElementById("github").style.right = "50%"
    document.getElementById("github").style.top = "30%"
    document.getElementById("github").style.fontSize = "50px"
    document.getElementById("github").style.position = "absolute"
    if(window.innerWidth < 780) document.getElementById("github").style.backgroundSize = "100% 3px"

    document.getElementById("youtube").style.transform = "translate(0, 0)"
    document.getElementById("youtube").style.top = "10px"
    document.getElementById("youtube").style.right = "10px"
    document.getElementById("youtube").style.fontSize = "20px"

    document.getElementById("instagram").style.transform = "translate(0, 150%)"
    document.getElementById("instagram").style.top = "10px"
    document.getElementById("instagram").style.right = "10px"
    document.getElementById("instagram").style.fontSize = "20px"

    githubOpen = true
}

function hideGithub() {
    document.documentElement.scrollTop = 0;

    //document.getElementById("youtube_content").style.removeProperty("top")

    document.getElementById("github").style.removeProperty("right")
    document.getElementById("github").style.removeProperty("top")
    document.getElementById("github").style.removeProperty("font-size")
    document.getElementById("github").style.removeProperty("background-size")

    document.getElementById("instagram").style.removeProperty("transform")
    document.getElementById("instagram").style.removeProperty("top")
    document.getElementById("instagram").style.removeProperty("right")
    document.getElementById("instagram").style.removeProperty("font-size")

    document.getElementById("youtube").style.removeProperty("transform")
    document.getElementById("youtube").style.removeProperty("top")
    document.getElementById("youtube").style.removeProperty("right")
    document.getElementById("youtube").style.removeProperty("font-size")
    githubOpen = false
}

function onGithubTransformationEnd() {
    if(!githubOpen) {
        //document.getElementById("youtube_content").style.removeProperty("position")
        if(youtubeOpen || instagramOpen) document.getElementById("github").style.removeProperty("position")
    }
}

function loadUrl() {
    var anchor = document.URL.split('#')[1]
    if(anchor == null) return

    switch(anchor) {
        case "about":
            showAbout()
            afterAboutHide = expandLogo
            break
        case "youtube":
            collapseLogo()
            showYoutube()
            break
        case "instagram":
            collapseLogo()
            showInstagram()
            break
        case "github":
            collapseLogo()
            showGithub()
            break
        default:
            window.location.replace(window.location.pathname)
    }
}

function pushState(state) {
    if( window.history.state != state) {
        //console.log(state + " | " + window.history.state)
        if(state == "") {
            if(window.history.state != "start") window.history.replaceState("start", "", " ")
            return
        }
        window.history.replaceState(state, "", "#" + state)
    }
}