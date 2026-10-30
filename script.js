const fontClassList = ["playfair-display", "unifrakturmaguntia-regular", "audiowide-regular", "libre-barcode-39-text-regular", "micro-5-regular", "helvetica"];
const backgroundColours = ["#983b3b", "#227228", "#722246", "#b06809", "#ff06c1", "#272477", "black"];

const fife = document.getElementById("objects_container");
const root = document.getElementById("root");
const imgContainer = document.getElementById("img_container");
const corruption = document.getElementById("corruption");
const allText = document.querySelectorAll("p, h1, h2, h3");
let yPos = 0;
let doom = true;

const corruptX = corruption.getContext("2d");
let imgData;
let imgDataLen;
imgContainer.lastElementChild.onload = newImage;

// Move down a pixel every 30 ms
setInterval(function () {
    if (doom) {
        yPos--;
        fife.style.translate = "0 " + yPos + "px";
    }
}, 30); 

// create ToS forever
setInterval(function () {
    if ((Math.abs(yPos)) > (fife.clientHeight - (window.innerHeight * 3))) {
        console.log("loop");
        const again = root.cloneNode(true);
        fife.appendChild(again);
    }
}, 3000); 

let beat = 1;
let bar = 1;
let bpm = 120;
// BEAT
setInterval(function () {
        
    switch (beat) {     
        case 1:
            break;
        case 2:
            newRandFont();
            break;
        case 3:
            killCommence()
            break;
        case 4:
            killCease();
            newRandBgColour()
            break;
        default:
            //killCease();
            colourCorrupt();
            bar++;
            beat = 1;
    }

    switch (bar) {     
        case 1:
            break; 
        case 2:
            break;
        case 3:
            if (beat === 1) newImage();
            break;
        case 4:
            //if (beat == 4) killCommence();
            break;
        default:
            if (beat === 1) newImage();
            bar = 1;
    }

    rectCorrupt();
    colourCorrupt();
    console.log(beat, bar);
    beat++;
}, (60000 / bpm)); 

function newImage() {
    imgArray = imgContainer.children;
    const r = Math.floor(Math.random() * imgArray.length);
    corruptX.drawImage(imgArray[r], 0, 0, corruption.width, corruption.height);
    imgData = corruptX.getImageData(0, 0, corruption.width, corruption.height);
    imgDataLen = imgData.data.length;
}

function colourCorrupt() {
    const startPoint = Math.floor(Math.random() * imgDataLen) - (imgDataLen / 3);
    const endPoint = Math.floor(Math.random() * imgDataLen) + startPoint;   // random end point
    const colourDestroyMode = Math.floor(Math.random() * 30) + 4;           // random pattern of how colour is reversed
    //console.log(startPoint);
    for (
    let i = startPoint;                                                     // start at random place
    i < endPoint;                                                           // end at random point between start
    i += colourDestroyMode
    ) {
        imgData.data[i] = 255 - imgData.data[i];
        imgData.data[i+1] = 255 - imgData.data[i+1];
        imgData.data[i+2] = 255 - imgData.data[i+2];
        imgData.data[i+3] = 255;
        }
    corruptX.putImageData(imgData, 0, 0);    
}
function rectCorrupt() {
    const diameter = corruption.width;
    const x = (Math.random() * diameter) - (diameter / 3);
    const y = (Math.random() * diameter) - (diameter / 3);
    const w = Math.random() * (diameter / 1.5);
    const h = Math.random() * (diameter / 1.5);
    corruptX.fillStyle = "white";
    if (Math.random() > 0.7) {                                              // 0.3 chance of random colour
        corruptX.fillStyle = backgroundColours[Math.floor(Math.random() * backgroundColours.length)];
    }
    corruptX.fillRect(x, y, w, h);
    imgData = corruptX.getImageData(0, 0, corruption.width, corruption.height);
    corruptX.putImageData(imgData, 0, 0);  
    //console.log(x, y, w, h);
}

let colourCorruptInterval;
let rectCorruptInterval;
function killCommence() {
    colourCorruptInterval = setInterval(colourCorrupt, 30); 
    //rectCorruptInterval = setInterval(rectCorrupt, 180); 
}
function killCease() {
    clearInterval(colourCorruptInterval);
    //clearInterval(rectCorruptInterval);
}

let oldFont = 0;
function newRandFont() {
        let newFont = Math.floor(Math.random() * fontClassList.length);
        while (newFont === oldFont) {newFont = Math.floor(Math.random() * fontClassList.length)}                // prevents repeat
        oldFont = newFont;
        fife.setAttribute("class", fontClassList[newFont]);
        //console.log(fontClassList[newFont]);
}

let oldColour = 0;
function newRandBgColour() {
    let newColour = Math.floor(Math.random() * backgroundColours.length);
    while (newColour === oldColour) {newColour = Math.floor(Math.random() * backgroundColours.length)}          // prevents repeat
    oldColour = newColour;
    document.body.style.background = backgroundColours[newColour];
}