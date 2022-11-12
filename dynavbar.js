 // copy
 document.getElementById("copy").innerHTML = new Date().getFullYear();

 // dynavbar
 const menu = document.getElementById("nav");

 var target_width = document.getElementById("projects").offsetWidth;
 var target_offset_x = document.getElementById("projects").offsetLeft;
 var target_offset_y = document.getElementById("projects").offsetTop;

 menu.style.setProperty("--underline-width", `${target_width}px`);
 menu.style.setProperty("--underline-offset-x", `${target_offset_x}px`);
 menu.style.setProperty("--underline-offset-y", `${target_offset_y}px`);

 menu.addEventListener("mouseover", (event) => {
   if (event.target.tagName.toLowerCase() === 'a') {
     menu.style.setProperty("--underline-width", `${event.target.offsetWidth}px`);
     menu.style.setProperty("--underline-offset-x", `${event.target.offsetLeft}px`);
   
     
   }
 });

 menu.addEventListener("click", (event) => {
   if (event.target.tagName.toLowerCase() === 'a' && event.target.id !== 'source') {
     target_width = event.target.offsetWidth;
     target_offset_x = event.target.offsetLeft;
     target_offset_y = event.target.offsetTop;
   }
 });

 menu.addEventListener("mouseleave", () => {
   menu.style.setProperty("--underline-width", `${target_width}px`);
   menu.style.setProperty("--underline-offset-x", `${target_offset_x}px`);
   menu.style.setProperty("--underline-offset-y", `${event.target.offsetTop}px`);
 });