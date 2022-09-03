
const originalsClass = document.querySelector('.original__movies')
const trendingDiv = document.getElementById('trending')
const topratedDiv = document.getElementById('top_rated')
// Call the main functions the page is loaded
window.onload = () => {
   getOriginals()
   getTrendingNow()
   getTopRated()
  
}

// ** Helper function that makes dynamic API calls **
function fetchMovies(url, dom_element, path_type) {
  // Use Fetch with the url passed down 
  fetch(url)
  .then(response => response.json())
  .then(movies => showMovies(movies.results, dom_element, path_type))
  .catch(err => console.error(err))
  // Within Fetch get the response and call showMovies() with the data , dom_element, and path type
}

//  ** Function that displays the movies to the DOM **
showMovies = (movies, dom_element, path_type) => {
  
  
  // Loop through object
  if(path_type == "poster"){
  movies.forEach(movie => {
    let image = `<img src=https://image.tmdb.org/t/p/original/${movie.poster_path} id='${movie.id}'>`
      dom_element.innerHTML += image
    
  })
  }
  else if(path_type == "backdrop"){
  movies.forEach(movie => {
     let image = `<img src=https://image.tmdb.org/t/p/original/${movie.backdrop_path} id='${movie.id}'>`
      dom_element.innerHTML += image    
  })
  }
  else{
    return
  }
  
  document.querySelectorAll("img").forEach(movie => {
  movie.onclick = () => {
    getMovieTrailer(movie.getAttribute("id"))
    $('#trailerModal').modal('show')
  }
})

  }


// ** Function that fetches Netflix Originals **
function getOriginals() {
  fetchMovies('https://api.themoviedb.org/3/discover/tv?api_key=19f84e11932abbc79e6d83f82d6d1045&with_networks=213', originalsClass, "poster")
}
// ** Function that fetches Trending Movies **
function getTrendingNow() {
  fetchMovies('https://api.themoviedb.org/3/trending/movie/week?api_key=19f84e11932abbc79e6d83f82d6d1045',trendingDiv, "backdrop")
}
// ** Function that fetches Top Rated Movies **
function getTopRated() {
  fetchMovies('https://api.themoviedb.org/3/movie/top_rated?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&page=1',topratedDiv, "backdrop")
}

// ** BONUS **

// ** Fetches URL provided and returns response.json()
async function getMovieTrailer(id) {
  let url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US`
  try{
  let data = fetch(url)
  let response = await data
  let json = await response.json()
  console.log(json.results)
  setTrailer(json.results)
  }
  catch(err){
    console.error(err)
  }
}

 // ** Function that adds movie data to the DOM
 const setTrailer = trailers => {
  // Set up iframe variable to hold id of the movieTrailer Element
  const iframe = document.getElementById("movieTrailer")
  // Set up variable to select .movieNotFound element
  const movieNotFound = document.querySelector(".movieNotFound")

  // If there is a trailer add the src for it
  if (trailers.length > 0) {
    // add d-none class to movieNotFound and remove it from iframe
    movieNotFound.classList.add("d-none")
    iframe.classList.remove("d-none")
    // add youtube link with trailers key to iframe.src
    iframe.src = `https://www.youtube.com/embed/${trailers[0].key}` 
  } else {
    // Else remove d-none class to movieNotfound and ADD it to iframe
    iframe.classList.add("d-none")
    movieNotFound.classList.remove("d-none")
  }
}






