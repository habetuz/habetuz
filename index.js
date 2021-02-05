document.getElementById("scroll_arrows").addEventListener('click', collapseLogo)
document.getElementById("logo").addEventListener("transitionend", logoTransformationEnd)
document.getElementById("logo").addEventListener('click', expandLogo)
document.addEventListener("wheel", scroll)

var collapsed = false


function collapseLogo() {
    if(!collapsed) {
        document.getElementById("logo_disapear").style.opacity = "0";
        document.getElementById("logo_disapear").style.transitionDelay = "0s"
    
        document.getElementById("logo_H").style.transform = "translate(" + -452.5 + "px, " + 0.5 + "px)"
    
        document.getElementById("logo").style.left = 170 + "px"
        document.getElementById("logo").style.top = 50 + "px"
        document.getElementById("logo").style.width = "300px"
    
        document.getElementById("scroll_arrows").style.transitionDelay = ("0s")
        document.getElementById("scroll_arrows").style.transform = "translate(-50%, -500px) scale(0)"
        
        document.getElementById("social_media_wrapper").style.bottom = "50%"
        collapsed = true
    }
}

function expandLogo() {
    if(collapsed) {
        document.getElementById("logo_disapear").style.removeProperty("opacity")
        document.getElementById("logo_disapear").style.removeProperty("transition")
    
        document.getElementById("logo_H").style.removeProperty("transform")
    
        document.getElementById("logo").style.removeProperty("left")
        document.getElementById("logo").style.removeProperty("top")
        document.getElementById("logo").style.removeProperty("width")
    
        document.getElementById("scroll_arrows").style.transitionDelay = ("0.5s")
        document.getElementById("scroll_arrows").style.removeProperty("transform")
    
        document.getElementById("social_media_wrapper").style.removeProperty("bottom")
        collapsed = false;
    }
}
function logoTransformationEnd() {
    if(!collapsed) {
        document.getElementById("scroll_arrows").style.removeProperty("transition-delay")
        document.getElementById("scroll_arrows").style.removeProperty("transform")
    }
}

function scroll(event) {
    if(event.deltaY > 0) {
        collapseLogo()
    } else {
        expandLogo()
    }
}