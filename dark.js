function dark() {

   const list = document.querySelectorAll('#nav *');
   for (const element of list) element.classList.toggle("dark");
   document.body.classList.toggle("dark");
 
    var mode = document.querySelector("#nav img").src.replace(/^.*[\\\/]/, '');;
    if (mode == "crescent.svg") document.querySelector("#nav img").src = "sun.svg";
    else document.querySelector("#nav img").src = "crescent.svg";
 
 }