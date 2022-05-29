const main = document.getElementById('mainall');

let containerbtn = document.querySelector('#genrebtns');


const load = document.getElementById('load')
const current = document.getElementById('current')

var currentPage = 1;
var k=1;

var loadPage=2;
var lastUrl = '';
var totalPages = 100;

var selectedGenre = [];
let i=0;
setGenre();
function setGenre() {    
  //let containerbtn = document.querySelector('#genrebtns');
   
  containerbtn.innerHTML=''
    genres.forEach((item) =>{
    containerbtn.innerHTML += `
    <button class="btn btn-danger genrebtn " id="${item.id}">${item.name}</button>
    `;
    })

    for(let i=0; i< genres.length ;i++){
   document.querySelectorAll(".genrebtn")[i].addEventListener("click",()=>{
   
    //TO  GET NEW DATA
    mainall.innerHTML=` `

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
        getMovies( sort_http +`&with_genres=`+ encodeURI(selectedGenre.join(`,`)) +`&`);
        activeSelection();
    })

    
 }
}  

//HIGHLIGHTING SELECTED BUTTON
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

function clearBtn(){
    let clearBtn = document.getElementById('clear');
    
    if(clearBtn){
        clearBtn.classList.add('clearbtn')
    }else{       
        let clear = document.createElement('button');
        clear.classList.add('btn','btn-secondary','clearbtn');
        clear.id = "clear";
        clear.innerText = 'Clear ❌';
        clear.addEventListener("click", () => {
            selectedGenre = [];
            setGenre(); 

            //TO REMOVE NO MORE RESULTS
            mainall.innerHTML=` `
            

            getMovies( sort_http);
        })
        containerbtn.append(clear);


    //  containerbtn.innerHTML += 
    //  `<button class="genrebtn focus" id="clear">Clear ❌</button>
    //    `;
    //     document.querySelector("#clear").addEventListener('click', () => {
    //        //RESET EVERYTHING TO ORG
    //         selectedGenre = [];
    //         setGenre();            
    //         getMovies( sort_http);
    //         //document.location.reload();
    //     })
    }
}

//FETCHING DATA
getMovies(sort_http);
function getMovies(url) {
    lastUrl = url;
    fetch(url + new URLSearchParams({
        api_key:api_key
    }))
    .then(res => res.json())
    .then(data => 
    {
     console.log(data);

      if(data.results.length ==0){
         //TO DISABLE BUTTON AND DISPLAY TEXT
        document.querySelector("#load").classList.add('dead');
        mainall.innerHTML=`<h1 class="try-again">No Results Found. Try Something Else !<\h1>` ;
    }else{

        showMovies(data.results);
        currentPage = data.page;
        console.log(currentPage);
        loadPage=currentPage+1;
        totalPages = data.total_pages;

    }
    })
    .catch(err =>  console.log(err));
    }
   
    
 //DISPLAY MOVIE IN CARDS   
const showMovies = (data) =>{

    if(load.classList.contains('dead')){
      console.log("hata denge isko");
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

//PAGINATION
  load.addEventListener('click', () => {
    //IF MORE PAGES EXIST THEN OLY
    if(loadPage <= totalPages){
        moreData(loadPage);
    }
  })
function  moreData(page){
    let urlSplit = lastUrl.split('?');
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



//SEARCH 
const buttonEl=document.querySelector("#search-btn");
const inputEl=document.querySelector("#search-txt");


//ADDING ENTER KEY EVENTLISTENER
inputEl.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    buttonEl.click();
  }
});

//ADDING BUTTON EVENT LISTENER
buttonEl.onclick= (event) =>{
    // SO THAT OUR TEXT DON'T GO
    event.preventDefault();
       //TO  GET NEW DATA
    mainall.innerHTML=` `
    

    const value=inputEl.value;
    //console.log(value);
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

        //TO CHECK IF RESULTS ARE THERE OR NOT
        if(data.results.length ==0){
           //TO DISABLE BUTTON AND DISPLAY TEXT
          document.querySelector("#load").classList.add('dead');
          mainall.innerHTML=`<h1 class="try-again">No Results Found. Try Something Else !<\h1>` ;
      }else{
          showMovies(data.results);
          currentPage = data.page;
          console.log(currentPage);
          loadPage=currentPage+1;
          totalPages = data.total_pages;
      }   
    })
    .catch(err =>  console.log(err));  
    }

    
