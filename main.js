const videoPlayers = document.querySelectorAll('.video-player');
const videoContainer = document.querySelector('.video-container');

// Play the first video initially
videoPlayers[0].play();

videoContainer.addEventListener('scroll', () => {
  videoPlayers.forEach((video, index) => {
    const videoRect = video.getBoundingClientRect();
    const videoCenter = videoRect.top + videoRect.height / 2;
    const containerCenter = videoContainer.offsetHeight / 2;

    // If the video is roughly in the center of the container, play it.
    // Otherwise, pause it.
    if (Math.abs(videoCenter - containerCenter) < video.offsetHeight / 4) {
      video.play();
    } else {
      video.pause();
    }
  });
});

// Pause all videos when the page is not visible
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    videoPlayers.forEach(video => video.pause());
  } else {
    // When the page becomes visible, find the video in the center and play it
    videoPlayers.forEach((video, index) => {
      const videoRect = video.getBoundingClientRect();
      const videoCenter = videoRect.top + videoRect.height / 2;
      const containerCenter = videoContainer.offsetHeight / 2;

      if (Math.abs(videoCenter - containerCenter) < video.offsetHeight / 4) {
        video.play();
      }
    });
  }
});
