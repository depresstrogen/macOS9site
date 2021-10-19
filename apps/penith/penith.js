function penithRun() {
    let penithWindow = makeWindow(400, 400, 250, 400, "I Thlammed My Penith In A Car Door");
    let penithDiv = document.createElement("div");
    penithDiv.innerHTML = `<p>penis</p>

    <img src= "apps/penith/penith.png" width="200px"/>`
    penithWindow.appendChild(penithDiv);
    penithWindow.appendChild(frame);

}