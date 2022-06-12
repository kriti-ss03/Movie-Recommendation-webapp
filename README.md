# Movie-Recommendation-webapp
About Movix:

Movix is a platform to make movie-browsing experience smooth and efficient. It recommends movies based on the search query, categories selected and some user-specific data. It recognizes the trends and suggests the movies.It further provides information and similar items for each of the movie so as to help the user find what suits them! Further this sums up the motive Search.Select.shoot.




Features:

-The Top 20 trending movies are highlighted to make users up to date and discover it easily.

-Discover all-time hits and popular movies.

-Explore all the genre-based categorised movies on the landing page. 

-For each movie, the important details are provided to help the user make a better choice.

-Trailers and Videos Clips are attached which can be zoomed in and out as per the choice.

-All the Similar Movies for each of the movie is also provided.

-An easy-to-use search option helps to find the desired movie.

-Finding movies with multiple genres is also feasible. Select as many genres as you can and the intersection of them will be shown!!!

-SUGGEST ME feature makes it feasible to get movie specific for your age and language you like.

-The SHOOT MORE option is also given to filter up movies based on the popularity, genres popular at that age, year of release and vote count for the language and age group chosen!

-Further. explore the similar movie options for each!

-Responsive and easy to the eyes UI












How to run this project locally:

Clone the given repository into your device
Run the command npm install in your terminal in the root directory of the project to install the various dependencies
Install nodemon as a dev dependency by running npm install --save-dev nodemon, body-parser to cover post request by npm install body-parser
 in your terminal and Require body-parser, express and ejs (view engine)
Now run nodemon server.js in the terminal
The app is now up and running on port 3000!






RECOMMENDATION SYSTEM, ALGORITHMS AND API USED:

Used TMDB apis for fetching data based on various parameters and further sorted it out if needed

Recommendations by-

1)
Incorporated recommendations by popularity item-> Trending, Top-Rated and Popular Section

recommendations using classifier-> selection of genre(s), similar movies

I used CONTENT-BASED filtering to get items according to user selection and comparing how alike the movies are. This item-item based similarity and user-item interaction helped to build the Search engine, Multiple genres selection feature and Similar movies features
 

2)
Further filtered the data according to age groups and language choosen especially helpful if the user is new to platform or don't know what to watch.
This will recommend the desired movie and is as easy as cake!

Logic-
According to resarch and data analysis.

Logic Behind AGE GROUP

i) Popular genres in Age group of kids are Animation/Fantasy and Family movies
ii) Popular Genres in Age group of adult are DRAMA ACTION COMEDY THRILLER ROMANCE. However on analysis I came to conclusions that DRAMA genre is very common and usually present in most of the movies. Thus,increasing teh chance of suggesting SIMILAR ITEMS twice. Likewise for Thriller. So I tried to fix this by dropping them and adding 2 additional yet popular genres MYSTERY and ADVENTURE. The reason for choosing these two is based on data analysis that other genres like documentry,sci-fi,TV movies don't lack user base or items.
This further increase the scope that user will like any of these genres atleast.

Logic Behind REGION/LANGUAGE

The preferred language helped to decide VOTE COUNT, VOTE AVERAGE and year of PRIMARY RELEASE range!
As the English movies are more viewed and thus more rated than Indian ones so I used vote average> 7 for English and >6 for hindi depending upon teh voted count.

Finally fetched the data using params

- year of release

-vote count

-high popularity 

-language choosen

-arrays of genres

The SHOOT MORE feature enhances the user experience  by providing unique elements out of each filtered results !!!

This feature somewhat act as COLLABORATIVE FILTERING because it sorts the data based on specific type of user who belongs to certain age and prefers certain lamguage. 
Although a wholesome collaborative filtering is much more user centric but it won't be able to suggest items without the database of the user and that is not possible if the user is NEW TO PLATFORM!!
So with this build there is possibility of resolving that problem.

Refrences used for the genres choosen and 3 types of recommendation system:

https://in.springboard.com/blog/recommender-system-with-python/

https://towardsdatascience.com/the-4-recommendation-engines-that-can-predict-your-movie-tastes-109dc4e10c52






Important note:

Currently I'm building Ask Friend feature so the buttons won't work there! 







Technologies and Resources used:

-Front end languages and technologies: HTML,CSS,Javascript

-Front-end framework: Bootstrap to design the user interface (UI)

-Templating language: EJS

-Backend: Node.js, Express.js

-Api and databas: from TMDB dev community

-Postman: to build apis and verify/analyze data for the suggest-me feature

-Fontawesome and Flaticon: For all the icons in the web app

-Freepik ans Unsplash: For all the images in the web app






Software Development Cycle in the making of this app:

Throught the tenure i organized myself to learn-design-develop-review-evalute procedure to solve all the bugs and minor issues that a user can face!

LEARN
Understanding the PS and learning the basics cause I'm a beginner

IDEATE
Ideating and implementing the basic model-Minimum Viable Product(MVP)

BUILDING INTERFACE
Implementation of how front-end should look

INCORPORATING COMPLEX FEATURES
Understanding the process and implementing the complex features








Thoughts behind the UI/UX:

I wanted the UI to be simple and eye soothing, since this is a movie-recommender-app which meant the user is going to spend a lot of time in front of the screen. I designed it in dark theme and make each page connected to each other. Moreover, I tried to highlight things like Trending section, Anchor keys and button that helps the user to discover things easily. I tried to see wheteher correct button is selcted or not (by providing prompts) and it's get focused if selected to let user know about the same. The main motto is that it's Fast, Smooth and give better user experience








What's next for the app?:

Make the Ask Friend feature for sending movie names via nodemailer and also having personalized movie viewing and chatting room

Make Suggest Me smart. By incorporating rating system and then comparing it with the vote average and finding similarity among them. We can also make our app hands free with the help of AI and database. By collecting data and selecting the genres based on their of selections and movies watched.

Add a login system to personalized the movie subscription system.

Make further improvements in UI
