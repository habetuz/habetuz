var background = document.getElementById("background")
var backgroundRect = background.getBoundingClientRect()

var background_x = 0
var background_y = 0
var background_x_middle = 0
var background_y_middle = 0

var background_fullscreen = false

var link_about = document.getElementById("about_link")
var link_projects = document.getElementById("projects_link")

function linkHoverStart(link) {
    if (background_fullscreen) return

    let linkRect = link.getBoundingClientRect()
    background.style.transform = "scale(1)"

    background_x_middle = linkRect.x + linkRect.width/2 
    background_y_middle = linkRect.y + linkRect.height/2
    background_x = background_x_middle - (60 * (4/3))/2
    background_y = background_y_middle - (60 * (4/3))/2

    background.style.left = background_x + "px"
    background.style.top = background_y + "px"
}

function linkHoverEnd(link) {
    if (background_fullscreen) return

    background.style.transform = "scale(0)"
}

function linkClick(link) {
    if (background_fullscreen) return

    linkHoverStart(link)

    background.classList.replace("background_dot", "background_fullscreen")
    background.style.transform = null

    if (link == link_about) {
        link_projects.style.color = getComputedStyle(document.body).getPropertyValue("--main-dark")
        link_projects.style.mixBlendMode = "normal"
    }
    else {
        link_about.style.color = getComputedStyle(document.body).getPropertyValue("--main-dark")
        link_about.style.mixBlendMode = "normal"
    }

    background_fullscreen = true
}

onmousemove = (event) => {
    if (background_fullscreen) return

    backgroundRect = background.getBoundingClientRect()

    x_distance = event.clientX - background_x_middle
    y_distance = event.clientY - background_y_middle

    distance = Math.sqrt(Math.pow(x_distance, 2) + Math.pow(y_distance, 2))

    strength = Math.exp(-distance/80)

    background.style.left = (background_x + x_distance * strength) + "px"
    background.style.top = (background_y + y_distance * strength) + "px"

}