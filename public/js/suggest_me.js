
const main = document.getElementById('mainall');
const rating_container = document.querySelector('.rating-container');
//URL from Postman based on popularity, vote-count, year of release and language 
//GENRES ARRAY based on Age group- 1) Kids= Animation n Family 2)Adults= Top 5 Genres as per google and after studying data= Action,Comedy,Romance,Adventure,Mystery


let genresnow=[];
let langnow=[];

function getAge(id){

    if(id=="kid"){
        console.log(id);
       genresnow=[];
      genresnow.push(genres[2]);
      genresnow.push(genres[8]);

    }
    else{
        console.log(id);
        console.log("ADULT");
        genresnow=[];
        //getChoiceB();
        genresnow.push(genres[0]);
        genresnow.push(genres[3]);
        genresnow.push(genres[13]);
        genresnow.push(genres[1]);
        genresnow.push(genres[12]);

    }
    //activeSelection()
    //console.log(genresnow);
}


function getLang(id){
    langnow=[];

if (id=="hi"){
   // console.log(id);
    langnow.push(id);
   // document.querySelector("id").classList.toggle("focus");
    
    if(genresnow.length==0)
        alert("Choose Age Group First and then select Language");
    
    else
    combine(hindi_sort_url);

}
else{
    //console.log(id);
    langnow.push(id);
    if(genresnow.length==0)
     alert("Choose Age Group First and then select Language");

    else
     combine(eng_sort_url);
}
console.log(genresnow);
//activeSelection()
}


//HIGHLIGHTING SELECTED BUTTON --->ID PASS KARNI H ; REMOVIE BHI KARNA HOGA PHIR
//TOGGLE
// function activeSelection() {
//     //REMOVING CSS
//     const sbtns = document.querySelectorAll('.choicebtn');
//     sbtns.forEach(choicebtn => {
//         choicebtn.classList.remove('focus')
//     })

//     //ADDING CSS
//     if(selectedGenre.length !=0){   
//         selectedGenre.forEach(id => {
//             const activeBtn = document.getElementById(id);
//             activeBtn.classList.add('focus');
//         })
//     }
// }



let filteredItems=[];
let n=Math.random() * 200 +1;

// const getChoiceB=( ) =>{
//  genresTop.forEach(item =>{
//      filteredItems=[]
//      n++;
//     fetchMovieNow();
// })
//   }
const combine=(url) => {
   genresnow.forEach(item =>{
    //    console.log("shoot");
    //    console.log(url);
    //    console.log(item);
       fetchMovieNow(url,item);
   })
}

const fetchMovieNow = (urlNow, genreItem) => {
    // filteredItems=[];
    // console.log(genreItem.id);
    fetch(urlNow + new URLSearchParams({
        api_key: api_key,
        with_genres:genreItem.id
        // page: n
          }))
.then(res => res.json())
.then(data => {
  //console.log(data);
   

    data.results.forEach( (item) => {
        filteredItems.push(item);
    })

 let k=Math.floor(Math.random() * filteredItems.length/2)*2;
    console.log(k)
    makeRatingCard(filteredItems[k],genreItem.id);
    // makeRatingCard(data, genreItem.id)

})
.catch(err =>  console.log(err));

}


   
const makeRatingCard= (item,genre_id )=> {
    console.log("FILTERED ITEMS->")
console.log(filteredItems);

    // /console.log(filteredItems);
    console.log(item)
    console.log("aagye");
    if(item.backdrop_path == null){
        item.backdrop_path = item.poster_path;
        if(item.backdrop_path == null){
            return;
        }
    }
    rating_container.innerHTML+=
`<div class="pricecol col-lg-4 col-md-6">
<div class="card">
    <div class="card-header" >
                <h3>${item.title}</h3> 
              </div>
            <div class="card-body">     
            <img src="${img_url}${item.backdrop_path}"alt=""  onclick="location.href = '/${item.id}'">
            <p class="">${item.overview.substring(0, 200) + '...'}</p>
    <input type="text" name="movie1" placeholder="rate out of 5">
   </div>
   </div>
   </div>`;

   filteredItems=[];
   console.log(filteredItems);
   console.log("END ");
}

//SUGGESTIONS FROM SELECTED BUTTONS



