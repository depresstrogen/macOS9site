window.icons = icons;

// Window Array
let windows = [];

document.body.addEventListener("click", () => {})

// Applies global width using the right corner element so it works on mobile too
let globalWidth = 0;
let rCorner = document.body.querySelector(".menubar__right-corner");
let cornerRect = rCorner.getBoundingClientRect();
globalWidth = cornerRect.left;

//Clusterfuck of a regex i stole from stack overflow
function updateTime() {
    let time = new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
    let timeContainer = document.body.querySelector(".menubar__time");
    timeContainer.innerHTML = time;
}

setInterval(function() {
    updateTime();
}, 100);

// Check for OOB when resizing
window.addEventListener('resize', function(event) {
    OOB();
}, true);

function icons(icon) {
    if (icon == "website") websiteRun();
    if (icon == "lobster") lobsterRun();
    if (icon == "VM") VM()    
    if (icon == "Appearance") appearance();
    if (icon == "GameLife") gameOfLife();
    if (icon == "quicktime") quicktime();
}

OOB();

websiteRun();
//calc();
// Check for OOB 10 times a second