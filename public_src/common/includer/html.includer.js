const includes = document.querySelectorAll("include");
console.log(includes);

includes.forEach((includer) => {
  fetch(includer.getAttribute("src"))
    .then((res) => {
      if (res.ok) {
        return res.text();
      }
    })
    .then((html) => {
      console.log(includer.parentElement);
      console.log(html);
      var z = document.createElement("div");
      z.innerHTML = html;
      //   includer.parentElement.appendChild(z);
      includer.parentElement.insertBefore(z, includer.nextSibling);

      //   =============DELETE DOM ===============
      includer.remove();
    });
});
