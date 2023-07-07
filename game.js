function randomize(range, count){
    let nums = new Set();
    while (nums.size < count) {
        nums.add(Math.floor(Math.random() * (range)));
    }
    randomArr = [...nums]
    return randomArr;
}

let body = document.querySelector('body');

let solvedSection = document.createElement('div');
solvedSection.className = 'solved';
solvedSection.innerHTML = 'qwqwdqwd';

let div = document.createElement('div');
div.className = 'all';

let topButtons = document.createElement('div');
topButtons.className = 'top__buttons';

let save = document.createElement('button');
save.className = 'buttons';
save.id = 'save';
save.innerText = 'Save';

let results = document.createElement('button');
results.className = 'buttons';
results.id = 'solve';
results.innerText = 'Solve ( ͡° ͜ʖ ͡°)';

let stops = document.createElement('button');
stops.className = 'load__button';
stops.innerText = 'Load';

let shuffleStart = document.createElement('button');
shuffleStart.className = 'buttons';
shuffleStart.id = 'shuffle';
shuffleStart.innerText = 'Shuffle and start';

topButtons.append(shuffleStart, stops, save, results);

let movesTime = document.createElement('div');
movesTime.className = 'moves__time';

let movesTxt = document.createElement('span');
movesTxt.className = 'txt';
movesTxt.innerHTML = 'Moves: 0';

let time = document.createElement('span');
time.className = 'txt';
time.innerText = 'Time:'

let stopwatch = document.createElement('span');
stopwatch.className = 'txt';
stopwatch.innerHTML = '00:00';

movesTime.append(movesTxt, time, stopwatch);

let game = document.createElement('div');
game.className = 'game';

let random = randomize(16, 16);
for(let i = 0; i < 16; i++){
    if(random[i] == 0){
        let cell = document.createElement('div');
        cell.className = 'zero__cell';
        cell.innerText = `${random[i]}`;
        game.append(cell); 
    } else {
        let cell = document.createElement('div');
        cell.className = 'game__cell';
        cell.innerText = `${random[i]}`;
        // cell.id = random[i] + 64;
        cell.draggable = false;
        game.append(cell); 
    }
}


let frameSize = document.createElement('div');
frameSize.className = 'frame__size';

let frame = document.createElement('span');
frame.className = 'txt';
frame.id = 'frametxt';
frame.innerText = 'Frame size: 4x4';
frameSize.append(frame);

let otherSize = document.createElement('div');
otherSize.className = 'other__size';

let otherSizes = document.createElement('span');
otherSizes.className = 'txt';
otherSizes.innerText = 'Other sizes:';

let three = document.createElement('button');
three.className = 'size__buttons';
three.id = '9';
three.innerText = '3x3';
let four = document.createElement('button');
four.className = 'size__buttons';
four.id = '16';
four.innerText = '4x4';
let five = document.createElement('button');
five.className = 'size__buttons';
five.id = '25';
five.innerText = '5x5';
let six = document.createElement('button');
six.className = 'size__buttons';
six.id = '36';
six.innerText = '6x6';
let seven = document.createElement('button');
seven.className = 'size__buttons';
seven.id = '49';
seven.innerText = '7x7';
let eight = document.createElement('button');
eight.className = 'size__buttons';
eight.id = '64';
eight.innerText = '8x8';
otherSize.append(otherSizes, three, four, five, six, seven, eight);

div.append(topButtons, movesTime, game, frameSize, otherSize);
body.append(div, solvedSection);   


