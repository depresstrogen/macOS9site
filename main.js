let windows = [];
let globalWidth = 0;
let rCorner = document.body.querySelector(".right-corner");
let cornerRect = rCorner.getBoundingClientRect();
globalWidth = cornerRect.left;

function dragElement(elmnt) {
    let titleBar = elmnt.querySelector(".windowheader");
    var active = false;
    var currentX;
    var currentY;
    var initialX;
    var initialY;
    var xOffset = 0;
    var yOffset = 0;

    let xChange = 0;
    let yChange = 0;

    titleBar.addEventListener("touchstart", dragStart, false);
    titleBar.addEventListener("touchend", dragEnd, false);
    titleBar.addEventListener("touchmove", drag, false);

    titleBar.addEventListener("mousedown", dragStart, false);
    titleBar.addEventListener("mouseup", dragEnd, false);
    titleBar.addEventListener("mousemove", drag, false);

    function dragStart(e) {
        if (e.type === "touchstart") {
            initialX = e.touches[0].clientX - xOffset;
            initialY = e.touches[0].clientY - yOffset;
        } else {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
        }

        if (e.target === titleBar) {
            elmnt.remove();
            document.body.appendChild(elmnt);
            active = true;
            let winX = String(elmnt.style.left);
            let winY = String(elmnt.style.top);
            winX = Number(winX.substring(0, winX.length - 2));
            winY = Number(winY.substring(0, winY.length - 2));
            let xOff = initialX - winX;
            let yOff = initialY - winY;

            // console.log(e.clientX + " " + xOff + " " + (e.clientX - xOff));
            // console.log(e.clientY + " " + yOff);

        }
    }

    function dragEnd(e) {
        active = false;
        let winX = String(elmnt.style.left);
        let winY = String(elmnt.style.top);

        winX = Number(winX.substring(0, winX.length - 2));
        winY = Number(winY.substring(0, winY.length - 2));

        winX += xChange;
        winY += yChange;

        elmnt.style.left = winX + "px";
        elmnt.style.top = winY + "px";

        console.log(winX + "px");
        elmnt.style.transform = "translate3d(" + 0 + "px, " + 0 + "px, 0)";

        xChange = 0;
        yChange = 0;

        xOffset = 0;
        yOffset = 0;

    }

    function drag(e) {
        if (active) {

            e.preventDefault();

            if (e.type === "touchmove") {
                currentX = e.touches[0].clientX - initialX;
                currentY = e.touches[0].clientY - initialY;
            } else {
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
            }
            let winX = String(elmnt.style.left);
            let winY = String(elmnt.style.top);

            winX = Number(winX.substring(0, winX.length - 2));
            winY = Number(winY.substring(0, winY.length - 2));
            let xOff = 0;
            let yOff = 0;
            if (e.type === "touchmove") {
                xOff = e.touches[0].clientX - winX;
                yOff = e.touches[0].clientY - winY;

            } else {
                xOff = e.clientX - winX;
                yOff = e.clientY - winY;
            }

            // console.log(e.clientX + " " + xOff + " " + (e.clientX - xOff));
            // console.log(e.clientY + " " + yOff);

            xOffset = currentX;
            yOffset = currentY;

            xChange = xOff - initialX + winX;
            yChange = yOff - initialY + winY;

            // console.log(e.clientX - winX);
            // console.log(xChange + "," + yChange);
            // console.log("a" + currentX + " " + currentY)
            setTranslate(xChange, yChange, elmnt);
        }
        OOB();
    }

    function setTranslate(xPos, yPos, el) {
        el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
    }
}

