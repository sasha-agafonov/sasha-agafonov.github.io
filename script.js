var mobile = false;
var mode = "crescent.svg";
var m2 = 1;

window.onload = function () {
    setQueryListener();
    copyright();
    dynamicUnderline();
    loadIndex();
   // startIdler();
}

var startIdler = function() {

    var t = 0;
    window.onmousemove = resetTimer;
    window.onmousedown = resetTimer;  // catches touchscreen presses as well      
    window.ontouchstart = resetTimer; // catches touchscreen swipes as well      
    window.ontouchmove = resetTimer;  // required by some devices 
    window.onclick = resetTimer;      // catches touchpad clicks as well
    window.onkeydown = resetTimer;   
    window.addEventListener('scroll', resetTimer, true); // improved; see comments
    console.log("started");

    function resetTimer() {
        t = 0;
        t = setTimeout(startShow, 1000);
        console.log(t);
        // 1000 milliseconds = 1 second
    }

    function startShow() {
        var childDivs = document.getElementById('thumbnails').getElementsByTagName('div');

        for (var i = 0; i < childDivs.length; i++) {
            //if (i >= childDivs.length) i = 0;
            task(i);
        }
    
        function task(i) {
            setTimeout(function() {
                
                childDivs[i % childDivs.length].style.border = "3px solid #FF0000";
                childDivs[i % childDivs.length].style.transition = "0.8s";
                childDivs[i - 1 % childDivs.length].style.border = "none";
                childDivs[i - 1 % childDivs.length].style.transition = "0.5s";
            // Add tasks to do
            }, 700 * i);
        }
    }
}




// function startIdler() {
//     var idleTime = 0;
//     var sss = setInterval(timerIncrement(idleTime), 1000);
    
//     $(this).mousemove(function (event) {
//         idleTime = 0;
//     });
//     $(this).keypress(function (event) {
//         idleTime = 0;
//     });
// }


// function timerIncrement(idleTime) {
//     // alert("xuy");
//     // console.log("xuy");
    
//     if (idleTime++ > 12) {
//         console.log(idleTime);



//         // const thingies = document.getElementById('thumbnails').getElementsByTagName('div');
//         // for (const thingy of thingies) {
//         //     console.log(thingy);
//         //     alert("xuy");
//         // }
//         // var childDivs = document.getElementById('thumbnails').getElementsByTagName('div');
//         // for (i = 0; i < childDivs.length; i++) {
//         //     // alert("4");
//         //     childDivs[i].style.color = "blue";
//         // }
//     }
// }


function dynamicUnderline() {

    const links = document.getElementById("nav-links");
  
    var target_width = document.getElementById("projects").offsetWidth;
    var target_offset_x = document.getElementById("projects").offsetLeft;
    var target_offset_y = document.getElementById("projects").offsetTop;

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



function setQueryListener() {

    // use proper variable here
    var query = window.matchMedia("(max-width: 600px)");

    // why th vs code says addListener is deprecated!?..
    query.addListener(mediaQueryResponse);
    mediaQueryResponse(query);
    
}


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



function copyright() {
    document.getElementById("copy").innerHTML = new Date().getFullYear();
}


function dark() {

    const list = document.querySelectorAll('#nav *');

    for (const element of list) element.classList.toggle("dark-mode-txt");


    document.body.classList.toggle("dark-mode-bg");
    mode = document.querySelector("#nav img").src.replace(/^.*[\\\/]/, '');
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


function loadFragment(frag) {
    $(document).ready(function() {
        // if (mobile) 
        $("#content").load("/" + frag + ".html",function(){}).hide().fadeIn(500);
        window.scrollTo(top);
  //     $("#content").fadeOut(250).load("/" + frag + ".html", function(response, status, xhr) {
  //       $(this).fadeIn(250);
  //     });
    });
}

// function incrementTimer() {
//     idleTime++;
//     if (idleTime > 2) window.location.reload();
// }


// function idleDetector() {
//     $(document).ready(function () {
//         // Increment the idle time counter every minute.
//         var idleInterval = setInterval(incrementTimer, 60000); // 1 minute

//         // Zero the idle timer on mouse movement.
//         $(this).mousemove(function (e) {
//             alert("reset");
//             idleTime = 0;
//         });
//         $(this).keypress(function (e) {
//             alert("reset");
//             idleTime = 0;
//         });
//     });
// }

function loadIndex() {
    $(document).ready(function(){
        $("#content").load("/projects.html");
      });
}

function openMobileMenu() {
    $(document).ready(function(){
        $('#hamburger').click(function(){
            $(this).toggleClass('open');
            $("#nav-links, #nav").toggleClass("mobile");
        });
    });
}