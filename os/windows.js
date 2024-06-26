//Allows windows to be interacted with
function dragElement(elmnt) {

    let closeButton = elmnt.querySelector(".window__titlebar__close-button");
    closeButton.addEventListener("mouseup", () => {
        elmnt.remove();
    })

    closeButton.addEventListener("touchend", () => {
        elmnt.remove();
    })

    // The title bar to add listeners to
    let titleBar = elmnt.querySelector(".window__titlebar");

    // Allows drag() to only run if active
    let active = false;
    let activeElem = null;

    // Variables to keep between instances of drag();
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    let xChange = 0;
    let yChange = 0;

    // Listeners for desktop
    titleBar.addEventListener("mousedown", dragStart, false);
    document.addEventListener("mouseup", dragEnd, false);
    document.addEventListener("mousemove", drag, false);

    // Duplicate listeners for touch screens
    titleBar.addEventListener("touchstart", dragStart, { passive: false });
    document.addEventListener("touchend", dragEnd, { passive: false });
    document.addEventListener("touchmove", drag, { passive: false });

    // On click of something
    function dragStart(e) {
        e.preventDefault();
        // If touch screen use the first touch
        if (e.type === "touchstart") {
            initialX = e.touches[0].clientX - xOffset;
            initialY = e.touches[0].clientY - yOffset;
            // Else just get mouse coords
        } else {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
        }


        // Remove and append to bring window to front
        //elmnt.remove();
        //document.body.appendChild(elmnt);
        // Set to be active
        active = true;

        // console.log(e.clientX + " " + xOff + " " + (e.clientX - xOff));
        // console.log(e.clientY + " " + yOff);


    }

    // On mouse up
    function dragEnd(e) {
        // No Longer Active
        active = false;

        // Get previous x and y
        let winX = String(elmnt.style.left);
        let winY = String(elmnt.style.top);

        // Parse out "px"
        winX = Number(winX.substring(0, winX.length - 2));
        winY = Number(winY.substring(0, winY.length - 2));

        // Add the overall change to the previous x and y
        winX += xChange;
        winY += yChange;

        // Apply to left and top vars
        elmnt.style.left = winX + "px";
        elmnt.style.top = winY + "px";

        // Remove transform
        elmnt.style.transform = "translate3d(" + 0 + "px, " + 0 + "px, 0)";

        // Reset change
        xChange = 0;
        yChange = 0;

    }

    //Every time the mouse is moved
    function drag(e) {
        e.preventDefault();
        // Make sure it is active
        if (active) {

            // Prevent weird browser shit
            e.preventDefault();

            // If touch screen get first touch
            if (e.type === "touchmove") {
                currentX = e.touches[0].clientX - initialX;
                currentY = e.touches[0].clientY - initialY;
                // If not just use mouse
            } else {
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
            }

            // Get old
            let winX = String(elmnt.style.left);
            let winY = String(elmnt.style.top);

            winX = Number(winX.substring(0, winX.length - 2));
            winY = Number(winY.substring(0, winY.length - 2));
            let xOff = 0;
            let yOff = 0;

            // Set offsets
            if (e.type === "touchmove") {
                xOff = e.touches[0].clientX - winX;
                yOff = e.touches[0].clientY - winY;

            } else {
                xOff = e.clientX - winX;
                yOff = e.clientY - winY;
            }

            // Get the amount moved from the corner of the starting window
            xChange = xOff - initialX + winX;
            yChange = yOff - initialY + winY;

            // Translate that
            setTranslate(xChange, yChange, elmnt);
        }
        // Make sure its not OOB
    }

    // Translates div
    function setTranslate(xPos, yPos, elmnt) {
        // Takes positions and translates it into div
        elmnt.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
    }
}


