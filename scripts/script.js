$(window).on('load', function () {
    $('#loading').hide();
  }) 

  hljs.highlightAll();

window.onload = function () {
    setQueryListener();
    copyright();
    dynamicUnderline();
    loadIndex(); // just use loadfrag ffs
    let idler = new Idler();
    // themeListener();

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        dark();
    }
    // window.matchMedia("(prefers-color-scheme: dark)").addEventListener(function (e) {
    //     dark();
    // });

}

//—————————————————————————————————————————————————————————————————————————————————————————————————

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

//—————————————————————————————————————————————————————————————————————————————————————————————————

class ShowController {

    constructor() {
        const elems = document.querySelectorAll("#thumbnails > div > div");

        this.next = 0;
        this.next = Math.floor(Math.random() * elems.length);
        this.previous = this.next;

        this.choice = 0;
    }

    startShow() {
        this.shouldShowShow = true;
        this.choice = Math.floor(Math.random() * 4);

        switch (this.choice) {
            case 0:
                this.blinking();
                break;
           
            case 1:
                this.disarray();
                break;
                
            case 2:
                this.sequence();
                break;
                
            case 3:
                this.sequence();
                break;
                
            default: console.log("if this ever executes please quit programming immediately");
        }
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

    async disarray() {
        let elems = document.querySelectorAll("#thumbnails > div > div");

        elems[this.previous].classList.toggle("pseudo-hover");
        
        while(this.shouldShowShow) {

            while (this.previous == this.next) this.next = Math.floor(Math.random() * elems.length);

            elems[this.previous].classList.toggle("pseudo-hover");
            elems[this.next].classList.toggle("pseudo-hover");
            this.previous = this.next;

            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }

    async train() {
        let elems = document.querySelectorAll("#thumbnails > div > div");
        elems[this.previous].classList.toggle("pseudo-hover");
        
        while(this.shouldShowShow) {

        }

    }
}

//—————————————————————————————————————————————————————————————————————————————————————————————————

function setQueryListener() {

    // use proper variable here
    var query = window.matchMedia("(max-width: 600px)");

    // why th vs code says addListener is deprecated!?..
    query.addListener(mediaQueryResponse);
    mediaQueryResponse(query);
    
}

//—————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

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

//—————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

function loadFragment(frag) {
    $(document).ready(function() {
        closeMobileMenuIfOpen();
        $("#content").load("/" + frag + ".html",function(){}).hide().fadeIn(500);
        window.scrollTo(top);
        
    });
}

//—————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

function loadIndex() {
    $(document).ready(function(){
        $("#content").load("pages/projects.html");
    });
}

//—————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

function copyright() {
    document.getElementById("copy").innerHTML = new Date().getFullYear();
}

//—————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

function getSignature() {
    if (!getSignature.fixedDateEvents) {
        const year = new Date().getFullYear();

        getSignature.fixedDateEvents = {
            "1-7": "merry_orthodox_christmas();",
            "2-14": "happy_valentines_day();",
            "3-8": "happy_womens_day();",
            "3-19": "happy_mothers_day();",
            "10-15": "happy_day();",
            "10-31": "happy_halloween();",
            "11-7": "happy_n7_day(" + year + ");",
            "12-25": "merry_christmas();",
            "12-25": "merry_boxing_day();",
            "12-31": "happy_new_year(" + year + ");",
            "1-1": "happy_new_year(" + year + ");"
        };
    }

    let signatureElement = document.getElementById("signature");
    signatureElement.innerHTML = "// "

    const date = new Date();
    const dayOfMonth = date.getUTCDate();
    const dayOfWeek = date.getDay();

    if (dayOfWeek === 5 && dayOfMonth === 13) {
        signatureElement.innerHTML += "friday(13);";
    }
    else {
        const month = date.getUTCMonth() + 1;
        const dateKey = `${month}-${dayOfMonth}`;
        signatureElement.innerHTML += getSignature.fixedDateEvents[dateKey] || "good_luck();";
    }
}

//—————————————————————————————————————————————————————————————————————————————————————————————————————————————————————


function toggleMobileMenu() {

    const elems = document.querySelectorAll("#nav, #nav-links, #hamburger");
    elems.forEach(elem => elem.classList.toggle(elem.id === "hamburger" ? "open" : "mobile"));

}

//—————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

function closeMobileMenuIfOpen() {

    const elem = document.getElementById("hamburger");
    if (elem.classList.contains("open")) toggleMobileMenu();

}

//—————————————————————————————————————————————————————————————————————————————————————————————————

function dark() {

    const elems = document.querySelectorAll("#nav *");
    elems.forEach(elem => elem.classList.toggle("dark-mode-txt"));

    document.body.classList.toggle("dark-mode-bg");

    toggleThemeIcon();
    // const mode = document.querySelector("#nav img").src.replace(/^.*[\\\/]/, '');
    // const elem = document.getElementById("nav-links")

    // if (mode == "crescent.svg") {
    //     document.querySelector("#nav img").src = "sun.svg";
    //     elem.style.setProperty("--mode-color", `white`);
    // }
    // else {
    //     document.querySelector("#nav img").src = "crescent.svg";
    //     elem.style.setProperty("--mode-color", `black`);
    // }

}

//—————————————————————————————————————————————————————————————————————————————————————————————————

function toggleThemeIcon() {
    const mode = document.querySelector("#nav img").src.replace(/^.*[\\\/]/, '');
    let element = document.getElementById("nav-links")

    if (mode == "crescent.svg") {
        document.querySelector("#nav img").src = "icons/sun.svg";
        element.style.setProperty("--mode-color", `white`);
    }
    else {
        document.querySelector("#nav img").src = "icons/crescent.svg";
        element.style.setProperty("--mode-color", `black`);
    }
}

//—————————————————————————————————————————————————————————————————————————————————————————————————

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

//—————————————————————————————————————————————————————————————————————————————————————————————————

function scroller(element) {
    
    var headers = document.querySelectorAll(".description h2");
    const color = getComputedStyle(document.documentElement, null).getPropertyValue("--mode-color");

    headers.forEach(header => {
        // element.style.setProperty("color", "rgba(120, 120, 120, 1)");
        if (header.textContent == element.textContent) {
            header.scrollIntoView({behavior: "smooth"});
            element.style.setProperty("color", color);
        }
    });
}

//—————————————————————————————————————————————————————————————————————————————————————————————————

function highlightCode() {
    document.querySelectorAll('code').forEach(el => {
        hljs.highlightElement(el);
    });
}

//—————————————————————————————————————————————————————————————————————————————————————————————————

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

//—————————————————————————————————————————————————————————————————————————————————————————————————

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

function callback() {

    let elems = document.querySelectorAll("#callback > div");
    let breaker = 0;
    let counter = 0;

    elems.forEach(elem, () => {
        ++counter;
        if (elem.innerHTML) ++breaker;
    });

    if (breaker !== counter) {
        alert("Please fill all fields.")
    }
    else {
        alert("Success.")
    }
    elems.forEach(elem => elem.innerHTML = "");
}

//——————————————————————————————————————————————————————————————————————————————————————————————————

