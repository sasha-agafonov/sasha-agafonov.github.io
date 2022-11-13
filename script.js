window.onload = function () {
    copyright();
    dynamicUnderline();
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