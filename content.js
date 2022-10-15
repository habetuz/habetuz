const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 'auto',
    loopedSlides: 5,
    mousewheel: true,
    allowTouchMove: true,
    spaceBetween: 150,
    centeredSlides: true,

    autoplay: {
        delay: 3000,
    },
})

var about = document.getElementById("content_about")
var projects = document.getElementById("content_projects")

function showAbout() {
    about.style.visibility = "visible"
    about.style.opacity = "1"
    about.style.transform = "translateY(0)"

    SHEETS_TRACKING.updateValue('About', true, 'boolean')
}

function hideAbout() {
    about.style.opacity = null
    about.style.transform = null
    about.style.transition = "transition: opacity .2s, transform .8s"
}

function disableAbout() {
    about.style.visibility = null
    about.style.transition = null
}

function showProjects() {
    projects.style.visibility = "visible"
    projects.style.opacity = "1"

    SHEETS_TRACKING.updateValue('Projects', true, 'boolean')
}

function hideProjects() {
    projects.style.opacity = null
    projects.style.transition = "opacity .4s"
}

function disableProjects() {
    projects.style.visibility = null
    projects.style.transition = null
}