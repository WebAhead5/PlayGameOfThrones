var index = 0;
var lives = 7;
var questionsNumber = 10;
var characters =[];
var houses = [];
var questions = [];

//init the characters and houses arrays
function init(){
    //call get characters api
    getCharacters(function(response){
        var tempArray = [];
        //get non empty names from response
        response.map(function(char){
           if(char.name.length > 0 && char.allegiances.length > 0){
                if(!tempArray.includes(char.name)){
                    tempArray.push(char.name);
                    characters.push({"name":char.name,"family":char.allegiances[0]});
                }
           }
        });
        console.log(characters);
        getCharsFamilyName();
    });

    //call get houses api
    getHouses(function(response){
        //get non empty houses from response
        response.map(function(house){
           if(house.name.length > 0){
               houses.push({"name":house.name, "url": house.url});
           }
        });
        //TODO : be sure to move this line after getting response from both api's'

    });


    var skipButton = document.getElementById("skip");
    skipButton.addEventListener("click",skip);

    var answer1Figure = document.getElementById("img1");
    answer1Figure.addEventListener("click",answerClick);

    var answer2Figure = document.getElementById("img2");
    answer2Figure.addEventListener("click",answerClick);

    var answer3Figure = document.getElementById("img3");
    answer3Figure.addEventListener("click",answerClick);
}

function getCharsFamilyName(){
    characters.map(function(char){
        getHouse(char.family,function(response){char.family = response.name});
        //getHouse(char.family,function(response){console.log(response.name)});
    });
}


function fillQuestions() {
     for(let i=0; i < questionsNumber; i++){
        questions.push(
           {
           "char": characters[i].name,
           "answer1" : characters[i].family,
           "answer2" : houses[i].name,
           "answer3" : houses[i+1].name
           }
        );
     }
     console.log(questions);
}


// get question according to index
function getQuestion(index){
    return questions[index];
}

// response for skip click
function skip(){
    if(lives > 0.5){
        lives-= 0.5;
    }
    changeUiToNextQuestion(getQuestion(++index), lives);
}

//response for next click
function next(){
    changeUiToNextQuestion(getQuestion(++index), lives);
}

//response for answer click
function answerClick(event){
    console.log(event.path[2]);
    const clickedClassName = event.path[2].className;
    var nextButton = document.getElementById("next");
    nextButton.addEventListener("click",next);

    var figure = event.path[2];
    if(clickedClassName.includes("1")){
         figure.style.border = '2px solid green';
    }else{
         figure.style.border = '2px solid red';
         lives -= 1;
    }
}

//Dom manipulation
function changeUiToNextQuestion(question, score){
   questionTextDomElement = document.querySelector('#charName');
   questionTextDomElement.textContent = question.char;


   answer1DomElement = document.querySelector('#house1');
   answer1DomElement.textContent = question.answer1;

   answer2DomElement = document.querySelector('#house2');
   answer2DomElement.textContent = question.answer2;

   answer3TextDomElement = document.querySelector('#house3');
   answer3TextDomElement.textContent = question.answer3;

   scoreTextDomElement = document.querySelector('#score');
   scoreTextDomElement.innerHTML = score;

}

init();

//TODO: this is a temporary solution
setTimeout(function(){
    fillQuestions();
    changeUiToNextQuestion(getQuestion(index),lives);
},6000);
