"use strict";

let playBtn = document.getElementById("playBtn"),
    bgVideo = document.getElementById("bgVideo"),
    bgAudio = document.getElementById("bgAudio");

playBtn.onclick = () => {
    bgVideo.play();
    bgAudio.play();
};