let root = document.querySelector(':root');
const changingButtonSize = e => {
    let elem;
    if(e === 1){
        elem = 16;
    } else {
        elem = e;
    }
    // switch(e.target.id){
    //     case undefined:
    //         elem = 9;
    //         break;
    //     case 'shuffle':
    //         elem = game.children.length;
    //         break;
    //     default:
    //         elem = e.target.id;
    //         break;
    // }
    while(game.firstChild){
        game.removeChild(game.lastChild);
    }
    movesTxt.innerHTML = 'Moves: 0';
    root.style.setProperty('--width', `${Math.sqrt(elem) * 100}px`);
    root.style.setProperty('--height', `${Math.sqrt(elem) * 100}px`);
    document.getElementsByClassName('game')[0].style.gridTemplateColumns = `repeat(${Math.sqrt(elem)}, 1fr)`;
    document.getElementById('frametxt').innerText = `Frame size: ${Math.sqrt(elem)}x${Math.sqrt(elem)}`;
    let random = randomize(+elem, +elem);
    for(let i = 0; i < +elem; i++){
        if(random[i] == 0){
            let cell = document.createElement('div');
            cell.className = 'zero__cell';
            cell.innerText = `${random[i]}`;
            game.append(cell); 
        } else {
            let cell = document.createElement('div');
            cell.className = 'game__cell';
            cell.innerText = `${random[i]}`;
            // cell.id = random[i] + 64;
            cell.draggable = false;
            game.append(cell); 
        }
    }
    setDraging();
    countingMoves = 0
    clearInterval(interval);
    minutes = 0;
    seconds = 0;
    interval = setInterval(stopWatch, 1000);
}

let zeroIndex;

function setDraging(){
    let gameArr = Array.from(document.getElementsByClassName('game')[0].childNodes);
    let game = document.getElementsByClassName('game')[0].childNodes;
    let arrayLine = Math.sqrt(gameArr.length);
    zeroIndex = gameArr.findIndex((elem) => elem.innerHTML == '0');
    let zeroInLine = zeroIndex;
    while(zeroInLine < gameArr.length){
        zeroInLine += arrayLine;
    }
    zeroInLine -= gameArr.length;
    let arr = [zeroIndex - arrayLine, zeroIndex + arrayLine, zeroIndex + 1, zeroIndex - 1];
    gameArr.forEach((elem) => {
        elem.removeEventListener("click", slideToEmpty);
        elem.draggable = false
    });
    addEventsToGameCell();
    if(zeroIndex >= 0 && zeroIndex <= arrayLine - 1){ //if empty cell in top of game
        game[arr[1]].addEventListener("click", slideToEmpty);
        game[arr[1]].draggable = true;
        if(zeroInLine === 0){
            game[arr[2]].addEventListener("click", slideToEmpty);
            game[arr[2]].draggable = true;
            return;
        } else if (zeroInLine === arrayLine - 1){
            game[arr[3]].addEventListener("click", slideToEmpty);
            game[arr[3]].draggable = true;
            return;
        } else {
            game[arr[2]].addEventListener("click", slideToEmpty);
            game[arr[3]].addEventListener("click", slideToEmpty);
            game[arr[2]].draggable = true;
            game[arr[3]].draggable = true;
            return;
        }
    }

    if(zeroIndex >= gameArr.length - arrayLine && zeroIndex <= gameArr.length - 1){ //if empty cell in bottom of game
        game[arr[0]].addEventListener("click", slideToEmpty);
        game[arr[0]].draggable = true;
        if(zeroIndex === gameArr.length - arrayLine){
            game[arr[2]].addEventListener("click", slideToEmpty);
            game[arr[2]].draggable = true;
            return;
        } else if (zeroIndex === gameArr.length - 1){
            game[arr[3]].addEventListener("click", slideToEmpty);
            game[arr[3]].draggable = true;
            return;
        } else {
            game[arr[2]].addEventListener("click", slideToEmpty);
            game[arr[2]].addEventListener("click", slideToEmpty);
            game[arr[2]].draggable = true;
            game[arr[3]].draggable = true;
            return;
        }
    }

    if(zeroInLine === 0){ // if empty cell in left side of game
        game[arr[0]].addEventListener("click", slideToEmpty);
        game[arr[1]].addEventListener("click", slideToEmpty);
        game[arr[2]].addEventListener("click", slideToEmpty);
        game[arr[0]].draggable = true;
        game[arr[1]].draggable = true;
        game[arr[2]].draggable = true;
        return;
    }

    if(zeroInLine === 3){ // if empty cell in right side of game
        game[arr[0]].addEventListener("click", slideToEmpty);
        game[arr[1]].addEventListener("click", slideToEmpty);
        game[arr[3]].addEventListener("click", slideToEmpty);
        game[arr[0]].draggable = true;
        game[arr[1]].draggable = true;
        game[arr[3]].draggable = true;
        return;
    }
    // if empty cell in middle side of game
    game[arr[0]].addEventListener("click", slideToEmpty);
    game[arr[1]].addEventListener("click", slideToEmpty);
    game[arr[2]].addEventListener("click", slideToEmpty);
    game[arr[3]].addEventListener("click", slideToEmpty);
    game[arr[0]].draggable = true;
    game[arr[1]].draggable = true;
    game[arr[2]].draggable = true;
    game[arr[3]].draggable = true;
    return;
}


