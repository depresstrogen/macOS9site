function lobsterRun() {
    let lobsterWindow = makeWindow(10, 30, 342, 320, "lobster.gif");
    let lob = document.createElement("img");
    lob.src = "apps/lobster/lobster.gif";
    lobsterWindow.appendChild(lob);
}