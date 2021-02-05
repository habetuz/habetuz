document.getElementById("logo").addEventListener("transitionend", onLogoTransformationEnd)
document.getElementById("logo").addEventListener('click', function(e) {
    if(logoCollapsed) {
        hideAll()
        expandLogo()
    }
})
document.getElementById("scroll_arrows").addEventListener('click', function(e) {
    collapseLogo()
    showSocialMedia()
})
document.addEventListener("wheel", scroll)

document.getElementById("about").addEventListener("click", function(e) {
    if(aboutOpen) {
        hideAbout()
    } else {
        showAbout()
    }
})

var logoCollapsed = false
var aboutOpen = false
var socialMediaOpen = false

var lastBevorAbout

loadUrl()

function scroll(event) {
    if(event.deltaY > 0 && !logoCollapsed) {
        collapseLogo()
        showSocialMedia()
    } else if(socialMediaOpen) {
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
    console.log(logoCollapsed)
    if(!logoCollapsed) {
        document.getElementById("scroll_arrows").style.removeProperty("transition-delay")
        document.getElementById("scroll_arrows").style.removeProperty("transform")
    }
}

function hideAll() {
    if(aboutOpen) hideAbout()
    if(socialMediaOpen) hideSocialMedia()
}

function showSocialMedia() {
    document.getElementById("social_media_wrapper").style.bottom = "50%"
    socialMediaOpen = true;
}

function hideSocialMedia() {
    document.getElementById("social_media_wrapper").style.removeProperty("bottom")
    socialMediaOpen = false;
}

function showAbout() {
    if(socialMediaOpen)     lastBevorAbout = showSocialMedia
    else if(!logoCollapsed) lastBevorAbout = expandLogo

    collapseLogo()
    hideAll()

    document.getElementById("about").style.transform = "translate(-50%,50%)"
    document.getElementById("about").style.fontSize = "30px"
    document.getElementById("about").style.left = "50%"
    document.getElementById("about").style.bottom = "70%"

    aboutOpen = true
}

function hideAbout() {
    document.getElementById("about").style.removeProperty("transform")
    document.getElementById("about").style.removeProperty("font-size")
    document.getElementById("about").style.removeProperty("left")
    document.getElementById("about").style.removeProperty("bottom")

    lastBevorAbout()

    aboutOpen = false
}

function loadUrl() {
    var anchor = document.URL.split('#')[1]
    if(anchor == null) return

    switch(anchor) {
        case "about":
            showAbout()
            lastBevorAbout = expandLogo
            break
        default:
            window.location.replace(window.location.pathname);
    }
}