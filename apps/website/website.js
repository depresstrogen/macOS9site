function websiteRun() {
    let height = innerHeight - 100;
    let width = innerWidth - 150;
    let websiteWindow = makeWindow(10, 30, height, width, "Welcome to Emma's Website");
    let tempDiv = document.createElement("div");
    
    tempDiv.innerHTML = '<object type="text/html" data="./apps/website/index.html" height = "' + height + '" width = "' + width + '"></object>';
    tempDiv.style.height = height - 22 + "px";
    tempDiv.style.width = width + "px";
    websiteWindow.appendChild(tempDiv);
}