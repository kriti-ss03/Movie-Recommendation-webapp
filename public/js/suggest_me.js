

const main = document.querySelector('.suggest_main');




//MAKING DIV ELEMEMENT/CATEGORY
const makeDivEl = (name) => {
    //USING TEMPLATE LITERALS/VARIABLES
     //ID="" AS NAME INCLUDE 2 WORDS GENRES ALSO 
    main.innerHTML += `
    <div class="movies" >

    <button class="pre-btn"><i class="fa-solid fa-chevron-left"></i></button>

    
    <h1 class="movie-heading">${name} Movies</h1>
    
    <div class="movie-container" id="${name}">
   
    </div>
    
    <button class="nxt-btn"><i class="fa-solid fa-chevron-right"></i></button>
    
    </div>
    `;
  
    // if (name ="popular"){
    //   makeStyle(name,data);
    //drop .movie style for cards!!!!
    // }
    // else
    // makeBox(name,data);
  
  


}







makeDivEl("RATE");



let id= "28";
let genres ="action"

//fetchMoviesListByMovie(genre_id, genre_name);


const fetchMoviesListByMovie = (id, genres) => {
    fetch(movie_genres_http + new URLSearchParams({
        api_key: api_key,
        //to get specific genre movies only
        with_genres: id,
        //to get random page b/w 1 to 3 but can leave this to page param also
        page: Math.floor(Math.random() * 3) + 1
        
    }))
.then(res => res.json())
.then(data => {
    //console.log(data);
    //  makeDivEl(`${genres}`, data);
     makeBox(data);
})
.catch(err =>  console.log(err));

}


//make cards
const makeBox = ( data) => {
  
    const movieContainer = document.getElementById("RATE"); 
    //const item=data.results;
    //console.log(data);
   
     data.results.forEach( (item,i) => {
        console.log(item);

        if(item.original_language =="en"){
        if(item.vote_average >8 && item.vote_count> 1200 ){
        console.log("english");
        }
    }
    else if(item.original_language =="hi"){
        if(item.vote_average >7.5 && item.vote_count> 30 ){
console.log("hindi");

        }
    }

        // //to check if poster is there or not
        // (item.backdrop_path == null){
        //     item.backdrop_path = item.poster_path;
        //     if(item.backdrop_path == null){
        //         return;
        //     }
        // }

        // //ADDING IMG,TITLE AND EVENT LISTENER TO ALL ITEMS(MOVIES)
        // movieContainer.innerHTML += `
        // <div class="movie" onclick="location.href = '/${item.id}'">
        //     <img src="${img_url}${item.backdrop_path}" alt="">
        //     <p class="movie-title">${item.title}</p>
        // </div>
        // `;
    
        // // movieContainer.innerHTML="hoo";
 
    
    })
    }



fetchMoviesListByMovie(id, genres);




//JS----------------------------------------------
//TMDB 