let gameCells = document.querySelectorAll(".game__cell");
let gameSection = document.querySelectorAll(".game")[0].childNodes;
let draggableElement = 0;
let draggableElementIndex;
let allowDrop;
let countingMoves = 0;
let interval = setInterval(stopWatch, 1000);
let seconds = 0;
let minutes = 0;
let start;

function dragStart(e, elem){
    draggableElementIndex = [...gameSection].findIndex((a) => a == elem);
    draggableElement = elem;
    setTimeout(() => {
        e.target.classList.add('hide');
    }, 0);
}

function dragEnd(e){
    e.target.classList.remove('hide');
}

function dragOverChecking(){
    allowDrop = true;
    event.preventDefault();
}
function dragLeaving(){
    allowDrop = false;
} 

function drop(e, elem) {
    if(allowDrop){
        elem.className = draggableElement.className;
        elem.innerHTML = draggableElement.innerHTML;
        elem.draggable = true;
        elem.classList.remove('hide');
        elem.removeEventListener("dragover", dragOverChecking);
        elem.removeEventListener("dragleave", dragLeaving);
        gameSection[draggableElementIndex].className = 'zero__cell';
        gameSection[draggableElementIndex].innerHTML = 0;
        gameSection[draggableElementIndex].draggable = false;
        allowDrop = false;
        setDraging();
        countingMoves++;
        movesTxt.innerHTML = `Moves: ${countingMoves}`;
        checkingGameSolve();
    }   
}

function slideToEmpty(event){
    let arr = [...event.target.parentNode.childNodes];
    let elemIndex = arr.findIndex((elem) => elem.innerHTML === event.target.innerHTML);
    let elem = arr[elemIndex];
    gameSection[zeroIndex].className = elem.className;
    gameSection[zeroIndex].innerHTML = elem.innerHTML;
    gameSection[zeroIndex].draggable = true;
    gameSection[zeroIndex].removeEventListener("dragover", dragOverChecking);
    gameSection[zeroIndex].removeEventListener("dragleave", dragLeaving);

    gameSection[elemIndex].className = 'zero__cell';
    gameSection[elemIndex].innerHTML = 0;
    gameSection[elemIndex].draggable = false;
    setDraging();
    countingMoves++;
    movesTxt.innerHTML = `Moves: ${countingMoves}`;
    checkingGameSolve();
}

function addEventsToGameCell(){
    gameCells = document.querySelectorAll(".game__cell");
    gameSection = document.querySelectorAll(".game")[0].childNodes;
    gameCells.forEach((elem) => {
        elem.addEventListener("dragstart", (event) => dragStart(event, elem));
        elem.addEventListener("dragend", (event) => dragEnd(event));
    });
    
    zeroCell = document.querySelectorAll(".zero__cell");
    zeroCell.forEach((elem) => {
        elem.addEventListener("dragover", dragOverChecking);
        elem.addEventListener("dragleave", dragLeaving);
        elem.addEventListener("drop", (event) => drop(event, elem));
    })
}

function stopWatch(){
    seconds++
    if(seconds < 10){
        seconds = "0" + seconds;
    }
    if(seconds == 60){
        seconds = 0 + "0";
        minutes++;
    }
    if(minutes < 10){
        stopwatch.innerHTML = `0${minutes}:${seconds}`;
    } else {
        stopwatch.innerHTML = `${minutes}:${seconds}`;
    }
}

