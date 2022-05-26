//TMDB APIS
//INDIVIDUAL APIS; can work by adding path to base url at the time used also

const api_key="1e75158dd9345ba1d83077ed37edb1fd";
const base_url = 'https://api.themoviedb.org/3';

const search_http="https://api.themoviedb.org/3/search/movie?sort_by=popularity.desc&";
const sort_http = base_url + '/discover/movie?sort_by=popularity.desc&';

//base url +filesize(w500); need to add poster_path
const img_url = "https://image.tmdb.org/t/p/w500";
const original_img_url = "https://image.tmdb.org/t/p/original"; //img in org resolution

const trending_movies_http=base_url+'/trending/movie/week?';

const top_rated_movies_http=base_url+'/movie/top_rated?';
const popular_movies_http=base_url+'/movie/popular?';

const genres_list_http = base_url+'/genre/movie/list?';
const movie_genres_http = base_url+'/discover/movie?';

const movie_details_http = base_url+'/movie';

const latest_movies_http=base_url+'/movie/latest?';

// https://api.themoviedb.org/3/discover/movie?api_key=[MY_KEY]&language=en-US&sort_by=release_date.desc&page=1&primary_release_date.gte=2002-01-01&primary_release_date.lte=2005-12-31&vote_average.gte=8&with_genres=35


//movie_details_http -"/movie"

// const searchURL = BASE_URL + '/search/movie?'+API_KEY;

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