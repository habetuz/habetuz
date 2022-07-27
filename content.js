var about = document.getElementById("content_about")
var projects = document.getElementById("content_projects")

function showAbout() {
    about.style.visibility = "visible"
    about.style.opacity = "1"
    about.style.transform = "translateY(0)"
}

function hideAbout() {
    about.style.opacity = null
    about.style.transform = null
}

function disableAbout() {
    about.style.visibility = null
}

function showProjects() {

}

function hideProjects() {

}

function disableProjects() {

}