//================================================================================
// Transition-End events
//================================================================================
document.getElementById("logo").addEventListener("transitionend", onLogoTransformationEnd)
document.getElementById("about").addEventListener("transitionend", onAboutTransformationEnd)
document.getElementById("youtube").addEventListener("transitionend", onYoutubeTransformationEnd)
document.getElementById("instagram").addEventListener("transitionend", onInstagramTransformationEnd)
document.getElementById("github").addEventListener("transitionend", onGithubTransformationEnd)

//================================================================================
// Click events
//================================================================================
document.getElementById("logo").addEventListener('click', function () {
    if (logoCollapsed) {
        hideAll()
        expandLogo()
    }
})
document.getElementById("scroll_arrows").addEventListener('click', function () {
    collapseLogo()
    showSocialMedia()
})
document.getElementById("about").addEventListener("click", function () {
    if (aboutOpen) {
        hideAbout()
        afterAboutHide()
    } else {
        showAbout()
    }
})
document.getElementById("about_text_photography").addEventListener("click", function () {
    hideAbout()
    showInstagram()
})
document.getElementById("about_text_filming").addEventListener("click", function () {
    hideAbout()
    showYoutube()
})
document.getElementById("about_text_programming").addEventListener("click", function () {
    hideAbout()
    showGithub()
})
document.getElementById("youtube_text").addEventListener("click", function () {
    if (youtubeOpen) {
        hideYoutube()
        showSocialMedia()
    } else {
        showYoutube()
    }
})
document.getElementById("instagram_text").addEventListener("click", function () {
    if (instagramOpen) {
        hideInstagram()
        showSocialMedia()
    } else {
        showInstagram()
    }
})
document.getElementById("github_text").addEventListener("click", function () {
    if (githubOpen) {
        hideGithub()
        showSocialMedia()
    } else {
        showGithub()
    }
})

//================================================================================
// Scroll and resize event
//================================================================================
document.addEventListener("wheel", scroll)
window.addEventListener("resize", function (event) {
    if (socialMediaOpen) showSocialMedia()
    //if (instagramOpen) 
    evaluateImgHeight()
    onScroll()
})

//================================================================================
// Variables
//================================================================================
var picuresIndexOffset = 2
var logoCollapsed = false
var aboutOpen = false
var socialMediaOpen = false
var youtubeOpen = false
var instagramOpen = false
var githubOpen = false
var instagramOpen = false

var youtubeLoaded = false
var instagramLoaded = false

var videoSources = [
    "https://www.youtube-nocookie.com/embed/-i2GwcvDA1s",
    "https://www.youtube-nocookie.com/embed/k5O2HBL-euw",
    "https://www.youtube-nocookie.com/embed/sWHvbdEexeM",
    "https://www.youtube-nocookie.com/embed/5l95Jm90ilM",
    "https://www.youtube-nocookie.com/embed/oilqao_a-Hs",
    "https://www.youtube-nocookie.com/embed/T55dDCaWBFg",
]