//SUGGESTIONS FROM CARD RATING
getSuggestions=(movie_id,lang) =>{
url=`${movie_details_http}${movie_id}/recommendations?`;
getMovies=""
}


 //DISPLAY MOVIE    
 const showMovies = (data) =>{

    mainall.innerHTML=` `

    if(load.classList.contains('dead')){
      load.classList.remove('dead');
    }

let container = document.querySelector('#mainall');
console.log(data);

        data.forEach( (item) => {
            // console.log(item)
            if(item.backdrop_path == null){
                item.backdrop_path = item.poster_path;
                if(item.backdrop_path == null){
                    return;
                }
            }
            

        container.innerHTML += `
        <div class="movieall" onclick="location.href = '/${item.id}'">
            <img src="${img_url}${item.backdrop_path}" alt="">
            <p class="movie-title">${item.title}</p>
        </div>
        `;
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






/////////////////////////////

// //CHECKING SELECTED MOVIES' VOTE COUNT, VOTE-AVG AND RELEASE DATE OF THE CARD MOVIES 
// const sortData = (data,NUMBER) => {
    
//     //making container--TO GET NEW CONATINER FOR EACH MOVIE--ONE CONTAINER FOR EACH gmdata
//     //makeRatingCard(NUMBER);
//    console.log(data);
//      data.results.forEach( (item) => {    
//            if(item.original_language ="en"){
//            //vote count n rating
//            if( item.vote_count>"1000" && item.vote_average>"6"){
//            //year 
//                       console.log( item);
//                       filteredItems.push(item);
                   
//            }
//        }
//        else{
//            //vote count
//            if( item.vote_count>"300" && item.vote_average>"5"){
//                //year    
//                        console.log("hi");
//                        filteredItems.push(item);
//                        //makeCard(item, NUMBER);  
//                }
//            }
          
           
//        }) 

//        //console.log(data);
//        console.log("hoi");

//        //TO GET ONLY RANDOM ITEM'S DATA AND NOT PROTOTYPE
//        let k=Math.floor(Math.random() * filteredItems.length/2)*2;
//        console.log(k)
//        makeRatingCard(filteredItems[k],NUMBER);
//    }






//-------------------------------------------

// const main = document.querySelector('.suggest_main');


// //LANGUAGE SELECTION
// var user=[];
// console.log(user);
// // console.log(user.length);
// // //ALERT:WORK WITH RECENT


// //MAKING DIV  WITH "RATE"
// const makeDivEl = (name) => {
//     //USING TEMPLATE LITERALS/VARIABLES
//      //ID="" AS NAME INCLUDE 2 WORDS GENRES ALSO 
//     main.innerHTML += `
//     <div class="movies" >

//     <button class="pre-btn"><i class="fa-solid fa-chevron-left"></i></button>

    
//     <h1 class="movie-heading">${name} Movies</h1>
    
//     <div class="movie-container" id="${name}">
   
//     </div>
    
//     <button class="nxt-btn"><i class="fa-solid fa-chevron-right"></i></button>
    
//     </div>
//     `;

// }



// for(let i=0; i<2; i++){
// document.querySelectorAll(".")[i].addEventListener("click",function(){
//     //to access globally
//     user.push(this.id);
//     check(user.length-1);
// })
// }

// //To GET LANGUAGE SELECTED
// function check(currentLang){
//  // console.log(currentLang);  

// if(user[currentLang] =="en"){
//     //console.log("engg");
//    getChoice("en");

// }
// else if(user[currentLang] =="hi"){
//     //console.log("hi");
//    getChoice("hi");

// }
// else{
//     getChoice("NA");
// }
// }

// //AGE WISE GENRE DIVISON
// // <12 = ANIMATION FAMILY MUSIC
// // -30 = TOP5 GENRES: DRAMA COMEDY ACTION THRILLER ROMANCE
// // >30 =ALL EXCEPT:ANIMATION FANTASY MUSIC



// //FOR 10-30
// //KIDS
// // let genre1=["Animation", "Fantasy","Family", "Music"];

// //except animation n fantasy
// //MIDDGROUP
// // let genre2=["Drama","Comedy" ,"Action", "Music","Thriller","Romance","TV Movie","Science Fiction","Documentary","Horror"];

// // -----------------------------FOR ALL AGE GROUPS-------------------------
// //BUILDING 3 CARTDS -> 3 GENRE ARRAY OF SIMILAR TYPE

// // let genre1=["Drama", "Music","Romance", "Comedy"];
// // let genre2=[ "Action", "Adventure","Thriller","Horror"];
// // let genre3=["Science Fiction","Documentary", "TV Movie", "Mystery"];



// const makeCard=(item,NUMBER)=>{
// const movieContainer = document.getElementById(NUMBER); 
// // makeBox();
//     if(item.backdrop_path == null){
//         item.backdrop_path = item.poster_path;
//         if(item.backdrop_path == null){
//             return;
//         }
//     }
//     //ADDING IMG,TITLE AND EVENT LISTENER TO ALL ITEMS(MOVIES)
//     movieContainer.innerHTML += `
//     <div class="movie" onclick="location.href = '/${item.id}'">
//         <img src="${img_url}${item.backdrop_path}" alt="">
//         <p class="movie-title">${item.title}</p>
//     </div>
//     `;
// //makeBox() ends
// }


// // //CHECKING SELECTED MOVIES' VOTE COUNT, VOTE-AVG AND RELEASE DATE OF THE CARD MOVIES 
// // const sortData = (gmdata,lan,NUMBER) => {
    
// //  //making container--TO GET NEW CONATINER FOR EACH MOVIE--ONE CONTAINER FOR EACH gmdata
// //  makeDivEl(NUMBER);

// //     gmdata.results.forEach( (item) => {   
        
// //         if(lan ="en"){
// //         //vote count n rating
// //         if( item.vote_count>"1000" && item.vote_average>"7.5"){
// //         //year 
// //             if( item.release_date<"2022-02-11" && item.release_date> "2011-02-11"){
// //                 console.log("eng" + item);
// //                // makeCard(item, NUMBER);

             

// //             }
// //         }
// //     }
// //     else{
// //         //vote count
// //         if( item.vote_count>"300" && item.vote_average>"7"){
// //             //year 
// //                 if( item.release_date<"2022-02-11" && item.release_date> "2009-02-11"){
// //                     console.log(item);
// //                     makeCard(item, NUMBER);
                    
                
                
                
// //                 }
// //             }
    
// //         }

// //     })
// // }



// // //FETCHING MOVIES FROM EACH 5-GENRE
// // const getChoice=(lang) =>{

// // //FOR ENGLISH
// // //let genre= genre2[Math.floor(Math.random() * 4) + 1];

// // //MAKING SINGLE ARRAY WHICH GETS MOVIE-GENRE FROM EACH OF 3 GENRE-DIVIDED-ARRAY

// // let genres= [];
// // let a={
// //     id: "A",
// // name:genre1[Math.floor(Math.random() * 4) + 1]
// // }
// // genres.push(a);
// // let b={
// //     id: "B",
// //  name:genre2[Math.floor(Math.random() * 4) + 1]
// // }
// // genres.push(b);
// // let c={
// // id: "C",
// // name:genre3[Math.floor(Math.random() * 4) + 1]
// // }
// // genres.push(c);

// // genres.forEach(item =>{
// // //     sortMovies(item.id, item.name, lang);
// // // }
// // // }

// // // const sortMovies = (id, genres) => {
// // fetch(sp_movie_http+ new URLSearchParams({
// //     api_key:api_key,
// //     with_genres: item.name,
// //     with_original_language:lang,
// // //     sort_by:release_date.desc,
// // //     primary_release_date:"2002-01-01",
// // //    // primary_release_date.lte:"2005-12-31",
// //     //  vote_average:8,
// //     page: Math.floor(Math.random() * 5) + 1
    
// // }))
// // .then(res => res.json())
// // .then(data => 
// //     {
// //  sortData(data,lang,item.id);
// //  console.log(data)
// // })
// //  .catch(err =>  console.log(err));
// // })







// //IF HINDI
// //card 1 movie id similar to /374173 KAPOOR AND SONS: Drama, Romance, Comedy
// //card 2 /375290  AIRLIFT  History, Action
// //card 3 /581361 BADLA Crime, Mystery, Thriller
// // if(lang="hi"){
// //  let pickid=["/374173","/375290","/581361"]
// // let item_id= Math.floor(Math.random() * 2) + 1
// //  let movie_id= pickid[item_id];

// // //movie_id="/375290"

// // fetch(`${movie_details_http}${movie_id}/recommendations?` + new URLSearchParams({
// //     api_key: api_key
// // }))
// // .then(res => res.json())
// // .then(data => {
// //     sortData(data,lang,item_id);
// //     //console.log(`${movie_id}`);
// //     console.log(data);
// //    //make div
// //    //makecards
// // })
// // }

// }













 
// // //IF HINDI
// // //card 1 movie id similar to /374173 KAPOOR AND SONS: Drama, Romance, Comedy
// // //card 2 /375290  AIRLIFT  History, Action
// // //card 3 /581361 BADLA Crime, Mystery, Thriller
// // let pickid=["/374173","/375290","/581361"]
// // let movie_id= pickid[ Math.floor(Math.random() * 3) + 1];

// // fetch(`${movie_details_http}${movie_id}/recommendations?` + new URLSearchParams({
// //     api_key: api_key
// // }))
// // .then(res => res.json())
// // .then(data => {
// //     //sortData(data,lang,item.id);
// //     console.log(`${movie_id}`);
// //     console.log(data);
// //    //make div
// //    //makecards
// // })












// //...................



// // const fetchS = (data) => {
// //   data.results.forEach( (item,i) => {   
// // //vote count n rating
// // if( item.vote_count>"1000" && item.vote_average>"7.5"){
// // //year 
// // if( item.release_date<"2022-02-11" && item.release_date> "2011-02-11"){
// // console.log(item);
// // }
// // }
// // })
// // }



// // //let genre=" ";
// // // vote_average.gte=8
// // fetch(sp_movie_http+ new URLSearchParams({
// //     api_key:api_key,
// //     with_genres: genre,
// //     language:"en",
// // //     sort_by:release_date.desc,
// // //     primary_release_date:"2002-01-01",
// // //    // primary_release_date.lte:"2005-12-31",
// //     //  vote_average:8,
// //     page: Math.floor(Math.random() * 5) + 1

    
// // }))
// // .then(res => res.json())
// // .then(data => 
// //     {
// //  fetchS(data);
// // })
// //  .catch(err =>  console.log(err));
 

  
// //------------------------------------------------







// // // const main = document.querySelector('.suggest_main');




// // // //MAKING DIV ELEMEMENT/CATEGORY
// // // const makeDivEl = (name) => {
// // //     //USING TEMPLATE LITERALS/VARIABLES
// // //      //ID="" AS NAME INCLUDE 2 WORDS GENRES ALSO 
// // //     main.innerHTML += `
// // //     <div class="movies" >

// // //     <button class="pre-btn"><i class="fa-solid fa-chevron-left"></i></button>

    
// // //     <h1 class="movie-heading">${name} Movies</h1>
    
// // //     <div class="movie-container" id="${name}">
   
// // //     </div>
    
// // //     <button class="nxt-btn"><i class="fa-solid fa-chevron-right"></i></button>
    
// // //     </div>
// // //     `;
  
// // //     // if (name ="popular"){
// // //     //   makeStyle(name,data);
// // //     //drop .movie style for cards!!!!
// // //     // }
// // //     // else
// // //     // makeBox(name,data);
  
  


// // // }







// // // makeDivEl("RATE");



// // // let id= "28";
// // // let genres ="action"

// // // //fetchMoviesListByMovie(genre_id, genre_name);


// // // const fetchMoviesListByMovie = (id, genres) => {
// // //     fetch(movie_genres_http + new URLSearchParams({
// // //         api_key: api_key,
// // //         //to get specific genre movies only
// // //         with_genres: id,
// // //         //to get random page b/w 1 to 3 but can leave this to page param also
// // //         page: Math.floor(Math.random() * 3) + 1
        
// // //     }))
// // // .then(res => res.json())
// // // .then(data => {
// // //     //console.log(data);
// // //     //  makeDivEl(`${genres}`, data);
// // //      makeBox(data);
// // // })
// // // .catch(err =>  console.log(err));

// // // }


// // // //make cards
// // // const makeBox = ( data) => {
  
// // //     const movieContainer = document.getElementById("RATE"); 
// // //     //const item=data.results;
// // //     //console.log(data);
   
// // //      data.results.forEach( (item,i) => {
// // //         console.log(item);

// // //         if(item.original_language =="en"){
// // //         if(item.vote_average >8 && item.vote_count> 1200 ){
// // //         console.log("english");
// // //         }
// // //     }
// // //     else if(item.original_language =="hi"){
// // //         if(item.vote_average >7.5 && item.vote_count> 30 ){
// // // console.log("hindi");

// // //         }
// // //     }

// // //         // //to check if poster is there or not
// // //         // (item.backdrop_path == null){
// // //         //     item.backdrop_path = item.poster_path;
// // //         //     if(item.backdrop_path == null){
// // //         //         return;
// // //         //     }
// // //         // }

// // //         // //ADDING IMG,TITLE AND EVENT LISTENER TO ALL ITEMS(MOVIES)
// // //         // movieContainer.innerHTML += `
// // //         // <div class="movie" onclick="location.href = '/${item.id}'">
// // //         //     <img src="${img_url}${item.backdrop_path}" alt="">
// // //         //     <p class="movie-title">${item.title}</p>
// // //         // </div>
// // //         // `;
    
// // //         // // movieContainer.innerHTML="hoo";
 
    
// // //     })
// // //     }



// // // fetchMoviesListByMovie(id, genres);




// // // //JS----------------------------------------------
// // // //TMDB 
