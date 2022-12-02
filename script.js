window.onload = function () {
    setQueryListener();
    copyright();
    dynamicUnderline();
   // var childDivs = document.getElementById("thumbnails").getElementsByTagName("div");
    idler();
}

// console.log("childDivs");

function idler() {
    var idleTime = 0;
    setInterval(timerIncrement(idleTime), 600);

    $(this).mousemove(function (event) {
        idleTime = 0;
    });
    $(this).keypress(function (event) {
        idleTime = 0;
    });
}


function timerIncrement(idleTime) {
    idleTime = idleTime + 1;
    if (idleTime > 0) {
        //alert("Stp idling");
        var childDivs = document.getElementById('thumbnails').getElementsByTagName('div');
        for (i = 0; i < childDivs.length; i++) {
            // alert("4");
        }
    }
}


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
        // do (absolutely) nothing useful
        $("#thumbnails").addClass('mobile');
        $("#nav-links").addClass('hidden');
        $("#hamburger").addClass('visible');
    } 

    else {
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
        $("#content").load("/" + frag + ".html",function(){}).hide().fadeIn(500);
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