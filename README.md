![](https://i.imgur.com/1SNqWjb.jpg)

#   Play GameOfThrones

##   Our Website
The website is basically a quiz game of the TV show Games Of Thrones.
The user sees a charachters name displayed, and according to the movie he has to guess to which house this specific charachter belongs to.

## SO HOW DOES IT WORK
The game uses an API fetched from
    
    https://anapioficeandfire.com/

Which is a database specific for GOT information about each charachter,
and it gets the name of the charechter, and display's 3 options of houses which this charachter comes from.

![](https://i.imgur.com/HgoINGL.png)



## API CODE

        function fetch (url, callback) {
      var xhr = new XMLHttpRequest();

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);
          return callback(response);
        }
      });
      xhr.open('GET', url);
      xhr.send();
    }
    function getCharacters(callback){
        fetch("https://www.anapioficeandfire.com/api/characters?page=1&pageSize=50",
            callback);
    }
    function getHouses(callback){
        fetch("https://www.anapioficeandfire.com/api/houses?page=1&pageSize=50",
            callback);
    }
    function getHouse(url,callback){
        return fetch(url, callback);
    }
----
The user has two options on the screen, and a life counter,
if the player decides he wants to skip the question he will lose half a life, if he guesses wrong he will lose a life.

    We used DOM manipulation, javascript, HTML & CSS for this project.

---

# HAVE FUN 
