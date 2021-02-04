document.getElementById("scroll_arrows").addEventListener('click', collapseLogo)

var logoCollapsed = false;

function collapseLogo() {
    document.getElementById("logo_disapear").style.opacity = "0";
    document.getElementById("logo_H").style.transform = "translate(" + -452.5 + "px, " + 0.5 + "px)"
    //document.getElementById("logo").style.left = (0.3*document.getElementById("long").getBoundingClientRect().width/2 + 20) + "px"
    //document.getElementById("logo").style.top = (0.3*document.getElementById("logo_M").getBoundingClientRect().height/2 + 20) + "px"
    document.getElementById("logo").style.left = 14 + "%"
    document.getElementById("logo").style.top = 5 + "%"
    document.getElementById("logo").style.transform = "scale(0.3) translate(-50%, -50%)"
    logoCollapsed = true;
}