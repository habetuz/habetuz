document.getElementById("logo").addEventListener("transitionend", onLogoTransformationEnd)
document.getElementById("about").addEventListener("transitionend", onAboutTransformationEnd)
document.getElementById("youtube_content").addEventListener("transitionend", onYoutubeTransformationEnd)

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
    } else {
        showAbout()
    }
})
document.getElementById("youtube").addEventListener("click", function() {
    if(youtubeOpen) {
        hideYoutube()
        showSocialMedia()
    } else {
        showYoutube()
    }
})

document.addEventListener("wheel", scroll)

var logoCollapsed = false
var aboutOpen = false
var socialMediaOpen = false
var youtubeOpen = false

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
}

function showSocialMedia() {
    pushState("")
    if(window.innerWidth > 780) Array.from(document.getElementsByClassName("social_media")).forEach(element => {
        element.style.top = "50%"
    });

    else {
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

function showAbout() {
    pushState("about")
  
    if      (!logoCollapsed)    afterAboutHide = expandLogo    
    else if (socialMediaOpen)   afterAboutHide = showSocialMedia
    else if (youtubeOpen)       afterAboutHide = showYoutube
    
    collapseLogo()
    hideAll()

    document.getElementById("about").style.position = "absolute"
    document.getElementById("about").style.transform = "translate(-50%,50%)"
    document.getElementById("about").style.fontSize = "30px"
    document.getElementById("about").style.left = "50%"
    document.getElementById("about").style.bottom = "70%"
    if(window.innerWidth < 780) document.getElementById("about").style.backgroundSize = "100% 3px"

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

    afterAboutHide()
}

function onAboutTransformationEnd() {
    if(!aboutOpen) {
        document.getElementById("about").style.removeProperty("position")
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
        document.getElementById("youtube_content").style.removeProperty("position")
        document.getElementById("youtube").style.removeProperty("position")
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
        default:
            window.location.replace(window.location.pathname)
    }
}

function pushState(state) {
    if(state == "") {
        window.history.replaceState("start", "", " ")
        return
    }
    window.history.replaceState(state, "", "#" + state)
}