const API =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
let video =
  "https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=video&language=en-US";
let bd = document.querySelector("input");
let row = document.querySelector(".row");
async function getMovies(API) {
  const response = await fetch(API);
  const data = await response.json();
  console.log(data);

  data.results.forEach((movie) => {
    const { poster_path, original_title, overview, release_date } = movie;
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
      <h3>Movie  Summary</h3>
      <p>${overview}</p>
      <h4 style="color:#1a1a2a;">Release Date : ${release_date}</h4>    `;
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
    title.innerHTML = `${original_title}`;

    let datarow = document.createElement("div");
    datarow.classList.add("datarow");
    console.log(datarow.innerHTML);

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
    console.log("working");

    getMovies(SEARCHAPI + searchTerm);

    if (bd.value === "") {
      row.appendChild(fetchmovie);
    } else {
      row.innerHTML = "";
    }
  }

  if (getMovies(!SEARCHAPI + !searchTerm)) {
    span.style.display = "flex!important";
    console.log(span);
  } else {
    span.style.display = "none";
  }
});
