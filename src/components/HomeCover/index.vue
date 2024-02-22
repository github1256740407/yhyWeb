<script setup lang="ts" name="HomeCover">
const props = defineProps({
  // 箭头跳转的锚点
  target: {
    type: String,
  },
});
// 点击箭头
const handleArrowClick = () => {
  props.target && document.querySelector(props.target)!.scrollIntoView({ behavior: "smooth" });
};
</script>

<template>
  <div id="HomeCover">
    <!-- 封面标题 -->
    <span class="title">欢迎来到叶花弈的小窝</span>
    <!-- 封面小文 -->
    <p class="tips">
      <span>大家好,我是摸奇遇五年的奇遇练习生,我阴阳无两界,雪山没啥仇,三山隔四海,平时擅长喂猫,捡垃圾,还有被女人凶</span>
      <span>[剑网三]</span>
    </p>
    <!-- 封面下箭头 -->
    <div class="arrow" v-if="props.target" @click="handleArrowClick">
      <div class="downArrow"></div>
      <div class="downArrowBg"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#HomeCover {
  width: 100%;
  height: calc(100vh - 60px);
  position: relative;
  background: url("@/assets/images/baseViewImg/homeCover.jpg");
  background-color: silver;
  background-position: center;
  background-blend-mode: multiply; // 背景图片和背景颜色的混合模式
  .title {
    position: absolute;
    color: white;
    font-size: 2rem;
    font-weight: bold;
    letter-spacing: 0.3rem;
    text-shadow: rgb(28, 31, 33) -4px 2px 6px;
    white-space: nowrap;
    user-select: none;
    overflow: hidden;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: titleAnimation 2s linear;
  }
  .tips {
    position: absolute;
    color: white;
    font-size: 1rem;
    letter-spacing: 0.15rem;
    white-space: nowrap;
    user-select: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    top: 52%;
    left: 50%;
    transform: translate(-50%, -50%);
    span {
      &:nth-child(1) {
        margin-bottom: 10px;
      }
    }
    animation: tipsAnimation 2s linear;
  }
  .arrow {
    width: 40px;
    height: 40px;
    left: calc(50% - 40px);
    bottom: 40px;
    position: absolute;
    cursor: pointer;
    animation: arrowAnimation 2s linear infinite;
    .downArrow {
      width: 30px;
      height: 30px;
      position: absolute;
      top: 5px;
      left: 5px;
      background: url("@/assets/images/baseViewImg/downArrow.png");
      background-size: contain;
      background-position: center;
    }
    .downArrowBg {
      width: 40px;
      height: 40px;
      position: absolute;
      top: 0;
      left: 0;
      background: url("@/assets/images/baseViewImg/downArrowBg.png");
      background-size: contain;
      background-position: center;
    }
  }
}
@keyframes titleAnimation {
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: 22.7rem;
    opacity: 1;
  }
}
@keyframes tipsAnimation {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes arrowAnimation {
  0% {
    bottom: 40px;
  }
  50% {
    bottom: 60px;
  }
  100% {
    bottom: 40px;
  }
}
</style>
