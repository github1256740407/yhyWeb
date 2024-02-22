// 进入/退出全屏
const fullScreen = () => {
  let isFull = document.fullscreenElement;
  if (!isFull) {
    // 进入全屏
    document.documentElement.requestFullscreen();
  } else {
    // 退出全屏
    document.exitFullscreen();
  }
};

export default fullScreen;
