//FOR DYNAMIC VALUES
const main = document.querySelector('.main');


//SEARCH 
const buttonEl=document.querySelector("#search-btn");
const inputEl=document.querySelector("#search-txt");

buttonEl.onclick= (event) =>{
       event.preventDefault();
      // location.href = '/search_http?query=${value}'
     const value=inputEl.value;
    //  if(value === " "){
    //      console.log("no results");
    //  }
    console.log(value);

    fetchSearch(value);
}
    const fetchSearch = (value) => {
        fetch(search_http + new URLSearchParams({
            api_key: api_key,
            //to get specific genre movies only
            query:value
      }))
    .then(res => res.json())
    .then(data => {
        //console.log(data);
        makeDivEl("From Search", data);
    })
    .catch(err =>  console.log(err));
    
    }

    // movieContainer.innerHTML += `
    // <div class="movie" onclick="location.href = '/${item.id}'">
    //     <img src="${img_url}${item.backdrop_path}" alt="">
    //     <p class="movie-title">${item.title}</p>
    // </div>
    // `;


const genres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "TV Movie"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]


//TRENDING MOVIES 
//FETCHING DATA USING URLSearchParams(TO ADD REQUIRED PARAMETERS)
fetch(trending_movies_http + new URLSearchParams({
    api_key:api_key
}))
.then(res => res.json())
.then(data => 
    {
     //console.log(data)
     makeDivEl( "trending",data);
    })
    .catch(err =>  console.log(err));
 
//POPULAR MOVIES
fetch(popular_movies_http + new URLSearchParams({
    api_key:api_key
}))
.then(res => res.json())
.then(data => 
    {
     console.log(data)
     makeDivEl( "popular",data);
    })
    .catch(err =>  console.log(err));
 


//TOP RATED MOVIES
fetch(top_rated_movies_http + new URLSearchParams({
    api_key:api_key
}))
.then(res => res.json())
.then(data => 
   {
    //console.log(data)
    //ID IS IN ""
    makeDivEl( "top",data);
   })
   .catch(err =>  console.log(err));


//LIST OF GENRES NAME AND ID
fetch(genres_list_http + new URLSearchParams({
    // credentials: 'omit';
    api_key:api_key
}))
.then(res => res.json())
// .then(data => console.log(data));
.then(data => {
    data.genres.forEach(item =>{
        fetchMoviesListByGenres(item.id, item.name);
    })
});

//FETCHING MOVIES DATA BY GENRE
const fetchMoviesListByGenres = (id, genres) => {
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
    makeDivEl(`${genres}`, data);
})
.catch(err =>  console.log(err));

}


//MAKING DIV ELEMEMENT/CATEGORY
const makeDivEl = (name,data) => {
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
    makeBox(name,data);
  
  
}



const makeBox = (name, data) => {
  
    const movieContainer = document.getElementById(name); 
    //const item=data.results;
    
    //FOR MOVIE SEARCH RESULTS------------
    if(data.results.length ===0){
      console.log("No Items Found")  
      return
      
    }
   
     data.results.forEach( (item,i) => {
        //console.log(item)

        //to check if poster is there or not
        if(item.backdrop_path == null){
            item.backdrop_path = item.poster_path;
            if(item.backdrop_path == null){
                return;
            }
        }

        //ADDING IMG,TITLE AND EVENT LISTENER TO ALL ITEMS(MOVIES)
        movieContainer.innerHTML += `
        <div class="movie" onclick="location.href = '/${item.id}'">
            <img src="${img_url}${item.backdrop_path}" alt="">
            <p class="movie-title">${item.title}</p>
        </div>
        `;
    
        // CARD SLIDER CODE; WORKS ONLY AFTER CARDS ARE MADE
        // console.log(data);
        // console.log(data.results.length);
        if(i == data.results.length - 1){
            setTimeout(() => {
                makeSwipe();
            }, 100);
            
        }
 
    
    })
    }


   
    



// const makeStyle = (name, data) => {
  
//   const movieContainer = document.getElementById(name); 
//   //const item=data.results;
  
//   //FOR MOVIE SEARCH RESULTS------------
//   if(data.results.length ===0){
//       console.log("No Items Found")
//   }
 
//    data.results.forEach( (item,i) => {
//       //console.log(item)

//       //to check if poster is there or not
//       if(item.backdrop_path == null){
//           item.backdrop_path = item.poster_path;
//           if(item.backdrop_path == null){
//               return;
//           }
//       }

//       //ADDING IMG,TITLE AND EVENT LISTENER TO ALL ITEMS(MOVIES)
//       movieContainer.innerHTML += `
//       <div class="" onclick="location.href = '/${item.id}'">
//           <img src="${img_url}${item.backdrop_path}" alt="">
//           <p class="movie-title">${item.title}</p>
//       </div>
//       `;
  
//       // CARD SLIDER CODE; WORKS ONLY AFTER CARDS ARE MADE
//       // console.log(data);
//       // console.log(data.results.length);
//       if(i == data.results.length - 1){
//           setTimeout(() => {
//               makeSwipe();
//           }, 100);
          
//       }

  
//   })
//   }




//id/ name-->genre name
//item.genre_ids[0] --> maxm feature.. id of genre

// if(!((name=="top")|| (name== "popular") || (name=="trending")) ){
// // console.log(name);
//   for(let i=0;i<19;i++){
//       if(genres[i].name ===name){
//      //console.log(genres[i].id);
//      if(genres[i].id === item.genre_ids[0] ){
//      //console.log("yesss");
//   } 
// }
// }
// }
   

        











