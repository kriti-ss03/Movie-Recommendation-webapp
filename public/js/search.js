


const genres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
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

const main = document.getElementById('mainall');


const btnEl= document.getElementById('genrebtns');


var selectedGenre = [];
let i=0;
setGenre();
function setGenre() {    
  let container = document.querySelector('#genrebtns');
   
  container.innerHTML=``
    genres.forEach((item) =>{
    container.innerHTML += `
    <button class="genrebtn" id="${item.id}">${item.name}</button>
    `;
    })

    for(let i=0; i< genres.length ;i++){
   document.querySelectorAll(".genrebtn")[i].addEventListener("click",()=>{
    // document.querySelector(".genrebtn").addEventListener("click",function(){
     if(selectedGenre.length == 0){
        //NO ELEMENT PRESENT
        selectedGenre.push(genres[i].id);
     }else{
         
         if( selectedGenre.includes(genres[i].id)){
             //FOR ALL SELECTED BTNS IF ITEM ALREADY EXISTS THEN REMOVE IT BY GETTING ID AND INDEX
             selectedGenre.forEach((id,index) =>{
                 if(id== genres[i].id){
                    //REMOVING ALREADY EXISTENT ID OR GENRE 
                    selectedGenre.splice(index,1);
                 }
                })
            }
                else{
                    selectedGenre.push(genres[i].id);
                 }
             
            
        } 
        console.log(selectedGenre);
        getMovies(API_URL +`&with_genres=`+ encodeURI(selectedGenre.join(`,`)) +`&`);
        activeSelection();
    })

    
 }
}  


function activeSelection() {
    //REMOVING CSS
    const sbtns = document.querySelectorAll('.genrebtn');
    sbtns.forEach(genrebtn => {
        genrebtn.classList.remove('focus')
    })

    clearBtn();
    //ADDING CSS
    if(selectedGenre.length !=0){   
        selectedGenre.forEach(id => {
            const activeBtn = document.getElementById(id);
            activeBtn.classList.add('focus');
        })
    }
}

let containerbtn = document.querySelector('#genrebtns');
function clearBtn(){
    let clearBtn = document.getElementById('clear');
    
    if(clearBtn){
        clearBtn.classList.add('focus')
    }else{       
    
     containerbtn.innerHTML += 
     `<button class="genrebtn focus" id="clear">Clear ❌</button>
       `;
        document.querySelector("#clear").addEventListener('click', () => {
           //RESET EVERYTHING TO ORG
            selectedGenre = [];
            setGenre();            
            getMovies(API_URL);
        })
    }
}


getMovies(API_URL);
function getMovies(url) {
    
    fetch(url + new URLSearchParams({
        api_key:api_key
    }))
    .then(res => res.json())
    .then(data => 
    {
     console.log(data);

      if(data.results.length ==0){
        mainall.innerHTML=`<h1 class="try-again">No Results Found. Try Something Else !<\h1>` ;
    }else{
        showMovies(data.results);
    }
    })
    .catch(err =>  console.log(err));
    }
    
        const showMovies = (data) =>{
    
        // let container = document.querySelector('.recommendations-container');
         mainall.innerHTML=` `
        let container = document.querySelector('#mainall');
        //running loop to create 16 movie cards
        data.forEach( (item) => {
            console.log(item)

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

//------------------------------------------------



yesssssssssssssssssssssssssssssssssssfa-spin