let windowChecking = (function(){
    let valid = false;
    return function(){
        if(!valid && window.innerWidth < 409){
            valid = true;
            changingButtonSize(9);
        }
    }
})

function CheckSolved(){
    let size = game.children.length;
    let gameArr = Array.from(game.children);
    gameArr.sort((a,b) => a.innerText - b.innerText);
    let zero = gameArr.shift();
    gameArr.push(zero);
    game.replaceChildren(...gameArr);
    checkingGameSolve()
}

function checkingGameSolve(){
    let solved = false;
    let arr = [...gameSection];
    if(+gameSection[0].innerText === 1 && +gameSection[gameSection.length - 1].innerText === 0){
        arr.pop();
        arr.forEach((elem, index) => {
            if(+elem.innerText == (index + 1)){
                solved = true;
            } else {
                solved = false;
            }
        });
    }
    if(solved){
        solvedSection.offsetTop = gameSection[0].offsetTop;
        game.innerHTML = '';
        game.append(solvedSection)
        solvedSection.style.visibility = "visible";
        solvedSection.innerHTML = `Hooray! You solved the puzzle in ${stopwatch.innerHTML} and ${movesTxt.innerText.replace(/[^0-9]/g, '')} moves!`;
        clearInterval(interval);
    }
}

function saveGame(){
    let savedGame = game.innerHTML;
    let gameKey = 'game';
    let gameSize = game.childNodes.length;
    let sizeKey = 'size';
    let movesStorage = movesTxt.innerHTML;
    let movesKey = 'moves';
    let frameSizeStorage = frameSize.innerHTML;
    let frameSizeKey = 'frame';
    if(localStorage.getItem(gameKey) === null){
        localStorage.setItem(gameKey, savedGame);
        localStorage.setItem(movesKey, movesStorage);
        localStorage.setItem(frameSizeKey, frameSizeStorage);
        localStorage.setItem(sizeKey, gameSize);
    }
    setDraging()
    console.log(movesTime.innerHTML)
}

function uploadGame(){
    if(localStorage.getItem('game') != null){
        game.style = '';
        game.innerHTML = '';
        movesTxt.innerHTML = '';
        frameSize.innerHTML = '';
        root.style.setProperty('--width', `${Math.sqrt(localStorage.getItem('size')) * 100}px`);
        root.style.setProperty('--height', `${Math.sqrt(localStorage.getItem('size')) * 100}px`);
        document.getElementsByClassName('game')[0].style.gridTemplateColumns = `repeat(${Math.sqrt(localStorage.getItem('size'))}, 1fr)`;
        game.innerHTML = localStorage.getItem('game');
        movesTxt.innerHTML = localStorage.getItem('moves');
        frameSize.innerHTML = localStorage.getItem('frame');
        localStorage.clear();
    }
}

document.getElementById('9').addEventListener ("click", () => changingButtonSize(9));
document.getElementById('16').addEventListener ("click", () => changingButtonSize(16));
document.getElementById('25').addEventListener ("click", () => changingButtonSize(25));
document.getElementById('36').addEventListener ("click", () => changingButtonSize(36));
document.getElementById('49').addEventListener ("click", () => changingButtonSize(49));
document.getElementById('64').addEventListener ("click", () => changingButtonSize(64));
document.getElementById('shuffle').addEventListener ("click", () => changingButtonSize(game.childNodes.length));
document.getElementById('shuffle').addEventListener ("click", () => {
    clearInterval(interval);
    minutes = 0;
    seconds = 0;
    interval = setInterval(stopWatch, 1000);
    solvedSection.style.visibility = "hidden";
});
document.querySelector(".load__button").addEventListener("click", uploadGame);
document.getElementById('save').addEventListener ("click", saveGame);
document.getElementById('solve').addEventListener ("click", CheckSolved);
window.onresize = windowChecking();

setDraging();







