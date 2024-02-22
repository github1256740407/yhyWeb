<script setup lang="ts" name="home">
// 获取本地图片
const getBaseViewImg = (img: string) => {
  return new URL(`../../assets/images/baseViewImg/${img}`, import.meta.url).href;
};
console.log(getBaseViewImg('jx3Logo.png'))
</script>

<template>
  <div id="home">
    <!-- 封面 -->
    <HomeCover target="#homeMain" />
    <!-- 首页内容 -->
    <div id="homeMain">
      <!-- 最新博客 -->
      <div class="rowBox">
        <h5>
          <img src="@/assets/images/baseViewImg/jx3Logo.png" alt="jx3Logo" />
          <span>剑三瞬间</span>
        </h5>
        <div class="rowItem">
          <div class="card">
            <el-image :src="getBaseViewImg('homeCover.jpg')" fit="contain" />
            <span class="bottomTips">明教和花间亲友约的截图</span>
          </div>
        </div>
      </div>
      <!-- 最新项目 -->
      <!-- 剑三截图 -->
      <!-- 在追的番剧 -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
#home {
  #homeMain {
    padding: 10px;
    .rowBox {
      h5 {
        font-size: 20px;
        letter-spacing: 2px;
        color: rgb(127, 165, 178);
        font-weight: bold;
        display: flex;
        align-items: center;
        padding-bottom: 8px;
        margin-bottom: 10px;
        border-bottom: 1px solid rgb(127, 165, 178);
        img {
          width: 30px;
          margin-right: 10px;
        }
      }
      .rowItem {
        .card {
          width: 230px;
          height: 260px;
          position: relative;
          .bottomTips {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 30px;
            line-height: 30px;
            text-align: center;
            color: #fff;
            background-color: rgb(115,115,115,0.5);
          }
        }
      }
    }
  }
}
</style>
