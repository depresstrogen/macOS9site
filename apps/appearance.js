function appearance() {
    let height = 336;
    let width = 475;
    let appWindow = makeWindow(50, 50, height, width, "Appearance");
    let selectDiv = document.createElement("div");
    appWindow.appendChild(selectDiv);
    selectDiv.innerHTML = `
    <form>
        <iframe class="appearance__preview" height="142" width="190" frameBorder="0" style="background-image:url(wallpapers/MacOSDefault.png)"></iframe>
        <select class="appearance_selector" name="wallpapers" id="appearance_selector" size="8" onchange="previewWallpaper()">
            <option value="">Mac OS Default</option>
            <option value="">Lollipop</option>
            <option value="">Lollipop 2</option>
            <option value="">Lollipop 3</option>
            <option value="">Lollipop 4</option>
            <option value="">Lollipop 5</option>
            <option value="">Lollipop 6</option>
            <option value="">Strawberry</option>
        </select><input class="appearance_apply" type="button" value="Set Desktop" onclick="changeWallpaper()"/>
    </form>
    `;
}

function changeWallpaper() {
    console.log("here");
    let wallpaperSelect = document.getElementById("appearance_selector");
    if (wallpaperSelect.selectedIndex != -1) {
        let wallName = wallpaperSelect.options[wallpaperSelect.selectedIndex].text;
        let imgPath = ("url('wallpapers/" + wallName + ".png')").replaceAll(' ', '');
        console.log(imgPath);
        document.body.style.backgroundImage = imgPath;
    }
}

function previewWallpaper() {
    let previewFrame = document.querySelector(".appearance__preview");
    let wallpaperSelect = document.getElementById("appearance_selector");
    let wallName = wallpaperSelect.options[wallpaperSelect.selectedIndex].text;
    let imgPath = ("background-image: url(wallpapers/" + wallName + ".png)").replaceAll(' ', '');
    previewFrame.style = imgPath;
}