var imageSources =  [
    "https://scontent-muc2-1.cdninstagram.com/v/t51.2885-15/e35/154841996_433133057905047_622665666126497654_n.jpg?tp=1&_nc_ht=scontent-muc2-1.cdninstagram.com&_nc_cat=103&_nc_ohc=ynZUfMrYM-wAX9wdo3v&oh=62373f7b2377d3cadf75077a0742948d&oe=6078C78D"
    "https://scontent-muc2-1.cdninstagram.com/v/t51.2885-15/e35/150930683_181202786745489_4513215446669063287_n.jpg?_nc_ht=scontent-muc2-1.cdninstagram.com&_nc_cat=109&_nc_ohc=06vNxidyzxIAX-FSei7&tp=1&oh=8fb1a9bdae8838e7ec064f81fe1a08cb&oe=60590744",
    "https://scontent-muc2-1.cdninstagram.com/v/t51.2885-15/e35/148677733_465074754870081_5233519034985198745_n.jpg?_nc_ht=scontent-muc2-1.cdninstagram.com&_nc_cat=109&_nc_ohc=fZe7BbwM1uwAX8cZSF3&tp=1&oh=5edf5bdead58ecb3f49e20f47a51d992&oe=60590F6D",
    "https://scontent-muc2-1.cdninstagram.com/v/t51.2885-15/e35/134165999_695804614470430_7520417803680114854_n.jpg?_nc_ht=scontent-muc2-1.cdninstagram.com&_nc_cat=110&_nc_ohc=uuStaepPniUAX_m20_Q&tp=1&oh=65b3d5f8f53c5e0bb49ea2a96f3095db&oe=605BDD2D",
    "https://scontent-muc2-1.cdninstagram.com/v/t51.2885-15/e35/131358127_404171174160433_4133502601081626654_n.jpg?_nc_ht=scontent-muc2-1.cdninstagram.com&_nc_cat=101&_nc_ohc=tXKqapBJvGkAX-b2J3b&tp=1&oh=656ce1ba944280a009e54893b3cf7300&oe=6059E6D4",
    "https://scontent-muc2-1.cdninstagram.com/v/t51.2885-15/e35/118250716_996374777492366_3778527168428544700_n.jpg?_nc_ht=scontent-muc2-1.cdninstagram.com&_nc_cat=102&_nc_ohc=NYSi5BlMtwgAX9lBZXL&tp=1&oh=bf16d7e670f3d8f2e349de3e22e9a17a&oe=605A8297",
    "https://scontent-muc2-1.cdninstagram.com/v/t51.2885-15/e35/105970917_131170625277310_6823877569953172664_n.jpg?_nc_ht=scontent-muc2-1.cdninstagram.com&_nc_cat=110&_nc_ohc=avA36Vr8OoAAX95YWrV&tp=1&oh=b64f96c19ae909ba0b342ab987c2ac45&oe=605A0161",
    "https://scontent-muc2-1.cdninstagram.com/v/t51.2885-15/e35/89715406_167218884249299_4048235952560079613_n.jpg?_nc_ht=scontent-muc2-1.cdninstagram.com&_nc_cat=111&_nc_ohc=2v76ZCdD42EAX9zSMjF&tp=1&oh=6067d2047262a4b7098e4b18066f6d6e&oe=605BF20E",
    "https://scontent-muc2-1.cdninstagram.com/v/t51.2885-15/e35/74704993_2399555703503722_6023033991962006533_n.jpg?_nc_ht=scontent-muc2-1.cdninstagram.com&_nc_cat=110&_nc_ohc=0qyKzW1ukeEAX8uS1nL&tp=1&oh=fa90be1f2b102502f181a965837103c2&oe=605B29B0",
    "https://scontent-muc2-1.cdninstagram.com/v/t51.2885-15/e35/67977141_773697193062871_5190500679055593464_n.jpg?_nc_ht=scontent-muc2-1.cdninstagram.com&_nc_cat=107&_nc_ohc=UYibOZSmkGIAX8jARIT&tp=1&oh=f4e7d7b984c41b88e262645570135a1d&oe=605BFA77",
    "https://scontent-muc2-1.cdninstagram.com/v/t51.2885-15/e35/69227703_745844959204847_1813274751136152880_n.jpg?_nc_ht=scontent-muc2-1.cdninstagram.com&_nc_cat=111&_nc_ohc=rR4BRmUvT3AAX8XXrTT&tp=1&oh=232298dbaae3c059250ae30a20165840&oe=605948B2",
    "https://scontent-muc2-1.cdninstagram.com/v/t51.2885-15/e35/67798585_2592293000815858_5241977088123087094_n.jpg?_nc_ht=scontent-muc2-1.cdninstagram.com&_nc_cat=110&_nc_ohc=DKmGPql0x_IAX9SIy4a&tp=1&oh=2c5e4a7de63af4de07a864775eac7354&oe=605A0E2F",
    "https://scontent-muc2-1.cdninstagram.com/v/t51.2885-15/e35/65257849_635446110200567_7454596521475907995_n.jpg?_nc_ht=scontent-muc2-1.cdninstagram.com&_nc_cat=111&_nc_ohc=vLjLyvU_haEAX80sDfy&tp=1&oh=2c3fe01b4c94afbc10591be2f09f5656&oe=605CAFCB"
]

