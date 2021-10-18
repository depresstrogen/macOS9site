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

// Check for OOB when resizing
window.addEventListener('resize', function(event) {
    OOB();
}, true);


function penith() {
    let penithWindow = makeWindow(400, 400, 250, 400, "I Thlammed My Penith In A Car Door");
    let penithDiv = document.createElement("div");
    penithDiv.innerHTML = `<p>penis</p>

    <img src= "apps/penith.png" width="200px"/>`
    penithWindow.appendChild(penithDiv);
    penithWindow.appendChild(frame);

}

function lobster() {
    let lobsterWindow = makeWindow(10, 30, 342, 320, "lobster.gif");
    let lob = document.createElement("img");
    lob.src = "lobster.gif";
    lobsterWindow.appendChild(lob);
}

function VM() {
    let height = 600;
    let width = 800;

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        height = 600;
        width = 400;
    }

    let VMWindow = makeWindow(400, 400, height, width, "Virtual Mac");
    height = VMWindow.style.height;
    height = height.substring(0, height.length - 2);
    width = VMWindow.style.width;
    width = width.substring(0, width.length - 2);

    let VMHeader = VMWindow.querySelector(".windowheight")
    let frame = document.createElement("iframe");
    frame.src = "index.html";
    frame.height = (height - 25) + "px";
    frame.width = (width - 4) + "px"
    VMWindow.appendChild(frame);

}

function calc() {
    let calcWindow = makeWindow(400, 400, 169, 106, "Calculator");
    let calcDiv = document.createElement("div");
    calcWindow.appendChild(calcDiv);
    runCalc(calcWindow);
}


function icons(icon) {
    if (icon == "blank") makeWindow(100, 100, 300, 400, "Blank Window");
    if (icon == "lobster") lobster();
    if (icon == "penith") penith();
    if (icon == "VM") VM();
    if (icon == "Appearance") appearance();
    if (icon == "GameLife") gameOfLife();
    if (icon == "quicktime") quicktime();
}

OOB();
calc();
// Check for OOB 10 times a second
setInterval(function() {
    updateTime();
}, 100);