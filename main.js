// 视频列表
const videoList = [
  'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
];

const videoContainer = document.querySelector('.video-container');

// 动态渲染视频
function renderVideos() {
  videoContainer.innerHTML = '';
  // 前后各加一个“哨兵”视频，实现无限循环
  const videos = [videoList[videoList.length - 1], ...videoList, videoList[0]];
  videos.forEach((src, idx) => {
    const video = document.createElement('video');
    video.className = 'video-player';
    video.src = src;
    video.loop = false; // 不自动循环，手动控制
    video.playsInline = true;
    video.muted = true;
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('playsinline', '');
    video.preload = 'auto';
    videoContainer.appendChild(video);
  });
}

renderVideos();
const videoPlayers = videoContainer.querySelectorAll('.video-player');

// 滚动到第一个实际视频
function scrollToRealFirst() {
  videoContainer.scrollTo({
    top: window.innerHeight, // 跳过第一个“哨兵”
    behavior: 'instant',
  });
}

// 初始化时滚动到第一个实际视频
window.onload = () => {
  scrollToRealFirst();
  playCurrentVideo();
};

// 单击切换播放/暂停
videoContainer.addEventListener('click', (e) => {
  if (e.target.tagName === 'VIDEO') {
    if (e.target.paused) {
      e.target.play();
    } else {
      e.target.pause();
    }
  }
});

// 只播放当前可见视频
function playCurrentVideo() {
  const videos = videoContainer.querySelectorAll('.video-player');
  let played = false;
  videos.forEach((video) => {
    const rect = video.getBoundingClientRect();
    // 判断视频是否完全在视口中间
    if (
      rect.top >= 0 &&
      rect.bottom <= window.innerHeight + 1 &&
      !played
    ) {
      video.play();
      played = true;
    } else {
      video.pause();
    }
  });
}

// 无限循环滚动
videoContainer.addEventListener('scroll', () => {
  const scrollTop = videoContainer.scrollTop;
  const maxScroll = videoContainer.scrollHeight - window.innerHeight;
  // 到顶部，跳到倒数第二个视频
  if (scrollTop <= 0) {
    videoContainer.scrollTo({
      top: window.innerHeight * videoList.length,
      behavior: 'instant',
    });
  }
  // 到底部，跳到第一个实际视频
  if (scrollTop >= maxScroll) {
    videoContainer.scrollTo({
      top: window.innerHeight,
      behavior: 'instant',
    });
  }
  playCurrentVideo();
});

// 页面不可见时暂停所有视频
document.addEventListener('visibilitychange', () => {
  const videos = videoContainer.querySelectorAll('.video-player');
  if (document.hidden) {
    videos.forEach(video => video.pause());
  } else {
    playCurrentVideo();
  }
});
