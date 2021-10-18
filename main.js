window.icons = icons;

// Window Array
let windows = [];

document.body.addEventListener("click", () => {
    console.log("AAAAA");
})

// Applies global width using the right corner element so it works on mobile too
let globalWidth = 0;
let rCorner = document.body.querySelector(".right-corner");
let cornerRect = rCorner.getBoundingClientRect();
globalWidth = cornerRect.left;


// Makes an empty window


function updateTime() {
    let time = new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
    let timeContainer = document.body.querySelector(".time");
    timeContainer.innerHTML = time;

}

// Check for OOB when resizing
window.addEventListener('resize', function(event) {
    OOB();
}, true);

function penith() {
    let penithWindow = makeWindow(400, 400, 250, 400, "I Thlammed My Penith In A Car Door");
    let penithDiv = document.createElement("div");
    penithDiv.innerHTML = `<p>penis</p>

    <img src= "apps/penith.png" width="200px"/>`
    penithWindow.appendChild(penithDiv);
    penithWindow.appendChild(frame);

}

function lobster() {
    let lobsterWindow = makeWindow(10, 30, 342, 320, "lobster.gif");
    let lob = document.createElement("img");
    lob.src = "lobster.gif";
    lobsterWindow.appendChild(lob);
}

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

function appearance() {
    let height = 336;
    let width = 475;
    let appWindow = makeWindow(50, 50, height, width, "Appearance");
    let selectDiv = document.createElement("div");
    appWindow.appendChild(selectDiv);
    selectDiv.innerHTML = `
    <form>
        <iframe class="wallpaper-preview" height="142" width="190" frameBorder="0" style="background-image:url(wallpapers/MacOSDefault.png)"></iframe>
        <select class="wallselect" name="wallpapers" id="wallselect" size="8" onchange="previewWallpaper()">
            <option value="">Mac OS Default</option>
            <option value="">Lollipop</option>
            <option value="">Lollipop 2</option>
            <option value="">Lollipop 3</option>
            <option value="">Lollipop 4</option>
            <option value="">Lollipop 5</option>
            <option value="">Lollipop 6</option>
            <option value="">Strawberry</option>
        </select><input class="wallapply" type="button" value="Set Desktop" onclick="changeWallpaper()"/>
    </form>
    `
}

function icons(icon) {
    if (icon == "blank") makeWindow(100, 100, 300, 400, "Blank Window");
    if (icon == "lobster") lobster();
    if (icon == "penith") penith();
    if (icon == "VM") VM();
    if (icon == "Appearance") appearance();
    if (icon == "GameLife") gameOfLife();
    if (icon == "quicktime") quicktime();
}

//475
//336

OOB();


function changeWallpaper() {
    console.log("here");
    let wallpaperSelect = document.getElementById("wallselect");
    if (wallpaperSelect.selectedIndex != -1) {
        let wallName = wallpaperSelect.options[wallpaperSelect.selectedIndex].text;
        let imgPath = ("url('wallpapers/" + wallName + ".png')").replaceAll(' ', '');
        console.log(imgPath);
        document.body.style.backgroundImage = imgPath;
    }

}

function previewWallpaper() {
    let previewFrame = document.querySelector(".wallpaper-preview");
    let wallpaperSelect = document.getElementById("wallselect");
    let wallName = wallpaperSelect.options[wallpaperSelect.selectedIndex].text;
    let imgPath = ("background-image: url(wallpapers/" + wallName + ".png)").replaceAll(' ', '');
    previewFrame.style = imgPath;
}

function gameOfLife() {
    let height = 465;
    let width = 600;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        height = 630;
        width = 400;
    }
    let lifeWindow = makeWindow(10, 30, height, width, "Game Of Life");
    let tempDiv = document.createElement("div");
    tempDiv.className = "gameOfLife";
    tempDiv.style.height = height - 22 + "px";
    tempDiv.style.width = width + "px";
    lifeWindow.appendChild(tempDiv);
    playGameOfLife(tempDiv);
}

function quicktime() {
    let height = 200;
    let width = 760;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        height = 480;
        width = 400;
    }
    let quickWindow = makeWindow(10, 30, height, width, "Quicktime Player");
    let tempDiv = document.createElement("div");
    tempDiv.className = "quicktime";
    tempDiv.style.height = height - 22 + "px";
    tempDiv.style.width = width + "px";
    quickWindow.appendChild(tempDiv);
    playQuicktime(tempDiv);
}



// Check for OOB 10 times a second
setInterval(function() {
    updateTime();
}, 100);