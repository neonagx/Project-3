<center>
## PROJECT 3 - MovieFindr    

CREATED BY

**Paul Baik**  
**Darin Ma**  
**Gaye Lowenstein**  
</center>

###DESCRIPTION
__MovieFindr__ is a place to search multiple databases at once to find where a movie is being streamed online.

How often do you think of a movie to watch and then have to search to find if it's on Hulu or Amazon or Netflix?  Wouldn't you love to have a place where you could search multiple databases all at once?  How about storing a list of movies to watch in the future so you don't have to go through an exhausting search each time you want to watch a movie?
####_<center>Enter **MovieFindr**!</center>_

###APPROACH TAKEN
Team PaDaGa's approach in building this app was to start off with a Node.js framework using Express for our server side and MongoDB for our database management.  

We divided up the project so that each team member took the lead role as follows:

  Team Leader  | Role
  -----------  | ----------
  Paul         | GitHub Master, Scrum Master
  Darin        | Design Master, 3rd-Party API Integration
  Gaye         | Documentation Master, Database Management

###MVP
* Have a working Google OAuth for users to log on and log off
* Allow users to be able to create, edit, update and delete their movie list (full CRUD)
* Allow users to sort movies by watched or not watched
* Allow users to search through movies using 3rd Party API (Guidebox)
* Allow users to see which providers are showing the movies (Guidebox)

###LINKS
[Trello Board Link](https://trello.com/b/QMrl81kr/moviefindr "Trello Board")

![Wireframes](assets/wireframe_original_home.png)
![Wireframes](assets/wireframe-home.png)
![Wireframes](assets/wireframes.png)

![ERD](assets/erd.png)

###TECHNOLOGIES USED
* __AJAX__ - client side script that communicates with a server/database (Express/MongoDB)
* __EJS__ - client-side templating language to generate HTML with JavaScript
* __Express__ - server side framework to organize our app into MVC architecture
* __GuideBox__ - 3rd party API
* __JavaScript__ - object-oriented computer programming language
* __Materialize__ - responsive CSS framework from Google used for styling
* __MongoDB__ - platform to build our database
* __Node.JS__ - platform to run our Javascript application
* __OAuth__ - allows an end user's account info to be used by 3rd-party services without exposing the user's passwords

###INSTALLATION INSTRUCTIONS

* Clone this repo into your Terminal
* Run npm install
* Create .env file

_This is the format of your .env file:_

```
LOCAL_DB=movieFindr  
GOOGLE_CLIENT_ID=<Your Key Here>  
GOOGLE_SECRET=<Your Key Here>  
GOOGLE_CALLBACK=http://localhost:3000/oauth2callback
```  

* Obtain API keys from Google for OAuth
* Save Google API keys in your .env file
* Open another Terminal window and type in **mongod**
* Go back to original Terminal window and type in **nodemon**
* Navigate to **localhost:3000** in your browser

###STRETCH GOALS

* Allow users to search for showtimes at nearby theaters
* Allow users to see theaters on a map
* Allow users to be redirected to purchase or rent the movie
* Allow users to see when a movie will be released on DVD/BluRay
