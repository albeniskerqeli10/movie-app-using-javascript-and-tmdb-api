const API =
'https://api.themoviedb.org/3/tv/popular?api_key=ffef63f5e480a5ea5358d8b895638d8f&language=en-US&page=1';
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/tv?api_key=ffef63f5e480a5ea5358d8b895638d8f&language=en-US&page=1&query=";
  let currentText = document.querySelector('strong');
  let  currentYear = new Date().getFullYear();
  currentText.innerHTML = `${currentYear}`
let bd = document.querySelector("input");
let row = document.querySelector(".row");



async function getMovies(API) {
  const response = await fetch(API);
  const data = await response.json();

  data.results.forEach((movie) => {
    const { poster_path, name, release, vote_average,overview, first_air_date } = movie;
    let fetchmovie = document.createElement("div");
    fetchmovie.classList.add("moviebox");
    let img = document.createElement("img");
    img.classList.add("fetchimg");
    img.src = `${IMGPATH + poster_path}`;
    img.addEventListener("click", () => {
      let overlay = document.createElement("div");
      console.log("Working");
      overlay.classList.add("overlay");
      overlay.innerHTML = ` 
      <h2 class="title">${name}</h2>
      <p>${overview}</p>
      <h4 class="sub">First Air Date : <b>${first_air_date}</b></h4> 
      <h4 class="sub">Rating: <b>${vote_average}</b></h4>  `;
      if (overlay.innerHTML.length === "100") {
        overlay.innerHTML.slice(0, 50);
      }
      img.style.display = "none";
      fetchmovie.appendChild(overlay);
      fetchmovie.style.flexDirection = "column-reverse";

      overlay.addEventListener("click", () => {
        img.style.display = "flex";
        fetchmovie.removeChild(overlay);
        fetchmovie.style.flexDirection = "column";
      });
    });
    let title = document.createElement("h4");
    title.innerHTML = `${name}`;

    let datarow = document.createElement("div");
    datarow.classList.add("datarow");

    datarow.appendChild(title);
    fetchmovie.appendChild(img);
    fetchmovie.appendChild(datarow);

    row.appendChild(fetchmovie);
  });
}
let span = document.querySelector("span");

getMovies(API);
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = bd.value;
  if (searchTerm) {

    getMovies(SEARCHAPI + searchTerm);

    if (bd.value === "") {
      row.appendChild(fetchmovie);
    } else {
      row.innerHTML = "";
    }
  }
})





