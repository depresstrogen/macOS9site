// Make the DIV element draggable:
dragElement(document.querySelector(".window"));

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

function makeWindow(height, width) {
    let windowDiv = document.createElement("div");
    windowDiv.className = "window";
    windowDiv.id = windows.length;
    windowDiv.style.height = height + "px";
    windowDiv.style.width = width + "px";

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

}

makeWindow(300, 500);