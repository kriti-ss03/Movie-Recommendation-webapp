//PATH OF URL
let movie_id = location.pathname;




//MOVIE DETAILS
fetch(`${movie_details_http}${movie_id}?` + new URLSearchParams({
    api_key: api_key
}))
.then(res => res.json())
.then(data => {
   // console.log(data);
    setupMovieInfo(data);
})

//movie details
const setupMovieInfo = (data) => {
    console.log(data);
    const title = document.querySelector('title');
    const movieName = document.querySelector('.movie-name');
    const genres = document.querySelector('.genres');
    const des = document.querySelector('.des');
    const backdrop = document.querySelector('.movie-info');
    const vote = document.querySelector('.vote');
  

    title.innerHTML = movieName.innerHTML = data.title; 
    //TO GET YEAR
    genres.innerHTML = `${data.release_date.split('-')[0]} | `;
    //GENRES WITH SPACE
    //genres.innerHTML += data.genres[i].name; W/O SPACES
    //console.log(data.genres);
    for(let i = 0; i < data.genres.length; i++){
      genres.innerHTML += data.genres[i].name + formatString(i, data.genres.length);
    }

     //checking if backdrop path is not; no need to check poster path coz the model won't allow such movie
     if(data.backdrop_path == null){
        data.backdrop_path = data.poster_path;
    }
    if(data.adult == true){
        genres.innerHTML += ' | +18';
    }

//VOTE
//<span class="${getColor(vote_average)}">${vote_average}</span>
vote.innerHTML+=data.vote_average;
// getColor(vote);

// function getColor(vote) {
//     if(vote>= 6){
//         vote.classList.add('vote_red');
//     }else{
//         vote.classList.add('vote_grey');
//     }
// }

//DESCRIPTION
    des.innerHTML = data.overview.substring(0, 200) + '...';
//MOVIE BANNER
    backdrop.style.backgroundImage = `url(${original_img_url}${data.backdrop_path})`;
}

const formatString = (currentIndex, maxIndex) => {
  if(currentIndex == maxIndex - 1) return '';
   else  return ', ';
}

//CAST INFO
fetch(`${movie_details_http}${movie_id}/credits?` + new URLSearchParams({
    api_key: api_key
}))
.then(res => res.json())
.then(data => {
    console.log(data);
    const cast = document.querySelector('.starring');
   //getting 6 cast members only
    for(let i = 0; i < 6; i++){
        cast.innerHTML += data.cast[i].name + formatString(i, 6);
    }

    //adding 1 crew member for recommendation
    let crew= data.crew[0];

    
})

//VIDEO CLIPS FROM YT
fetch(`${movie_details_http}${movie_id}/videos?` + new URLSearchParams({
    api_key: api_key
}))
.then(res => res.json())
.then(data => {
    let trailerContainer = document.querySelector('.trailer-container');

    let maxClips = (data.results.length > 4) ? 4 : data.results.length;

    for(let i = 0; i < maxClips; i++){
        trailerContainer.innerHTML += `
        <iframe src="https://youtube.com/embed/${data.results[i].key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `;
    }
})

//RECOMMENDATION
const load = document.getElementById('load')
const current = document.getElementById('current')

var currentPage = 1;
var loadPage=2;
var lastUrl = '';
var totalPages = 100;

//ADDING PATH TO BASE URL
getMovies(`${movie_details_http}${movie_id}/recommendations?sort_by=popularity.desc&`);


function getMovies(url) {
    lastUrl = url;
fetch( url + new URLSearchParams({
    api_key: api_key
}))
.then(res => res.json())
.then(data => {
    console.log(data);  

    currentPage = data.page;
    //console.log(currentPage);
    loadPage=currentPage+1;
    totalPages = data.total_pages;
    if(currentPage>= totalPages){
    //console.log("jo h bass yhi h");
    load.classList.add("disabled");
    }

    //console.log(`${movie_id}`);
    // let container = document.querySelector('.recommendations-container');

     let container = document.querySelector('#mainall');
    //running loop to create 16 movie cards
    for(let i = 0; i < 16; i++){
        if(data.results[i].backdrop_path == null){
            i++;
        }

        container.innerHTML += `
        <div class="movieall" onclick="location.href = '/${data.results[i].id}'">
            <img src="${img_url}${data.results[i].backdrop_path}" alt="">
            <p class="movie-title">${data.results[i].title}</p>
        </div>
        `;
    }
})
}

//FOR PAGINATION

load.addEventListener('click', () => {
    //IF MORE PAGES EXIST THEN OLY
    if(loadPage <= totalPages){
      moreData(loadPage);
    }
  })
function  moreData(page){
    let urlSplit = lastUrl.split('?');
    console.log("yoo");
    //AFTER SPLITTING BASE URL+ QUERY PARAMS
    let queryParams = urlSplit[1].split('&');
    console.log(queryParams);
    //TO GET PAGENO --2ND LAST ELEMENT
    let key = queryParams[queryParams.length -2].split('=');
    
    //CHECKING IF THERE IS PAGE OR NOT IN THE API
    if(key[1] != 'page'){
      let url = lastUrl + 'page='+ page  + '&';
      //'&api_key=${api_key}'
      getMovies(url);
    }else{ 
      //FOR OTHER PAGES
      key[1] = page.toString();
      let a = key.join('=');
      queryParams[queryParams.length -1] = a;
      //JOINING QUERY PARAMS TO STRING
      let b = queryParams.join('&');
      let url = urlSplit[0] +'?'+ b;
      getMovies(url);
    }
}