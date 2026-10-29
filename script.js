const fontClassList = ["playfair-display", "unifrakturmaguntia-regular", "audiowide-regular", "libre-barcode-39-text-regular", "micro-5-regular", "helvetica"];
const backgroundColours = ["#983b3b", "#227228", "#722246", "#b06809", "#ff06c1", "#272477", "black"];

const fife = document.getElementById("objects_container");
const root = document.getElementById("root");
const imgContainer = document.getElementById("img_container");
const corruption = document.getElementById("corruption");
const allText = document.querySelectorAll("p, h1, h2, h3");
let yPos = 0;
let doom = true;
let beat = 0;
let bar = 1;

const corruptX = corruption.getContext("2d");
let imgData;
let imgDataLen;
imgContainer.lastElementChild.onload = function() {
    corruptX.drawImage(imgContainer.lastElementChild, 0, 0, corruption.width, corruption.height);
    imgData = corruptX.getImageData(0, 0, corruption.width, corruption.height);
    imgDataLen = imgData.data.length;
}

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

// beat
setInterval(function () {
    beat++;
    if (beat > 4) {
        bar++;
        beat = 1;
    }
    if (bar > 4) {bar = 1}
    //console.log(beat);
    
    if (beat === 1) newRandFont();
    if (beat === 4) newRandBgColour();

    if (bar === 1); // new image
}, 600); 

kill();

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

function kill() {
    setInterval(colourCorrupt, 90); 
    setInterval(rectCorrupt, 300); 
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