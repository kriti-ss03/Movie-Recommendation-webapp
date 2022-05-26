//TMDB APIS
//INDIVIDUAL APIS; can work by adding path to base url also

let api_key="1e75158dd9345ba1d83077ed37edb1fd";

let search_http="https://api.themoviedb.org/3/search/movie?sort_by=popularity.desc&";

//base url +filesize(w500); need to add poster_path
let img_url = "https://image.tmdb.org/t/p/w500";
let original_img_url = "https://image.tmdb.org/t/p/original"; //img in org resolution

let trending_movies_http="https://api.themoviedb.org/3/trending/movie/week?";

let top_rated_movies_http="https://api.themoviedb.org/3/movie/top_rated?";
let popular_movies_http="https://api.themoviedb.org/3/movie/popular?";

let genres_list_http = "https://api.themoviedb.org/3/genre/movie/list?";
let movie_genres_http = "https://api.themoviedb.org/3/discover/movie?";

let movie_details_http = "https://api.themoviedb.org/3/movie";

let latest_movies_http="https://api.themoviedb.org/3/movie/latest?";

// https://api.themoviedb.org/3/discover/movie?api_key=[MY_KEY]&language=en-US&sort_by=release_date.desc&page=1&primary_release_date.gte=2002-01-01&primary_release_date.lte=2005-12-31&vote_average.gte=8&with_genres=35


//api_key
const API_KEY = 'api_key=1e75158dd9345ba1d83077ed37edb1fd';

//movie_details_http -"/movie"
const BASE_URL = 'https://api.themoviedb.org/3';


const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&';

const searchURL = BASE_URL + '/search/movie?'+API_KEY;