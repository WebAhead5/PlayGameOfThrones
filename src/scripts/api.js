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