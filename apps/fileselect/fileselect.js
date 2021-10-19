function fileSelect(fileArray, win, vid) {
    for (let i = 0; i < fileArray.length; i++) {
        let button = document.createElement("button");
        button.innerHTML = fileArray[i];
        button.className = "fileselectbutton";
        win.appendChild(button);
        button.addEventListener("click", () => {
            vid.src = fileArray[i];
            console.log(" AAA" + vid.videoHeight);
            win.remove();
        })
    }
}