var imageLinks = [
    "https://www.instagram.com/p/CLv0141Hm4f/"
    "https://www.instagram.com/p/CLd42R-HSef/",
    "https://www.instagram.com/p/CLMF2TKnGGt/",
    "https://www.instagram.com/p/CJdzvsKHJkd/",
    "https://www.instagram.com/p/CI_BndknTSt/",
    "https://www.instagram.com/p/CEPEGHbnaSS/",
    "https://www.instagram.com/p/CB0bRDTnJMp/",
    "https://www.instagram.com/p/B9wscMjHnsC/",
    "https://www.instagram.com/p/B4-EKpfqkBF/",
    "https://www.instagram.com/p/B2Zs0jaC9I5/",
    "https://www.instagram.com/p/B1im_m-CtB5/",
    "https://www.instagram.com/p/B1Q2J0rihVb/",
    "https://www.instagram.com/p/BzBYeY1i_4w/"
]

//================================================================================
// Initialization
//================================================================================
loadUrl()
window.onscroll = onScroll

//================================================================================
// Scroll handler
//================================================================================
function onScroll() {

    if (window.pageYOffset > 100 && window.innerWidth < 800) {
        document.getElementById("logo").style.opacity = "0"
        if (!aboutOpen) {
            if (!youtubeOpen) document.getElementById("youtube").style.opacity = "0"
            if (!instagramOpen) document.getElementById("instagram").style.opacity = "0"
            if (!githubOpen) document.getElementById("github").style.opacity = "0"
        }
    } else {
        document.getElementById("logo").style.removeProperty("opacity")
        document.getElementById("youtube").style.removeProperty("opacity")
        document.getElementById("instagram").style.removeProperty("opacity")
        document.getElementById("github").style.removeProperty("opacity")
    }

}

function scroll(event) {
    if (event.deltaY > 0 && !logoCollapsed) {
        collapseLogo()
        showSocialMedia()
    } else if (event.deltaY < 0 && socialMediaOpen) {
        expandLogo()
        hideSocialMedia()
    }
}

