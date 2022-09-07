function dark() {

   const list = document.querySelectorAll('#nav *');

   for (const element of list) element.classList.toggle("dark");

   document.body.classList.toggle("dark");
   mode = document.querySelector("#nav img").src.replace(/^.*[\\\/]/, '');
   const elem = document.getElementById("nav")
   
   //elem.style.cssText = 'background-color:red !important';

   //elem.style.cssText = "--main-bg-color: red";


  //  var r = document.querySelector(':root');
  //  r.style.setProperty('--m2', 'green');

  //  var sample = document.querySelector("#nav img");
   //elem.style.cssText = 'background-color:red !important';
  //  sample.setAttribute('style', 'background-color:red !important');
   
   if (mode == "crescent.svg") {
    document.querySelector("#nav img").src = "sun.svg";
    elem.style.setProperty("--main-bg-color", `white`);
   }

   else {
    document.querySelector("#nav img").src = "crescent.svg";
    elem.style.setProperty("--main-bg-color", `black`);
   }
 
 }

function loadFragment(fragment) {
  $('#content').load("/" + fragment + ".html");
  //alert("okfd");
}