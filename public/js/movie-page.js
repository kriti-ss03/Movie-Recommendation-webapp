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
    // console.log(data);
    const title = document.querySelector('title');
    const movieName = document.querySelector('.movie-name');
    const genres = document.querySelector('.genres');
    const des = document.querySelector('.des');
    const backdrop = document.querySelector('.movie-info');

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
//ADDING PATH TO BASE URL
fetch(`${movie_details_http}${movie_id}/recommendations?` + new URLSearchParams({
    api_key: api_key
}))
.then(res => res.json())
.then(data => {
    
    console.log(`${movie_id}`);
    let container = document.querySelector('.recommendations-container');
    //running loop to create 16 movie cards
    for(let i = 0; i < 16; i++){
        if(data.results[i].backdrop_path == null){
            i++;
        }

    
    // if(!((name=="top")|| (name== "popular") || (name=="trending")) ){
// // console.log(name);
//   for(let i=0;i<19;i++){
//       if(genres[i].name ===name){
//      //console.log(genres[i].id);
//      if(genres[i].id === item.genre_ids[0] ){
//      //console.log("yesss");




        container.innerHTML += `
        <div class="movie" onclick="location.href = '/${data.results[i].id}'">
            <img src="${img_url}${data.results[i].backdrop_path}" alt="">
            <p class="movie-title">${data.results[i].title}</p>
        </div>
        `;
    }
})