var index = 0;
var lives = 3;
var questionsNumber = 10;
var characters =[];
var houses = [];
var questions = [];
var answerClicked = false;
const ON = "on";
const OFF = "off";

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
           getCharsFamilyName();
        });

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
    });
}


function fillQuestions() {
     var tempChars = new Set();
     while(tempChars.size < 10){
        var charIndex = Math.floor(Math.random() * characters.length);

        tempChars.add(
           {
           "char": characters[charIndex].name
           }
        );
     }


     questions = Array.from(tempChars);

     questions.map(function(element){
        var familyNameRandomFirstIndex = Math.floor(Math.random() * houses.length);
        var familyNameRandomSecondIndex = Math.floor(Math.random() * houses.length);
        let rightAnswer = characters.filter(function(char){ return char.name == element.char})[0].family;
        while(familyNameRandomFirstIndex === familyNameRandomSecondIndex ){
            familyNameRandomSecondIndex = Math.floor(Math.random() * houses.length);
        }
        element["answers"] =
                      [ rightAnswer,
                        houses[familyNameRandomFirstIndex].name,
                        houses[familyNameRandomSecondIndex].name]

     });

}


// get question according to index
function getQuestion(index){
    if(index < questions.length){
        return questions[index];
    }
}

// response for skip click
function skip(){
    if(lives > 0.5){
        lives-= 0.5;
        changeUiToNextQuestion(getQuestion(++index), lives);
    }else{
        alert("Skip not allowed - your score less than 1")
    }


}

//response for next click
function next(){
    changeUiToNextQuestion(getQuestion(++index), lives);
}

//response for answer click
function answerClick(event){
    let rightAnswer = characters.filter(function(char){ return char.name == questions[index].char})[0].family;
    let chossenAnswer = event.path[1].childNodes[3].innerText;

    const clickedClassName = event.path[2].className;
    changeNextButtonStatus(ON);

    var figure = event.path[2];

    if(!answerClicked){
        answerClicked = true;
        if(chossenAnswer === rightAnswer){
             figure.style.border = '2px solid green';
        }else{
            figure.style.border = '2px solid red';
            if(lives >= 1)
                lives -= 1;
            scoreTextDomElement = document.querySelector('#score');
            scoreTextDomElement.innerHTML = lives;
            if(lives <= 0){
                alert("GAME OVER - Play again?");
                location.reload();
            }
        }


    }
}

//Dom manipulation
function changeUiToNextQuestion(question, score){
    answerClicked = false;
    question.answers = randomizeArray(question.answers);

    changeNextButtonStatus(OFF);

    answer1AreaDomElement = document.querySelector('.choice1');
    answer1AreaDomElement.style.border = 'none';

    answer2AreaDomElement = document.querySelector('.choice2');
    answer2AreaDomElement.style.border = 'none';

    answer3AreaDomElement = document.querySelector('.choice3');
    answer3AreaDomElement.style.border = 'none';

    questionTextDomElement = document.querySelector('#charName');
    questionTextDomElement.textContent = question.char;


    answer1DomElement = document.querySelector('#house1');
    answer1DomElement.textContent = question.answers[0];

    answer2DomElement = document.querySelector('#house2');
    answer2DomElement.textContent = question.answers[1];

    answer3TextDomElement = document.querySelector('#house3');
    answer3TextDomElement.textContent = question.answers[2];

    scoreTextDomElement = document.querySelector('#score');
    scoreTextDomElement.innerHTML = score;

}

function randomizeArray(array){
    let resultIndexes = [];
    while(resultIndexes.length < array.length){
        var r = Math.floor(Math.random() * array.length);
        if(resultIndexes.indexOf(r) === -1) resultIndexes.push(r);
    }
    return array.map(function(value,index){
        return array[resultIndexes[index]];
    });
}

function changeNextButtonStatus(status){
    nextButtonDomElement = document.querySelector('#next');
    if(status == ON){
       nextButtonDomElement.style.opacity = "1";
       nextButtonDomElement.addEventListener("click",next);
       nextButtonDomElement.style.pointerEvents = "visible";
    }else if(status == OFF){
       nextButtonDomElement.style.opacity = "0.6";
       nextButtonDomElement.style.pointerEvents = "none";
    }


}

init();
//TODO: this is a temporary solution
setTimeout(function(){
    fillQuestions();
    changeUiToNextQuestion(getQuestion(index),lives);
},6000);