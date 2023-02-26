var background = document.getElementById("background")
var backgroundRect = background.getBoundingClientRect()

var background_x = 0
var background_y = 0
var background_x_middle = 0
var background_y_middle = 0

var background_fullscreen = false

var link_about = document.getElementById("about_link")
var link_projects = document.getElementById("projects_link")

var links = document.getElementsByClassName("svg_link")

var disabled_button = null

SHEETS_TRACKING.sheetsURL = "https://script.google.com/macros/s/AKfycbyCUxU91LZl7Chs0017YWMvYvEUzoOBcVxznNIRGu_D8F1K2Nhd5fLFi1V5xUQN8P1R/exec"
SHEETS_TRACKING.sheetName = "Main Site"
SHEETS_TRACKING.start()
document.addEventListener('mouseup', SHEETS_TRACKING.registerLinkClick)

function linkHoverStart(link) {
    if (background_fullscreen) return

    let linkRect = link.getBoundingClientRect()
    background.style.transform = "scale(1)"

    background_x_middle = linkRect.x + linkRect.width / 2
    background_y_middle = linkRect.y + linkRect.height / 2
    background_x = background_x_middle - (60 * (4 / 3)) / 2
    background_y = background_y_middle - (60 * (4 / 3)) / 2

    background.style.left = background_x + "px"
    background.style.top = background_y + "px"
}

function linkHoverEnd(link) {
    if (background_fullscreen) return

    background.style.transform = "scale(0)"
}

function linkClick(link) {
    if (background_fullscreen) {
        if (disabled_button == link_projects) {
            hideAbout()
        }
        else {
            hideProjects()
        }

        background.style.width = null
        background.style.height = null
        background.style.borderRadius = null

        background.classList.replace("background_fullscreen", "background_dot")

        document.getElementById("main").append(disabled_button)

        for (let svgLink of links) {
            svgLink.style.backgroundColor = null
        }

        background_fullscreen = false

        linkHoverStart(link)

        background.addEventListener("transitionend", background_animationend)
    }
    else {
        linkHoverStart(link)

        disabled_button = link == link_about ? link_projects : link_about

        if (disabled_button == link_projects) {
            showAbout()
        }
        else {
            showProjects()
        }

        background.classList.replace("background_dot", "background_fullscreen")
        background.style.transform = null

        disabled_button.style.color = getComputedStyle(document.body).getPropertyValue("--main-dark")
        disabled_button.style.mixBlendMode = "normal"

        for (let svgLink of links) {
            svgLink.style.backgroundColor = getComputedStyle(document.body).getPropertyValue("--second-light")
        }

        background_fullscreen = true

        background.addEventListener("transitionend", background_animationend)
    }
}

function background_animationend(event) {
    background.removeEventListener("transitionend", background_animationend)

    if (background_fullscreen) {
        disabled_button.remove()

        background.style.width = "100%"
        background.style.height = "100%"
        background.style.borderRadius = "0"
    }
    else {
        disabled_button.style.color = null
        disabled_button.style.mixBlendMode = null

        disableAbout()
        disableProjects()
    }
}

onmousemove = (event) => {
    if (background_fullscreen) return

    backgroundRect = background.getBoundingClientRect()

    x_distance = event.clientX - background_x_middle
    y_distance = event.clientY - background_y_middle

    distance = Math.sqrt(Math.pow(x_distance, 2) + Math.pow(y_distance, 2))

    strength = Math.exp(-distance / 80)

    background.style.left = (background_x + x_distance * strength) + "px"
    background.style.top = (background_y + y_distance * strength) + "px"

}