function makeWindow(x, y, height, width) {
    let rCorner = document.body.querySelector(".right-corner");
    var rect = rCorner.getBoundingClientRect();

    winWidth = String(rect.left + 9);
    globalWidth = winWidth;
    if (globalWidth < width + x) {
        x = 0;
        if (globalWidth < width + x) {
            width = globalWidth - 5;

        }
    }

    let windowDiv = document.createElement("div");
    windowDiv.className = "window";
    windowDiv.id = windows.length;
    windowDiv.style.height = height + "px";
    windowDiv.style.width = width + "px";
    windowDiv.style.top = y + "px";
    windowDiv.style.left = x + "px";

    let windowTitle = document.createElement("div");
    windowTitle.className = "windowheader";
    windowDiv.appendChild(windowTitle);
    let closeButton = document.createElement("img");
    closeButton.className = "closeButton";
    closeButton.src = "close.png";
    windowTitle.appendChild(closeButton);

    let minButton = document.createElement("img");
    minButton.className = "minButton";
    minButton.src = "minimize.png";
    windowTitle.appendChild(minButton);

    dragElement(windowDiv);
    document.body.appendChild(windowDiv);

    windows.push(windowDiv);
    return windowDiv;
}

function penith() {
    let penithWindow = makeWindow(400, 400, 250, 400);
    let penithHeader = penithWindow.querySelector(".windowheight")
    let frame = document.createElement("iframe");
    frame.src = "dummywebsite.html";
    frame.height = "225px";
    frame.width = "396px"
    penithWindow.appendChild(frame);

}

function lobster() {
    let lobsterWindow = makeWindow(10, 30, 342, 320);

    let lob = document.createElement("img");
    lob.src = "lobster.gif";
    lobsterWindow.appendChild(lob);
}

async function OOB() {
    for (let i = 0; i < windows.length; i++) {
        // Get Current Window
        let curWin = windows[i];

        // Width and height of whole window

        // Only works on desktop
        let winWidth = String(window.innerWidth);


        // Works For Mobile
        let rCorner = document.body.querySelector(".right-corner");
        var rect = rCorner.getBoundingClientRect();

        winWidth = String(rect.left + 9);
        globalWidth = winWidth;
        let time = new Date();
        // console.log(winWidth + time.getTime());
        let winHeight = String(window.innerHeight);

        // X and Width
        let curWinX = String(curWin.style.left);
        curWinX = Number(curWinX.substring(0, curWinX.length - 2));
        let curWinWidth = String(curWin.style.width);
        curWinWidth = Number(curWinWidth.substring(0, curWinWidth.length - 2));



        // Y and Height
        let curWinY = String(curWin.style.top);
        curWinY = Number(curWinY.substring(0, curWinY.length - 2));
        let curWinHeight = String(curWin.style.height);
        curWinHeight = Number(curWinHeight.substring(0, curWinHeight.length - 2));

        //Transform so it works when moving
        let transX = 0;
        let transY = 0;
        let digitRegex = /(\d|\-)+/g;
        if (curWin.style.transform == "") {
            // no translate, skip
        } else {
            transText = String(curWin.style.transform);
            transText = String(transText.match(digitRegex));
            transText = transText.slice(2);
            transText = transText.split(/,/)
            transX = Number(transText[0]);
            transY = Number(transText[1]);
            console.log(transX + " " + transY);
        }


        console.log(" ss " + curWinWidth + curWinX);
        if (curWinWidth + curWinX > winWidth) {
            curWin.style.left = (window.innerWidth - curWinWidth) + "px";
        }

        if (curWinX < 0) {
            curWin.style.left = 0 + "px";
        }

        if (curWinHeight + curWinY > winHeight) {
            curWin.style.top = (window.innerHeight - curWinHeight) + "px";
        }

        if (curWinY < 22) {
            curWin.style.top = 22 + "px";
        }

        // console.log(window.innerWidth);
        // console.log(curWinWidth + curWinX)
        // console.log();
    }
}

window.addEventListener('resize', function(event) {
    OOB();
}, true);

makeWindow(5, 200, 300, globalWidth - 10);

penith();
lobster();
OOB();

setInterval(function() {
    OOB();
}, 100);


oobCheck();
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    //mobile
}