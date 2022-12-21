window.onload = function () {
    setQueryListener();
    copyright();
    dynamicUnderline();
    loadIndex(); // just use loadfrag ffs
    let idler = new Idler();
 
}

//——————————————————————————————————————————————————————————————————————————————————————————————————


class Idler {

    constructor() {
        this.time = 0;
        this.showController = new ShowController();
        const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"];

        events.forEach(event => {
            document.addEventListener(event, () => {
                this.resetTimer();
                this.showController.stopShow();
            }, true)
        });
    }

    resetTimer() {
        clearTimeout(this.time);
        this.time = setTimeout(() => {
            (document.getElementById("thumbnails") ? this.showController.startShow() : this.resetTimer);
        }, 60000);
    }

}

//——————————————————————————————————————————————————————————————————————————————————————————————————

class ShowController {

    startShow() {
        this.shouldShowShow = true;
        (Math.floor(Math.random() * 2) == 0 ? this.sequence() : this.blinking());
    }

    stopShow() {
        this.shouldShowShow = false;
        const elems = document.querySelectorAll("#thumbnails > div > div");
        elems.forEach(elem => elem.classList.remove("pseudo-hover"));
    }

    async sequence() {
        let elems = document.querySelectorAll("#thumbnails > div > div");
        let i = 0;

        while (this.shouldShowShow) {
            elems[i++ % elems.length].classList.toggle("pseudo-hover");
            await new Promise(resolve => setTimeout(resolve, 300));
        }
    }

    async blinking() {
        let elems = document.querySelectorAll("#thumbnails > div > div");

        while (this.shouldShowShow) {
            elems.forEach(elem => elem.classList.toggle("pseudo-hover"));
            await new Promise(resolve => setTimeout(resolve, 600));
        }
    }

    // async disarray() {

    // }


}

//——————————————————————————————————————————————————————————————————————————————————————————————————

function setQueryListener() {

    // use proper variable here
    var query = window.matchMedia("(max-width: 600px)");

    // why th vs code says addListener is deprecated!?..
    query.addListener(mediaQueryResponse);
    mediaQueryResponse(query);
    
}

//——————————————————————————————————————————————————————————————————————————————————————————————————

function mediaQueryResponse(query) {

    if (query.matches) {
        mobile = true;
        // do (absolutely) nothing useful
        $("#thumbnails").addClass('mobile');
        $("#nav-links").addClass('hidden');
        $("#hamburger").addClass('visible');
    } 

    else {
        mobile = false;
                // do (absolutely) nothing useful
        $("#thumbnails").removeClass('mobile');
        $("#nav-links").removeClass('hidden');
        $("#hamburger").removeClass('visible');
        // kill jqry later
        $("#nav-links, #nav").removeClass("mobile");
        $("#hamburger").removeClass('open');
    }
}

//——————————————————————————————————————————————————————————————————————————————————————————————————

function loadFragment(frag) {
    $(document).ready(function() {
        closeMobileMenuIfOpen();
        $("#content").load("/" + frag + ".html",function(){}).hide().fadeIn(500);
        window.scrollTo(top);
  //     $("#content").fadeOut(250).load("/" + frag + ".html", function(response, status, xhr) {
  //       $(this).fadeIn(250);
  //     });
    });
}

//——————————————————————————————————————————————————————————————————————————————————————————————————

function loadIndex() {
    $(document).ready(function(){
        $("#content").load("/projects.html");
    });
}

//——————————————————————————————————————————————————————————————————————————————————————————————————

function copyright() {

    document.getElementById("copy").innerHTML = new Date().getFullYear();

}

//——————————————————————————————————————————————————————————————————————————————————————————————————

function toggleMobileMenu() {

    const elems = document.querySelectorAll("#nav, #nav-links, #hamburger");
    elems.forEach(elem => elem.classList.toggle(elem.id === "hamburger" ? "open" : "mobile"));

}

//——————————————————————————————————————————————————————————————————————————————————————————————————

function closeMobileMenuIfOpen() {

    const elem = document.getElementById("hamburger");
    if (elem.classList.contains("open")) toggleMobileMenu();

}

