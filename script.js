const fontClassList = ["playfair-display", "unifrakturmaguntia-regular", "audiowide-regular", "libre-barcode-39-text-regular", "micro-5-regular", "helvetica"];
const backgroundColours = ["#983b3b", "#227228", "#722246", "#b06809", "#ff06c1", "#272477", "black"];

const fife = document.getElementById("objects_container");
const root = document.getElementById("root");
const imgContainer = document.getElementById("img_container");
const corruption = document.getElementById("corruption");
const allText = document.querySelectorAll("p, h1, h2, h3");
let yPos = 0;
let doom = true;
let beat = 1;

const corruptX = corruption.getContext("2d");
corruptX.drawImage(imgContainer.lastElementChild, 0, 0);
const imgData = corruptX.getImageData(0, 0, corruption.width, corruption.height);
const imgDataLen = imgData.data.length;


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
    if (beat > 4) {beat = 1}
    //console.log(beat);
    
    if (beat === 1) newRandFont();
    if (beat === 2) corrupt();
    if (beat === 3) newRandFont();
    if (beat === 4) newRandBgColour();
}, 600); 


function corrupt() {
    let startPoint = Math.floor(Math.random() * imgDataLen);
    //if (Math.random > 0.03) {
    //    startPoint = Math.floor(Math.random() * imgDataLen);
    //}
    const endPoint = Math.floor(Math.random() * imgDataLen) + startPoint;
    const colourDestroyMode = Math.floor(Math.random() * 30) + 4;
    
    for (
    let i = startPoint;                 // start at random place
    i < endPoint;                       // end at random point between start
    i += colourDestroyMode
    ) {
        imgData.data[i] = 255 - imgData.data[i];
        imgData.data[i+1] = 255 - imgData.data[i+1];
        imgData.data[i+2] = 255 - imgData.data[i+2];
        imgData.data[i+3] = 255;
        }
    corruptX.putImageData(imgData, 0, 0);    
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