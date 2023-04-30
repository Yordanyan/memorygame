const moves = document.getElementById("moves");
const timeValue = document.getElementById("times");
const buttonStart = document.getElementById("start");
const buttonStop = document.getElementById("stop");
const maincontainer = document.querySelector(".main-container");
const result = document.getElementById("result");
const starter = document.querySelector(".starter");
const wrapper = document.querySelector(".wrapper");
const elementSize = document.getElementById("number-input");
const box = document.querySelector(".box");
const resultGame = document.querySelector(".resultgame");

let cards;
let interval;
let time;
let repeating;
let firstCard = false;
let firstCardValue = false;
let secondCard = false;
let secondCardValue = false;
let xsize = 16;
let seconds = 0;
let minutes = 0;
let movesCount = 0;
let matchedCount = 0;


const items = [
    {name:"banana",image:"banana.png"},
    {name:"orange",image:"orange.png"},
    {name:"kiwi",image:"kiwi.png"},
    {name:"pomegranate",image:"pomegranate.png"},
    {name:"apple",image:"apple.png"},
    {name:"pineapple",image:"pineapple.png"},
    {name:"peach",image:"peach.png"},
    {name:"mango",image:"mango.png"}
];



const timeGenerator = () =>{
    seconds +=1;

    if(seconds >= 60){
        minutes += 1;
        seconds = 0;
    }
    let secondValue = seconds < 10 ? `0${seconds}`:seconds;
    let minutesValue = minutes < 10 ? `0${minutes}`:minutes;
    timeValue.innerHTML = `<span>Time: </span>${minutesValue}:${secondValue}`;

};

const movesCounter = () =>{
    movesCount +=1 ;
    moves.innerHTML = `<span>Moves:</span>${movesCount}`;
}

function randomObjects(array, size) {
    const inputLen = array.length;
    let targetSize = size;

    const cardValues = new Array(targetSize);
    for (let i = 0; i < targetSize; i += 2) {
      const j = Math.floor(Math.random() * inputLen);
      const obj = { ...array[j] };
      cardValues[i] = obj;
      cardValues[i + 1] = obj;
    }
    for (let i = targetSize - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardValues[i], cardValues[j]] = [cardValues[j], cardValues[i]];
    }
    return cardValues;
  }

  

const containerGenerator = (cardValues,size) =>{
    maincontainer.innerHTML = "";
    cardValues.sort(()=> Math.random() - 0.5);
    for(let i = 0;i < size;i++){
        maincontainer.innerHTML +=`
        <div class="card-container" data-card-value = "${cardValues[i].name}">
            <div class="card-before">?</div>
            <div class="card-after">
                <img src="images/${cardValues[i].image}" class="image"/>
            </div>
        </div>
        

        `;
}

if(xsize/4 > 6){
    repeating = 6;
}
else{
    repeating = 4;
}

maincontainer.style.gridTemplateColumns = `repeat(${repeating},auto)`;
maincontainer.style.gridTemplateRows = `repeat(${xsize/repeating},auto)`;

cards = document.querySelectorAll(".card-container");
cards.forEach((card) => {
    card.addEventListener("click", () => {
      if (!card.classList.contains("matched")) {
        card.classList.add("flipped");
        if (!firstCard) {
          firstCard = card;
          firstCardValue = card.getAttribute("data-card-value");
        } else {
          movesCounter();
          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");
          if (firstCardValue == secondCardValue) {
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            firstCard = false;
            matchedCount += 1;
            if (matchedCount == Math.floor(cardValues.length / 2)) {
            result.innerHTML = `<h2>You Won</h2>
            <h4>Moves: ${movesCount}</h4>`;
            resultGame.classList.remove("hide");
            box.classList.remove("hide");
            
            }
          } else {
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
  });
};
wrapper.classList.add("hide");
resultGame.classList.add("hide");
buttonStart.addEventListener("click",()=>{
    if(elementSize.value > 36){
        xsize = 36;
    }else{
        xsize = elementSize.value;
    }
    movesCount = 0;
    time = 0;
    wrapper.classList.remove("hide");
    starter.classList.add("hide");
    buttonStop.classList.remove("hide");
    buttonStart.classList.add("hide");
    box.classList.add("hide");
    timeGenerator()
    interval = setInterval(timeGenerator,1000);
    moves.innerHTML =  `<span>Moves</span> ${movesCount}`;
    starting();
})

buttonStop.addEventListener("click",(stopGame = () =>{
    location.reload();
}))

const starting = () => {
    result.innerText = "";
    matchedCount = 0;
    let cardValues = randomObjects(items,xsize);
    containerGenerator(cardValues,xsize);
}


