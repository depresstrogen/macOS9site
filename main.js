

let windows = [];

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (elmnt.querySelector(".windowheader")) {
        // if present, the header is where you move the DIV from:
        elmnt.querySelector(".windowheader").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;

        elmnt.remove();
        document.body.appendChild(elmnt);
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function makeWindow(x, y, height, width) {
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
    let penithWindow = makeWindow(400,400,250, 400);
    let penithHeader = penithWindow.querySelector(".windowheight")
    let frame = document.createElement("iframe");
    frame.src = "dummywebsite.html";
    frame.height = "225px";
    frame.width = "396px"
    penithWindow.appendChild(frame);

}

function lobster() {
    let lobsterWindow = makeWindow(10,10,342, 320);

    let lob = document.createElement("img");
    lob.src = "lobster.gif";
    lobsterWindow.appendChild(lob);
}

makeWindow(600,200,300, 500);

penith();
lobster();