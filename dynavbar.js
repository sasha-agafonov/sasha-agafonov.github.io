window.onload = function () {

    document.getElementById("copy").innerHTML = new Date().getFullYear();

    // dynavbar
      const links = document.getElementById("nav-links");
  
      var target_width = document.getElementById("projects").offsetWidth;
      var target_offset_x = document.getElementById("projects").offsetLeft;
      var target_offset_y = document.getElementById("projects").offsetTop;
  
      links.style.setProperty("--underline-width", `${target_width}px`);
      links.style.setProperty("--underline-offset-x", `${target_offset_x}px`);
      links.style.setProperty("--underline-offset-y", `${target_offset_y}px`);
  
      links.addEventListener("mouseover", (event) => {
        if (event.target.tagName.toLowerCase() === 'a') {
            links.style.setProperty("--underline-width", `${event.target.offsetWidth}px`);
            links.style.setProperty("--underline-offset-x", `${event.target.offsetLeft}px`);
            links.style.setProperty("--underline-offset-y", `${event.target.offsetTop}px`);
        }
      });
  
      links.addEventListener("click", (event) => {
        if (event.target.tagName.toLowerCase() === 'a' && event.target.id !== 'source') {
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