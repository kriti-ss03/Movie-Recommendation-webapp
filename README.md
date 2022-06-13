
# Movix 

![Movix](https://user-images.githubusercontent.com/96840464/173404151-b2e72c1c-8bbd-4eb0-a053-521d7a6321fa.png)


**Movix** is a movie-browsing and recommending platform. It makes movie-browsing experience smooth and efficient and recommends movies based on the **search queries, categories selected and some user-specific data.** It recognizes the trends and suggests the movies and further provides information (movie details and related clips) and similar items for each of the movie so as to help the user find what suits them!

This web application is my submission for **Microsoft Engage'22** challenge.
## Run locally


- Clone the given repository into your device

- Run the command ```npm install``` in your terminal in the root directory of the project to install the various dependencies

- Install nodemon as a dev dependency by running ```npm install --save-dev nodemon``` in your terminal

- For the Ask Friend mail feature, in the following codes in server.js file:
   ```
   const CLIENT_ID = process.env.CLIENTID;
   const CLEINT_SECRET = process.env.CLIENTS;
   const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
   const REFRESH_TOKEN = process.env.RT;
   const EMAIL_ID = process.env.EMAIL; 
   ``` 
   replace ``` process.env.${name} ``` by respective values from gmail account of your choice. For using googleapis (since less secure feature is no longer supported)  the CLIENT_ID and CLEINT_SECRET can be generated from [Google Cloud Platform](https://console.cloud.google.com) and REFRESH_TOKEN from [Google Developers OAuth 2.0 Playground](https://developers.google.com/oauthplayground). Follow the [Video](https://youtu.be/-rcRf7yswfM) incase of any difficulty.

- Now run ``` nodemon server.js ``` in the terminal

- The app is now up and running on port 3000!

npm packages used:

``` "body-parser": "^1.20.0","dotenv": "^16.0.1", "ejs": "^3.1.8", "express": "^4.18.1", "googleapis": "^101.0.0","nodemailer": "^6.7.5","nodemon": "^2.0.16" ```

## Video Demo and App Link

Drive link for the same:
https://drive.google.com/drive/folders/1KbXTlCLtwdBFrAfY9unhoyPLBHx9Fo-x?usp=sharing

## Important Note
The Ask Friend feature is now updated according to [google's new policy](https://support.google.com/accounts/answer/6010255?hl=en). Incase of difficulty with the feature in deployed app, run it locally!

## Movix Features

- The Top 20 trending movies are highlighted to make user up to date and discover it easily.

- Discover all-time hits and popular movies.

- Explore all the genre-based categorised movies on the landing page.

- For each movie, the important details are provided to help the user make a better choice.

- Trailers and Videos Clips are attached which can be zoomed in and out as per the choice.

- All the Similar Movies for each of the movie is also provided based on the common genres and user selection.

- An easy-to-use search option helps to find the desired movie.

- Finding movies with multiple genres is also feasible. Select as many genres as you can and the intersection of them will be shown!!!

- **SUGGEST ME** feature makes it feasible to get movie specific for your age and language preferred. Results are based on the popularity, genres popular at that age, year of release and vote count for the language and age group chosen!

- The **SHOOT MORE** option is given to further filter up the movies from Suggest Me results, so that user can go to quick watch with a click.

- Apart from this **ASK FRIEND** feature is also there which helps the user to get recommendation from their closed ones by sharing movie-list.

- Responsive and easy to the eyes UI.
### Quick Note on Recommendation Systems, Algorithms and APIs :

Used TMDB apis for fetching data based on various parameters and further sorted it out if needed

**Incorporated Recommendations based on-**

-  popularity: Trending, Top-Rated and Popular Section
- classifiers: selection of genre(s), similar movies

    I used CONTENT-BASED filtering to compare how alike the movies are so as to  get items according to user selection. This item-item based similarity and user-item interaction helped to build the Search engine, Multiple genres selection feature and Similar movies features from the TMDb

- algo: user-data specific suggestions; Suggest Me feature 

    The data is further clustered according to user preference- age groups and language choosen. This is especially helpful in case user is new to platform or don't know what to watch. This will recommend the desired movie and is as easy as cake!


**Segregated conditions of Age Group and Language based on resarch and analyzing data collected under different genre-specific movies.**

#### Understanding Suggest Me Section Further-

 **AGE GROUP:** helped to select genres

* Popular Genres in Age group of kids are Animation/Fantasy and Family movies
* Popular Genres in Age group of adult are DRAMA ACTION COMEDY THRILLER ROMANCE. However on analysis I came to conclusions that DRAMA genre is very common and usually present in most of the movies. Thus,increasing teh chance of suggesting SIMILAR ITEMS twice alike to Thriller genre case. So I tried to fix this by dropping them and adding 2 additional yet popular genres MYSTERY and ADVENTURE. The reason for choosing these two is based on data analysis that other genres like documentry, sci-fi, TV movies, etc. lack big user-base and movies under these categories. Selecting the former two genres further increase the scope of user liking atleast one of these genre-category!

**REGION/LANGUAGE:** to select range of movie-details 

* The preferred language helped to decide VOTE COUNT, VOTE AVERAGE and year of PRIMARY RELEASE range! As the English movies are more viewed and thus more rated than Indian ones so I used vote average> 7 for English and >6 for hindi depending upon the voted count.

Finally fetched the data from the URL developed using params:

- year of release
- vote count
- popularity: high
- language choosen
- arrays of genres

The **SHOOT MORE** feature enhances the user experience by providing unique elements out of each filtered results, so as to give the option of quick-watch !!!

This feature somewhat follows COLLABORATIVE FILTERING because it sorts the data based on specific type of user who belongs to certain age and prefers certain language. Although a wholesome collaborative filtering is much more user centric and more complex but it won't be able to suggest items without the database of the user browsing history. So with this build there is possibility of resolving the problem that it's possible to give user suggestion who is NEW TO PLATFORM!!.

#### Refrences used for the Genres choosen based on Age and three types of recommendation system stated:

https://in.springboard.com/blog/recommender-system-with-python/

https://towardsdatascience.com/the-4-recommendation-engines-that-can-predict-your-movie-tastes-109dc4e10c52


## Flow Chart

![flowChart](https://user-images.githubusercontent.com/96840464/173403069-6f7d6e1f-0a67-422a-8179-e96a6fb7b253.jpg)
## Tech Stack

- Front-end languages and technologies: HTML, CSS, Javascript

- Front-end framework: Bootstrap to design the user interface (UI)

- Templating language: EJS

- Backend: Node.js, Express.js

- Api and database: from TMDB dev community

- GoogleApis and Nodemailer: To facilitate sending mail invite from the app itself on submitting a form 

- Postman: to build apis and verify/analyze data for the suggest-me feature

- Fontawesome and Flaticon: For all the icons in the web app

- Freepik ans Unsplash: For all the images in the web app
## Software Development Cycle:

Throught the tenure I used Agile Methodology to organize myself to learn-design-develop-review-evalute so as to solve all the bugs and minor issues that a user can face! 

- **LEARN**: Understanding the PS and learning the basics cause I'm a beginner

- **IDEATE**: Ideating and implementing the basic model-Minimum Viable Product(MVP)

- **BUILDING INTERFACE**: Implementation of how front-end should look

- **INCORPORATING COMPLEX FEATURES**: Understanding the process and implementing the complex features


## Thoughts behind the UI/UX:

I wanted the UI to be simple and eye soothing, since this is a movie-recommender-app which meant the user is going to spend a lot of time in front of the screen. I designed it in dark theme and make each page connected to each other in style and flow.

 Moreover, I tried to highlight things like _Trending section_ and _Anchor keys_ that helps the user to discover popular things easily. The _buttons_ were made with the motto to provide better user experience. The flow was made further clear by providing alerts and using active styles of buttons.
 The main motto of the app Fast, Smooth and give better user experience is thus ensured.
## What's next for the app?:

- Incorporate invite friend feature so as to get personalized movie viewing and real time chatting under Ask Friend.

- Make Ask Friend and Suggest Me smart: by making our app hands free with the help of AI, individual user-database and better search system. For Suggest Me the review/rating giving system can be added and then comparing it with the vote average and similarity among them the movie can be suggested. 

- Add a login system to personalized the movie subscription system.

- Make further improvements in UI
