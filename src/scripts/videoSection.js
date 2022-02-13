(function () {
  document.addEventListener("DOMContentLoaded", () => {
    //video section -------------------------------------------------
    let intervalID;
    const video = document.querySelector("#video");
    video.addEventListener("click", playStop);

    const playButtons = document.querySelectorAll(".play");
    playButtons.forEach((item) => {
      item.addEventListener("click", playStop);
    });

    const durationControl = document.querySelector(".video__duration-line");
    durationControl.min = 0;
    durationControl.max = 100;
    durationControl.value = 0;
    durationControl.addEventListener("mousedown", stopInterval);
    durationControl.addEventListener("click", setVideoDuration);

    const muteButton = document.querySelector(".video__mute");

    muteButton.addEventListener("click", mute);

    const soundControl = document.querySelector(".video__volume");
    soundControl.min = 0;
    soundControl.max = 10;
    soundControl.value = 5;
    soundControl.addEventListener("click", changeVolume);
    soundControl.addEventListener("mouseup", changeVolume);

    let playButton = document.querySelector(".video__play-button");

    function playStop() {
      playButton.classList.toggle("video__play-button--active");

      if (video.paused) {
        video.play();
        intervalID = setInterval(udateDuration, 1000 / 10);
      } else {
        video.pause();
        clearInterval(intervalID);
      }
    }

    function udateDuration() {
      // curTime in %
      const CurTime = (video.currentTime / video.duration) * 100;
      durationControl.value = CurTime;
      //scaled value 1..99% for correct duration line visualisation
      const CurTimeVisible = 1 + CurTime * 0.98;
      durationControl.style.backgroundImage = `linear-gradient(to right, #fedb3f, #fedb3f ${CurTimeVisible}%, #626262 ${CurTimeVisible}%, #626262 100%)`;

      if (video.ended) {
        playButton.classList.remove("video__play-button--active");
        clearInterval(intervalID);
      }
    }

    function stopInterval() {
      video.pause();
      clearInterval(intervalID);
    }

    function setVideoDuration() {
      if (video.paused) {
        video.play();
        playButton.classList.add("video__play-button--active");
      } else {
        video.pause();
      }
      video.currentTime = (durationControl.value * video.duration) / 100;

      intervalID = setInterval(udateDuration, 1000 / 10);
    }

    function mute() {
      video.muted = !video.muted;
      muteButton.closest(".video__sound").classList.toggle("video__sound--muted");
      if (video.muted) {
        soundControl.value = 0;
      } else {
        soundControl.value = video.volume * 10;
      }
    }

    function changeVolume() {
      video.volume = soundControl.value / 10;
      const soundControlVisible = video.volume * 100;
      soundControl.style.backgroundImage = `linear-gradient(to right, #fedb3f, #fedb3f ${soundControlVisible}%, #626262 ${soundControlVisible}%, #626262 100%)`;
    }
  });
})();
