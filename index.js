document.getElementById("scroll_arrows").addEventListener('click', collapseLogo)
document.getElementById("logo").addEventListener('click', expandLogo)

var logoCollapsed = false;

function collapseLogo() {
    document.getElementById("logo_disapear").style.opacity = "0";
    document.getElementById("logo_H").style.transform = "translate(" + -452.5 + "px, " + 0.5 + "px)"
    document.getElementById("logo").style.left = 170 + "px"
    document.getElementById("logo").style.top = 50 + "px"
    document.getElementById("logo").style.transform = "scale(0.3) translate(-50%, -50%)"
    document.getElementById("logo").style.maxWidth = 100000 + "%"
    document.getElementById("logo").
    logoCollapsed = true;
}

function expandLogo() {
    document.getElementById("logo_disapear").style.opacity = "1";
    document.getElementById("logo_H").style.transform = "translate( 0,0)"
    document.getElementById("logo").style.left = "50%"
    document.getElementById("logo").style.top = "50%"
    document.getElementById("logo").style.transform = "scale(1) translate(-50%, -50%)"
    document.getElementById("logo").style.maxWidth = 80 + "%"
    logoCollapsed = false;
}