//================================================================================
// Logo handler
//================================================================================
function collapseLogo() {
    if (!logoCollapsed) {
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
    if (logoCollapsed) {
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
    if (!logoCollapsed) {
        document.getElementById("scroll_arrows").style.removeProperty("transition-delay")
        document.getElementById("scroll_arrows").style.removeProperty("transform")
    }
}

//================================================================================
// General 
//================================================================================
function hideAll() {
    if (aboutOpen) hideAbout()
    if (socialMediaOpen) hideSocialMedia()
    if (youtubeOpen) hideYoutube()
    if (instagramOpen) hideInstagram()
    if (githubOpen) hideGithub()
}

//================================================================================
// Social media handler
//================================================================================
function showSocialMedia() {
    pushState("")
    Array.from(document.getElementsByClassName("social_media")).forEach(element => {
        if (window.innerWidth > 1000) element.style.top = "50%"
        element.style.visibility = "visible"
    });

    if (window.innerWidth <= 1000) {
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
    Array.from(document.getElementsByClassName("social_media")).forEach(element => {
        element.style.removeProperty("visibility")
        element.style.removeProperty("position")
    });
    document.getElementById("youtube_content").style.removeProperty("visibility")
    document.getElementById("youtube_content").style.removeProperty("position")
}

//================================================================================
// About handler
//================================================================================
function showAbout() {
    pushState("about")

    if (!logoCollapsed) afterAboutHide = expandLogo
    else if (socialMediaOpen) afterAboutHide = showSocialMedia
    else if (youtubeOpen) afterAboutHide = showYoutube
    else if (instagramOpen) afterAboutHide = showInstagram
    else if (githubOpen) afterAboutHide = showGithub

    collapseLogo()
    hideAll()

    document.getElementById("about").style.position = "absolute"
    document.getElementById("about").style.transform = "translate(-50%,50%)"
    document.getElementById("about").style.fontSize = "50px"
    document.getElementById("about").style.left = "50%"
    document.getElementById("about").style.bottom = "80%"
    if (window.innerWidth < 780) document.getElementById("about").style.backgroundSize = "100% 3px"

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
    if (!aboutOpen) {
        document.getElementById("about").style.removeProperty("position")

        document.getElementById("about_text").style.removeProperty("visibility")
        document.getElementById("about_text").style.removeProperty("position")
    }
}

//================================================================================
// YouTube handler
//================================================================================
function showYoutube() {
    pushState("youtube")
    hideAll()

    if (!youtubeLoaded) {
        var video = document.createElement("iframe")
        video.classList.add("video")
        video.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        video.allowFullscreen = true
        video.frameBorder = 0
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
    document.getElementById("youtube").style.position = "absolute"

    document.getElementById("youtube_text").style.fontSize = "50px"

    if (window.innerWidth < 780) {
        document.getElementById("youtube_text").style.backgroundSize = "100% 3px"
        document.getElementById("youtube").style.transform = "translate(calc(50% + 23px), -50%) scale(0.7)"
    }

    document.getElementById("youtube_link").style.opacity = "1"

    document.getElementById("instagram").style.transform = "translate(0, 0)"
    document.getElementById("instagram").style.top = "10px"
    document.getElementById("instagram").style.right = "-25px"

    document.getElementById("instagram_text").style.fontSize = "20px"

    document.getElementById("github").style.transform = "translate(0, 80%)"
    document.getElementById("github").style.top = "10px"
    document.getElementById("github").style.right = "-25px"

    document.getElementById("github_text").style.fontSize = "20px"

    youtubeOpen = true
}

function hideYoutube() {
    document.documentElement.scrollTop = 0;

    document.getElementById("youtube_content").style.removeProperty("top")

    document.getElementById("youtube").style.removeProperty("right")
    document.getElementById("youtube").style.removeProperty("top")
    document.getElementById("youtube").style.removeProperty("transform")

    document.getElementById("youtube_text").style.removeProperty("font-size")
    document.getElementById("youtube_text").style.removeProperty("background-size")

    document.getElementById("youtube_link").style.removeProperty("opacity")

    document.getElementById("instagram").style.removeProperty("transform")
    document.getElementById("instagram").style.removeProperty("top")
    document.getElementById("instagram").style.removeProperty("right")

    document.getElementById("instagram_text").style.removeProperty("font-size")

    document.getElementById("github").style.removeProperty("transform")
    document.getElementById("github").style.removeProperty("top")
    document.getElementById("github").style.removeProperty("right")

    document.getElementById("github_text").style.removeProperty("font-size")

    youtubeOpen = false
}

function onYoutubeTransformationEnd() {
    if (!youtubeOpen) {
        document.getElementById("youtube_content").style.removeProperty("position")
        document.getElementById("youtube").style.removeProperty("position")
    }
}

//================================================================================
// Instagram handler
//================================================================================
function showInstagram() {
    pushState("instagram")
    hideAll()

    if (!instagramLoaded) {
        for(var i = 0; i < imageSources.length; i++) {
            var image = document.createElement("img")
            image.classList.add("image")
            image.src = imageSources[i]

            var link = document.createElement("a")
            link.href = imageLinks[i]
            link.target = "blank"
            link.appendChild(image)
            //image.onmouseover = mouseOverImage
            //image.onmouseout = mouseOutImage
            document.getElementById("instagram_content").appendChild(link)
        }
        instagramLoaded = true
        document.getElementById("instagram_content").children[0].children[0].onload = evaluateImgHeight
    }

    Array.from(document.getElementsByClassName("social_media")).forEach(element => {
        element.style.visibility = "visible"
    });

    evaluateImgHeight()

    document.getElementById("instagram_content").style.top = "calc(30% + 100px)"
    document.getElementById("instagram_content").style.position = "absolute"
    document.getElementById("instagram_content").style.visibility = "visible"

    document.getElementById("instagram").style.right = "50%"
    document.getElementById("instagram").style.top = "30%"
    document.getElementById("instagram").style.position = "absolute"

    document.getElementById("instagram_text").style.fontSize = "50px"

    if (window.innerWidth < 780) {
        document.getElementById("instagram_text").style.backgroundSize = "100% 3px"
        document.getElementById("instagram").style.transform = "translate(calc(50% + 23px), -50%) scale(0.7)"
    }

    document.getElementById("instagram_link").style.opacity = "1"

    document.getElementById("youtube").style.transform = "translate(0, 0)"
    document.getElementById("youtube").style.top = "10px"
    document.getElementById("youtube").style.right = "-25px"

    document.getElementById("youtube_text").style.fontSize = "20px"

    document.getElementById("github").style.transform = "translate(0, 80%)"
    document.getElementById("github").style.top = "10px"
    document.getElementById("github").style.right = "-25px"

    document.getElementById("github_text").style.fontSize = "20px"

    instagramOpen = true
}

function hideInstagram() {
    document.documentElement.scrollTop = 0;

    document.getElementById("instagram_content").style.removeProperty("top")
    
    document.getElementById("instagram").style.removeProperty("right")
    document.getElementById("instagram").style.removeProperty("top")
    document.getElementById("instagram").style.removeProperty("transform")

    document.getElementById("instagram_text").style.removeProperty("font-size")
    document.getElementById("instagram_text").style.removeProperty("background-size")

    document.getElementById("instagram_link").style.removeProperty("opacity")

    document.getElementById("youtube").style.removeProperty("transform")
    document.getElementById("youtube").style.removeProperty("top")
    document.getElementById("youtube").style.removeProperty("right")

    document.getElementById("youtube_text").style.removeProperty("font-size")

    document.getElementById("github").style.removeProperty("transform")
    document.getElementById("github").style.removeProperty("top")
    document.getElementById("github").style.removeProperty("right")

    document.getElementById("github_text").style.removeProperty("font-size")

    instagramOpen = false
}

function onInstagramTransformationEnd() {
    if (!instagramOpen) {
        if (!youtubeOpen && !githubOpen && !socialMediaOpen) onSocialMediaTransformationEnd()
        document.getElementById("instagram").style.removeProperty("position")
        document.getElementById("instagram_content").style.removeProperty("position")
        document.getElementById("instagram_content").style.removeProperty("visibility")
    }
}

function evaluateImgHeight() {
    if (instagramLoaded && window.innerWidth >= 780) document.getElementById("instagram_content").style.transform = "translate(-50%, -" + (document.getElementById("instagram_content").children[0].children[0].clientHeight / 2) + "px)"
    else document.getElementById("instagram_content").style.transform = "translateX(-50%)"
}

//================================================================================
// Github handler
//================================================================================
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
    
    document.getElementById("github_content").style.top = "calc(30% + 100px)"
    document.getElementById("github_content").style.position = "absolute"
    

    document.getElementById("github").style.right = "50%"
    document.getElementById("github").style.top = "30%"
    document.getElementById("github").style.position = "absolute"

    document.getElementById("github_text").style.fontSize = "50px"

    if (window.innerWidth < 780) {
        document.getElementById("github_text").style.backgroundSize = "100% 3px"
        document.getElementById("github").style.transform = "translate(calc(50% + 23px), -50%) scale(0.7)"
    }

    document.getElementById("github_link").style.opacity = "1"

    document.getElementById("youtube").style.transform = "translate(0, 0)"
    document.getElementById("youtube").style.top = "10px"
    document.getElementById("youtube").style.right = "-25px"

    document.getElementById("youtube_text").style.fontSize = "20px"

    document.getElementById("instagram").style.transform = "translate(0, 80%)"
    document.getElementById("instagram").style.top = "10px"
    document.getElementById("instagram").style.right = "-25px"

    document.getElementById("instagram_text").style.fontSize = "20px"

    githubOpen = true
}

function hideGithub() {
    document.documentElement.scrollTop = 0;

    //document.getElementById("youtube_content").style.removeProperty("top")

    document.getElementById("github").style.removeProperty("right")
    document.getElementById("github").style.removeProperty("top")
    document.getElementById("github").style.removeProperty("transform")

    document.getElementById("github_text").style.removeProperty("font-size")
    document.getElementById("github_text").style.removeProperty("background-size")

    document.getElementById("github_link").style.removeProperty("opacity")

    document.getElementById("instagram").style.removeProperty("transform")
    document.getElementById("instagram").style.removeProperty("top")
    document.getElementById("instagram").style.removeProperty("right")

    document.getElementById("instagram_text").style.removeProperty("font-size")

    document.getElementById("youtube").style.removeProperty("transform")
    document.getElementById("youtube").style.removeProperty("top")
    document.getElementById("youtube").style.removeProperty("right")

    document.getElementById("youtube_text").style.removeProperty("font-size")

    githubOpen = false
}

function onGithubTransformationEnd() {
    if (!githubOpen) {
        //document.getElementById("youtube_content").style.removeProperty("position")
        document.getElementById("github").style.removeProperty("position")
    }
}

//================================================================================
// URL handler
//================================================================================
function loadUrl() {
    var anchor = document.URL.split('#')[1]
    if (anchor == null) return

    switch (anchor) {
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
    if (window.history.state != state) {
        //console.log(state + " | " + window.history.state)
        if (state == "") {
            if (window.history.state != "start") window.history.replaceState("start", "", " ")
            return
        }
        window.history.replaceState(state, "", "#" + state)
    }
}
