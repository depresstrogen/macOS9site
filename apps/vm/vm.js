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