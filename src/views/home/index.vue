<template>
  <div class="index-container">
    <div class="warpper">
      <h1 class="demo-home__title">
        <img
          src="https://p3-armor.byteimg.com/tos-cn-i-49unhts6dw/dfdba5317c0c20ce20e64fac803d52bc.svg~tplv-49unhts6dw-image.image"
        />
        <span> VUE 移动端开发模板</span>
      </h1>
    </div>
    <van-cell icon="success" v-for="item in list" :key="item" :title="item" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
let list = ref([
  'Vue-cli4.5',
  '配置多环境变量(postcss-px-to-viewport)',
  '移动端适配方案',
  'VantUI 组件按需加载',
  'less 全局样式',
  'Vuex 状态管理',
  'Axios 封装及接口管理',
  'Vue-router',
  'vue.config.js 基础配置',
  '配置 proxy 跨域',
  '配置 alias 别名',
  '配置 打包分析',
  '开启Gzip压缩',
  '图片压缩vue-cli默认10kb内base64',
  '配置 externals 引入 cdn 资源(默认注释了可以不用)',
  'splitChunks 单独打包第三方模块',
  'Vant 和 公用的模板做了分离',
  'Eslint+Pettier 统一开发规范'
])
</script>

<style lang="less" scoped>
.index-container {
  .warpper {
    padding: 24px;
    background: #fff;
    .demo-home__title {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 0 6px;
      font-size: 56px;
      .demo-home__title img,
      .demo-home__title span {
        display: inline-block;
        vertical-align: middle;
      }
      img {
        width: 64px;
      }
      span {
        margin-left: 16px;
        font-weight: 500;
      }
    }
  }
}
</style>
