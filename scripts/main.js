"use strict";

(() => {
    const bgVideo = document.querySelector("video");
    const bgAudio = document.querySelector("audio");
    const playBtn = document.querySelector("img");
    const timerCircle = document.querySelectorAll("circle")[1];
    const timerCircleLength = timerCircle.getTotalLength();
    const timerDisplay = document.querySelectorAll("h2")[1]; 

    timerCircle.style.strokeDasharray = timerCircleLength;
    timerCircle.style.strokeDashoffset = timerCircleLength;

    // time selectors
    let duration = 120;
    let timeSelectors = document.querySelectorAll("#timeSelectorContainer button");

    timeSelectors.forEach(item => {
        item.addEventListener("click", function() {
            duration = Number(this.getAttribute("data-duration"));
            
            if(duration / 60 === 10) {
                timerDisplay.innerText = `${Math.floor(duration / 60)}:00`;
            }
            else if(duration < 60 && duration > 9) {
                timerDisplay.innerText = `0${Math.floor(duration / 60)}:${duration}`;
            } 
            else if(duration < 10) {
                timerDisplay.innerText = `0${Math.floor(duration / 60)}:0${duration}`;
            }
            else {
                timerDisplay.innerText = `0${Math.floor(duration / 60)}:00`;
            }

            bgAudio.pause();
            bgVideo.pause();
            bgAudio.currentTime = 0;
            playBtn.src = "assets/images/play.svg";
        });
    });

    // theme selectors
    let themeSelectors = document.querySelectorAll("#themePickerContainer button");

    themeSelectors.forEach(item => {
        item.addEventListener("click", function() {
            playBtn.src = "assets/images/play.svg";
            bgAudio.pause();
            bgAudio.src = this.getAttribute("data-music");
            bgAudio.currentTime = 0;
            bgVideo.src = this.getAttribute("data-video");
            bgVideo.pause();
        });
    });
    

    // play/pause the video &  audio.
    playBtn.addEventListener("click", () => {
        
        if(bgAudio.paused) {
            playBtn.src = "assets/images/pause.svg";
            bgVideo.play();
            bgAudio.play();
        }
        else {
            playBtn.src = "assets/images/play.svg";
            bgVideo.pause();
            bgAudio.pause();
        } 

        bgAudio.addEventListener("timeupdate", () => {
            // while the song is played, it returns the current position in seconds
            let currentT = bgAudio.currentTime;
            // calculates when the time you want the audio/video to be stopped
            let elapseTime = duration - currentT;

            // get the seconds & the minutes
            let seconds = Math.floor(elapseTime % 60);
            let minutes = Math.floor(elapseTime / 60);

            if (minutes < 10) {
                minutes = `0${minutes}`;
            }

            if (seconds < 10) {
                seconds = `0${seconds}`;
            }

            timerDisplay.innerText = `${minutes}:${seconds}`;
            // animate the timer circle by changing the offset length from full length to 0.
            timerCircle.style.strokeDashoffset = timerCircleLength * (1 - (currentT / duration));
 
            (() => {
                if(currentT >= duration) {
                    bgAudio.pause();
                    bgVideo.pause();
                    bgAudio.currentTime = 0;
                    playBtn.src = "assets/images/play.svg";
                }
            })();
        });
    });
})();

