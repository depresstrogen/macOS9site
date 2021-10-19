function runCalc(window) {
    let maxButton = window.querySelector(".window__titlebar__max-button");
    maxButton.remove();
    let minButton = window.querySelector(".window__titlebar__min-button");
    minButton.remove();

    let buttons = ["C", "E", "=", "*", 7, 8, 9, "/", 4, 5, 6, "-", 1, 2, 3, "+", 0, "."];
    let buttonHeight = 16;
    let buttonWidth = 18;
    let buttonDiv = document.createElement("div");
    buttonDiv.className = "calc__button__div"
    window.appendChild(buttonDiv);
    for (let i = 0; i < buttons.length; i++) {
        let button = document.createElement("button");
        button.className = "calc__button";
        button.innerHTML = buttons[i];
        buttonDiv.appendChild(button);
    }

}

function calc() {
    let calcWindow = makeWindow(400, 400, 169, 106, "Calculator");
    let calcDiv = document.createElement("div");
    calcWindow.appendChild(calcDiv);
    runCalc(calcWindow);
}