function makeWindow(x, y, height, width, name) {
    // Gets the right corner for mobile friendly OOB checking
    let rCorner = document.body.querySelector(".menubar__right-corner");
    let rect = rCorner.getBoundingClientRect();

    // Sets width to that corner
    winWidth = String(rect.left + 9);
    globalWidth = winWidth;

    // If the window goes past the screen border
    if (globalWidth < width + x) {
        // Snap to left
        x = 0;
        // If it is still over
        if (globalWidth < width + x) {
            //Shrink to fit
            width = globalWidth - 5;

        }
    }

    // Base window div
    let windowDiv = document.createElement("div");
    windowDiv.className = "window";
    // Makes the id
    windowDiv.id = windows.length;
    // Defines geometry of window
    windowDiv.style.height = height + "px";
    windowDiv.style.width = width + "px";
    windowDiv.style.top = y + "px";
    windowDiv.style.left = x + "px";

    windowDiv.dataset.name = name;
    // Creates title bar
    let windowTitle = document.createElement("div");
    windowTitle.className = "window__titlebar";
    windowDiv.appendChild(windowTitle);

    // Makes the decorative lines
    for (let i = 0; i < 12; i++) {
        // Distance from top of bar
        let yOffset = 4
            // White lines first
        if (i % 2 == 0) {
            let whiteLine = document.createElement("div");
            whiteLine.className = "window__titlebar__line--white";
            whiteLine.style.top = (i + yOffset) + "px";
            windowTitle.appendChild(whiteLine);
        } else {
            let greyLine = document.createElement("div");
            greyLine.className = "window__titlebar__line--grey";
            greyLine.style.top = (i + yOffset) + "px";
            windowTitle.appendChild(greyLine);
        }
    }

    // Defines buttons, and the images.
    // All positioning is done in the css file
    let closeButton = document.createElement("img");
    closeButton.className = "window__titlebar__close-button";
    closeButton.src = "img/os/close.png";
    windowTitle.appendChild(closeButton);

    let minButton = document.createElement("img");
    minButton.className = "window__titlebar__min-button";
    minButton.src = "img/os/minimize.png";
    windowTitle.appendChild(minButton);

    let maxButton = document.createElement("img");
    maxButton.className = "window__titlebar__max-button";
    maxButton.src = "img/os/maximize.png";
    windowTitle.appendChild(maxButton);

    let nameTag = document.createElement("div");
    nameTag.className = "window__title-bar__windowName";
    nameTag.innerHTML = name;
    windowTitle.appendChild(nameTag);

    // Allows window to be dragged
    dragElement(windowDiv);

    // Add to body
    document.body.appendChild(windowDiv);

    // Add to window array
    windows.push(windowDiv);

    OOB("winStart");
    //Return if a function called it
    return windowDiv;
}

async function OOB(condition) {
    for (let i = 0; i < windows.length; i++) {
        // Get Current Window
        let curWin = windows[i];

        // Width and height of whole window
        // Only works on desktop
        let winWidth = String(window.innerWidth);
        // Works For Mobile
        let rCorner = document.body.querySelector(".menubar__right-corner");
        let rect = rCorner.getBoundingClientRect();
        winWidth = String(rect.left + 9);
        globalWidth = winWidth;
        // Height is universal
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
        // Parse digits
        let digitRegex = /(\d|\-)+/g;
        if (curWin.style.transform == "") {
            // no translate, skip
        } else {
            //Gets X and Y from translate (not used yet)
            transText = String(curWin.style.transform);
            transText = String(transText.match(digitRegex));
            transText = transText.slice(2);
            transText = transText.split(/,/)
            transX = Number(transText[0]);
            transY = Number(transText[1]);
        }

        // Check for collision with edges of screen

        if (curWinWidth + curWinX > winWidth) curWin.style.left = (window.innerWidth - curWinWidth) + "px";
        if (curWinX < 0) curWin.style.left = 0 + "px";
        if (curWinHeight + curWinY > winHeight) curWin.style.top = (window.innerHeight - curWinHeight) + "px";
        if (curWinY < 22) curWin.style.top = 22 + "px";

        if (condition = "winStart") {
            let outX = false;
            let outY = false;
            if (curWinWidth + curWinX > winWidth) outX = true;
            if (curWinX < 0) outX = true;
            if (curWinHeight + curWinY > winHeight) outY = true;
            if (curWinY < 22) outY = true;
        }

    }
}