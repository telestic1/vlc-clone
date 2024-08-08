// Query the elements by their IDs
const speedUp = document.querySelector("#speedUp");
const speedDown = document.querySelector("#speedDown");
const volumeUp = document.querySelector("#volumeUp");
const volumeDown = document.querySelector("#volumeDown");
const videoBtn = document.querySelector("#videoBtn");
const videoInput = document.querySelector("#videoInput");
const videoPlayer = document.querySelector("#main");
const toast=document.querySelector(".toast");


const handlerInput = () => {
    videoInput.click();
};

const acceptInputHandler = (event) => {
    const selectedVideo = event.target.files[0];
    if (selectedVideo) {
        const link = URL.createObjectURL(selectedVideo);
        const videoElement = document.createElement("video");
        videoElement.src = link;
        videoElement.setAttribute("controls", "controls");
        videoElement.classList.add("video");
        videoPlayer.innerHTML = ""; 
        videoPlayer.appendChild(videoElement);
        videoElement.play();
        console.log(videoElement.duration);
    }
};

const getVideoElement = () => {
    return document.querySelector("#main .video");
};

const speedUpHandler = () => {
    const videoElement = getVideoElement();
    if (videoElement === null) {
        return;
    }
    if (videoElement.playbackRate >= 3) { // Corrected condition to return when already at or above 3x speed
        return;
    }
    const increaseSpeed = videoElement.playbackRate + 0.5;
    videoElement.playbackRate = increaseSpeed;

   showToast(increaseSpeed+"x");
};

const speedDownHandler = () => {
    const videoElement = getVideoElement();
    if (videoElement === null) {
        return;
    }
    if (videoElement.playbackRate <= 0.5) { 
        return;
    }
    const decreaseSpeed = videoElement.playbackRate - 0.5;
    videoElement.playbackRate = decreaseSpeed;

    showToast(decreaseSpeed+"x");
};

const volumeUpHandler = () => {
    const videoElement = getVideoElement();
    if (videoElement === null || videoElement.volume >= 0.99) {
        return;
    }
    const newVolume = Math.min(videoElement.volume + 0.1, 1);
    videoElement.volume = newVolume;
    showToast(newVolume.toFixed(1) + "x");
};

const volumeDownHandler = () => {
    const videoElement = getVideoElement();
    if (videoElement === null || videoElement.volume <= 0) {
        return;
    }
    const newVolume = Math.max(videoElement.volume - 0.1, 0);
    videoElement.volume = newVolume;
    showToast(newVolume.toFixed(1) + "x");
};


function showToast(message){
toast.textContent =message;
toast.style.display="block";
setTimeout(()=>{
    toast.style.display="none"
},1000);
}


if (speedUp) {
    speedUp.addEventListener("click", speedUpHandler);
}

if (speedDown) {
    speedDown.addEventListener("click", speedDownHandler);
}

if (volumeUp) {
    volumeUp.addEventListener("click", volumeUpHandler);
}

if (volumeDown) {
    volumeDown.addEventListener("click", volumeDownHandler);
}

if (videoBtn) {
    videoBtn.addEventListener("click", handlerInput);
}

if (videoInput) {
    videoInput.addEventListener("change", acceptInputHandler);
}
const handleFullScreen= ()=>{
    videoPlayer.requestFullscreen();

}

const fullScreenElem = document.querySelector("#fullScreen");
fullScreenElem.addEventListener("click",handleFullScreen);

/* play and pause*/
