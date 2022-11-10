function dark() {

   const list = document.querySelectorAll('#nav *');

   for (const element of list) {
    element.classList.toggle("dark-mode-txt");
   }

   document.body.classList.toggle("dark-mode-bg");

   mode = document.querySelector("#nav img").src.replace(/^.*[\\\/]/, '');

   // bs
  //  alert(mode);
   
   const elem = document.getElementById("nav")
   
   if (mode == "crescent.svg") {
    document.querySelector("#nav img").src = "sun.svg";
    elem.style.setProperty("--main-bg-color", `white`);
   }

   else {
    document.querySelector("#nav img").src = "crescent.svg";
    elem.style.setProperty("--main-bg-color", `black`);
   }


  //  switch(mode) {
  //   case "crescent.svg":
  //     // code block
  //     break;

  //   default:
  //     document.querySelector("#nav img").src = "crescent.svg";
  //     elem.style.setProperty("--main-bg-color", `black`);
  // }
 
 }


function loadFragment(frag) {
  $(document).ready(function(){
    $("#content").load("/" + frag + ".html",function(){}).hide().fadeIn(500);
//     $("#content").fadeOut(250).load("/" + frag + ".html", function(response, status, xhr) {
//       $(this).fadeIn(250);
//     });
  });
}

// function loadFragment(frag) {
//   $(document).ready(function(){
//     $('#content').fadeOut(167, () => {
//       $('#content').load("/" + frag + ".html", () => {
//           $('#content').fadeIn(333);
//       });
//     });
//   });
// }