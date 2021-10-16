let quickdiv = document.createElement("div");

function playQuicktime(div) {

    quickdiv = this.div;
    let video = document.createElement("video");
    video.src = "vfs/videos/sandwick.mp4";
    video.className = "quicktime-video";

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        video.style.maxHeight = "600px";
        video.style.maxWidth = "400px";
        video.style.minHeight = "0px";
        video.style.minWidth = "400px";
    }

    div.appendChild(video);
    let playButton = document.createElement("button");
    playButton.innerHTML = "Play";
    div.appendChild(playButton);
    playButton.addEventListener("click", () => {
        if (video.paused)
            video.play();
        else
            video.pause();
    })

    let fileButton = document.createElement("button");
    fileButton.innerHTML = "Select File";
    div.appendChild(fileButton);
    fileButton.addEventListener("click", () => {
        let filewin = makeWindow(0, 0, 300, 400, "Videos");

        let videoList = ["vfs/videos/sandwick.mp4", "vfs/videos/cage.mp4", "vfs/videos/lobster.mp4", "vfs/videos/diamonds.mp4", "vfs/videos/copyright_infringement.mp4", "vfs/videos/assbefat.mp4"];

        fileSelect(videoList, filewin, video);

    });



    let timerDiv = document.createElement("div");
    timerDiv.className = "timer-div";
    timerDiv.style.width = (div.style.width.substring(0, div.style.width.length - 2) - 20) + "px";
    timerDiv.style.height = 23 + "px";
    timerDiv.style.left = 10 + "px";
    div.appendChild(timerDiv);
    video.addEventListener('timeupdate', updateCountdown);
    let playtime = document.createElement("p");
    playtime.innerHTML = "00:00:00";
    playtime.className = "playtime";
    timerDiv.appendChild(playtime)

    let playbar = makePlaybar(0, 0, 400);
    timerDiv.appendChild(playbar);

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
        timerDiv.querySelector(".playbar").remove();
        timerDiv.querySelector(".playtime").remove();
        let playtime = document.createElement("p");
        playtime.innerHTML = secMinHour(Math.floor(video.currentTime));
        playtime.className = "playtime";
        timerDiv.appendChild(playtime);

        timerDiv.appendChild(makePlaybar(video.currentTime, video.duration, 400));
    }
    console.log("speed");

}

function makePlaybar(curTime, totalTime, width) {
    console.log(curTime);
    console.log(totalTime);
    let height = 8;
    let c = document.createElement("canvas");
    c.className = "playbar";
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