//——————————————————————————————————————————————————————————————————————————————————————————————————

function dark() {

    const elems = document.querySelectorAll("#nav *");
    elems.forEach(elem => elem.classList.toggle("dark-mode-txt"));

    document.body.classList.toggle("dark-mode-bg");
    const mode = document.querySelector("#nav img").src.replace(/^.*[\\\/]/, '');
    const elem = document.getElementById("nav-links")

    if (mode == "crescent.svg") {
        document.querySelector("#nav img").src = "sun.svg";
        elem.style.setProperty("--main-bg-color", `white`);
    }
    else {
        document.querySelector("#nav img").src = "crescent.svg";
        elem.style.setProperty("--main-bg-color", `black`);
    }

}

//——————————————————————————————————————————————————————————————————————————————————————————————————

function dynamicUnderline() {

    const links = document.getElementById("nav-links");
  
    let target_width = document.getElementById("projects").offsetWidth;
    let target_offset_x = document.getElementById("projects").offsetLeft;
    let target_offset_y = document.getElementById("projects").offsetTop;

    links.style.setProperty("--underline-width", `${target_width}px`);
    links.style.setProperty("--underline-offset-x", `${target_offset_x}px`);
    links.style.setProperty("--underline-offset-y", `${target_offset_y}px`);

    links.addEventListener("mouseover", (event) => {
        if (event.target.tagName.toLowerCase() === "a") {
            links.style.setProperty("--underline-width", `${event.target.offsetWidth}px`);
            links.style.setProperty("--underline-offset-x", `${event.target.offsetLeft}px`);
            links.style.setProperty("--underline-offset-y", `${event.target.offsetTop}px`);
        }
    });

    links.addEventListener("click", (event) => {
        if (event.target.tagName.toLowerCase() === "a" && event.target.id !== "source") {
            target_width = event.target.offsetWidth;
            target_offset_x = event.target.offsetLeft;
            target_offset_y = event.target.offsetTop;
        }
    });

    links.addEventListener("mouseleave", () => {
        links.style.setProperty("--underline-width", `${target_width}px`);
        links.style.setProperty("--underline-offset-x", `${target_offset_x}px`);
        links.style.setProperty("--underline-offset-y", `${target_offset_y}px`);
    });
}

//——————————————————————————————————————————————————————————————————————————————————————————————————

// function setIdler() {

//     let time;
//     const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"];

//     events.forEach(event => {
//         document.addEventListener(event, () => {
//             resetTimer();
//             stopShow();
//         }, true)
//     });

//     function resetTimer() {
//         clearTimeout(time);
//         time = setTimeout(prepareForSurprise, 60000);
//     }

//     function prepareForSurprise() {
//         (document.getElementById("thumbnails") ? startShow() : resetTimer);
//     }

// }

// //——————————————————————————————————————————————————————————————————————————————————————————————————

// function startShow() {
//     sequence();
//     // do some clever shit here
// }

// //——————————————————————————————————————————————————————————————————————————————————————————————————

// function stopShow() {
//     const elems = document.querySelectorAll("#thumbnails > div > div");
//     elems.forEach(elem => elem.classList.remove("pseudo-hover"));
// }

// //——————————————————————————————————————————————————————————————————————————————————————————————————

// async function sequence() {

//     let elems = document.querySelectorAll("#thumbnails > div > div");
//     let i = 0;

//     while (true) {
//         await new Promise(resolve => setTimeout(resolve, 300));
//         elems[i++ % elems.length].classList.toggle("pseudo-hover");
//     }

// }

// //——————————————————————————————————————————————————————————————————————————————————————————————————

// async function snake() {

//     let elems = document.querySelectorAll("#thumbnails > div > div");
//     let i = 0;

// }

// //——————————————————————————————————————————————————————————————————————————————————————————————————

// async function disarray() {

//     let elems = document.querySelectorAll("#thumbnails > div > div");
//     let i = 0;

// }

// //——————————————————————————————————————————————————————————————————————————————————————————————————

// async function burst() {

//     let elems = document.querySelectorAll("#thumbnails > div > div");
//     let i = 0;

// }

//——————————————————————————————————————————————————————————————————————————————————————————————————