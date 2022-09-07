function dark() {

   const list = document.querySelectorAll('#nav *');

   for (const element of list) element.classList.toggle("dark");

   document.body.classList.toggle("dark");
   mode = document.querySelector("#nav img").src.replace(/^.*[\\\/]/, '');
   const elem = document.getElementById("nav")
   
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
  $(document).ready(function(){
    $("#content").load("/" + frag + ".html");
    
  });

}