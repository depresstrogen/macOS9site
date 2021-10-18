function playQuicktime(div) {

    let video = document.createElement("video");
    video.src = "vfs/videos/sandwick.mp4";
    video.className = "qt__video";

    let headerHeight = 22;
    let footerHeight = 91;

    div.parentNode.style.height = (headerHeight + 400 + footerHeight) + "px";
    div.style.height = (400 + footerHeight) + "px";


    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        video.style.maxHeight = "400px";
        video.style.maxWidth = "400px";
        video.style.minHeight = "0px";
        video.style.minWidth = "400px";

        let height = 400;
        div.parentNode.style.height = (headerHeight + height + footerHeight) + "px";
        div.style.height = (height + footerHeight) + "px";
    }

    div.appendChild(video);

    let timerDiv = document.createElement("div");
    timerDiv.className = "qt__time";
    let divWidth = div.style.width.substring(0, div.style.width.length - 2);
    let timerWidth = (divWidth - 20);
    timerDiv.style.width = timerWidth + "px";



    timerDiv.style.left = 10 + "px";
    div.appendChild(timerDiv);
    video.addEventListener('timeupdate', updateCountdown);
    video.addEventListener("loadedmetadata", function(e) {
        console.log(video.videoWidth + " " + video.videoHeight);
    }, false);

    let playtimeDiv = document.createElement("div");
    playtimeDiv.className = "qt__time__playtime--div";
    timerDiv.appendChild(playtimeDiv);
    let playtime = document.createElement("p");
    playtime.innerHTML = "00:00:00";
    playtime.className = "qt__time__playtime";
    playtimeDiv.appendChild(playtime);

    let playBarWidth = timerWidth - (84) - (7 * 8) - 6;
    let barDiv = document.createElement("div");
    barDiv.className = "qt__time__playbar--div";
    timerDiv.appendChild(barDiv);
    let playbar = makePlaybar(0, 0, playBarWidth);
    barDiv.appendChild(playbar);

    let spacerDiv = document.createElement("div");
    spacerDiv.className = "qt__time__spacer--div";
    timerDiv.appendChild(spacerDiv);
    for (let i = 0; i < 8; i++) {
        let spacers = document.createElement("img");
        spacers.src = "img/quicktime/qtspacers.png";
        spacers.className = "qt__time__spacers";
        spacerDiv.appendChild(spacers);
    }

    let playbuttonDiv = document.createElement("div");
    playbuttonDiv.className = "qt__play-button--div";
    div.appendChild(playbuttonDiv);

    let playButton = document.createElement("button");
    playButton.className = "qt__play-button";
    playbuttonDiv.appendChild(playButton);
    playButton.addEventListener("click", () => {
        if (video.paused) {
            video.play();
            console.log(" AAA" + video.videoHeight);
        } else {
            video.pause();
        }
    })

    let footerImgWidth = 197;
    let footerX = 0;
    let qtFooterDiv = document.createElement("div");
    qtFooterDiv.className = "qt__footer";
    div.appendChild(qtFooterDiv);
    for (; footerX < divWidth / 2 - (footerImgWidth / 2) - 5; footerX++) {
        let qtExtendImg = document.createElement("img");
        qtExtendImg.src = "img/quicktime/qtfooterline.png";
        qtExtendImg.className = "qt__footer__img--extend";
        qtExtendImg.style.left = footerX + "px";
        qtFooterDiv.appendChild(qtExtendImg);
    }

    let qtFooterImg = document.createElement("img");
    qtFooterImg.className = "qt__footer__img";
    qtFooterImg.src = "img/quicktime/qtfooter.png";
    qtFooterImg.style.left = footerX + "px";
    qtFooterDiv.appendChild(qtFooterImg);

    footerX += footerImgWidth;

    for (; footerX < divWidth; footerX++) {
        let qtExtendImg = document.createElement("img");
        qtExtendImg.src = "img/quicktime/qtfooterline.png";
        qtExtendImg.className = "qt__footer__img--extend";
        qtExtendImg.style.left = footerX + "px";
        qtFooterDiv.appendChild(qtExtendImg);
    }

    let fileButton = document.createElement("button");
    fileButton.innerHTML = "Select File";
    fileButton.className = "qt__file-select mac-button"
    qtFooterDiv.appendChild(fileButton);
    fileButton.addEventListener("click", () => {
        let filewin = makeWindow(0, 0, 300, 400, "Videos");

        let videoList = ["vfs/videos/sandwick.mp4", "vfs/videos/cage.mp4", "vfs/videos/lobster.mp4", "vfs/videos/diamonds.mp4", "vfs/videos/copyright_infringement.mp4", "vfs/videos/assbefat.mp4"];

        fileSelect(videoList, filewin, video);

    });

    function secMinHour(seconds) {
        sec_num = seconds;
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);
        if (hours < 10) { hours = "0" + hours; }
        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }
        return hours + ':' + minutes + ':' + seconds;
    }

    function updateCountdown() {
        //console.log(video.duration - video.currentTime);
        timerDiv.querySelector(".qt__time__playbar").remove();
        timerDiv.querySelector(".qt__time__playtime").remove();
        let playtime = document.createElement("p");
        playtime.innerHTML = secMinHour(Math.floor(video.currentTime));
        playtime.className = "qt__time__playtime";
        playtimeDiv.appendChild(playtime);

        barDiv.appendChild(makePlaybar(video.currentTime, video.duration, playBarWidth));
    }
    console.log("speed");

}

function makePlaybar(curTime, totalTime, width) {
    console.log(curTime);
    console.log(totalTime);
    let height = 8;
    let c = document.createElement("canvas");
    c.className = "qt__time__playbar";
    c.style.width = width + 10 + "px";
    c.style.height = height + "px";
    let cx = c.getContext("2d");

    cx.beginPath();
    cx.fillStyle = "#EFF7DE";
    cx.rect(0, 0, c.width, c.height);
    cx.fill();

    let remainingTime = totalTime - curTime;
    let fractionRemaining = (totalTime - remainingTime) / totalTime;

    let dotPosition = fractionRemaining * c.width;
    dotPosition -= dotPosition % 1;

    cx.beginPath();
    cx.fillStyle = "#000000";
    cx.moveTo(dotPosition - 3, 80);
    cx.lineTo(dotPosition, 0);
    cx.lineTo(dotPosition + 3, 80);
    cx.lineTo(dotPosition, 160);

    cx.fill();

    console.log(dotPosition);
    return c;
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
    tempDiv.className = "qt";
    tempDiv.style.height = height - 22 + "px";
    tempDiv.style.width = width + "px";
    quickWindow.appendChild(tempDiv);
    playQuicktime(tempDiv);
}