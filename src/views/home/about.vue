<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
  <div class="about-container">
    <div class="warpper">
      <div class="list">
        <div class="demo-home__title">VUE2 移动端开发模板</div>
        <div class="item">
          Vue管理系统全家桶:
          <a href="https://vue-admin-all.mrlishaohai.com/">https://vue-admin-all.mrlishaohai.com</a>
        </div>
        <div class="item">项目作者: dawei</div>
        <div class="item"></div>
        <div class="wechat">
          <img :src="this.wechat" alt="" />
        </div>
        <div class="item">
          {{ userName }}
          <van-button v-if="userName == ''" type="info" size="small" @click="doDispatch">获取用户信息</van-button>
        </div>
      </div>
    </div>
    <div>
      <h2>测试v-for v-if的优先级</h2>
      <ul>
        <!-- vue2中，v-for优先级高于v-if -->
        <li v-for="item in todoList" v-if="!item.done" :class="{ todo: !item.done }" :key="item.id">
          <span>{{ item.task }}</span>
        </li>
      </ul>

      <ul>
        <li v-for="item in todoList" v-if="item.done" :class="{ finished: item.done }" :key="item.id">
          <span>{{ item.task }}</span>
        </li>
      </ul>
      <hr />
      <!-- 最佳实践----  -->
      <ul class="todo-list">
        <li v-for="item in todos" class="todo" :key="item.id">
          <span>{{ item.task }}</span>
        </li>
      </ul>

      <ul v-if="showFinished">
        <li v-for="item in finished" class="finished" :key="item.id">
          <span>{{ item.task }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// 请求接口
import { getUserInfo } from '@/api/user.js'
import { mapGetters } from 'vuex'
import me from '@/assets/imgs/me.jpg'
const todoList = [
  {
    id: 0,
    task: '大伟聊前端',
    done: true
  },
  {
    id: 1,
    task: '简历深度优化',
    done: false
  },
  {
    id: 2,
    task: '前端万能公式-组件开发',
    done: true
  }
]
export default {
  data() {
    return {
      wechat: me,
      todoList: todoList,
      showFinished: true
    }
  },
  computed: {
    ...mapGetters(['userName']),
    finished() {
      return todoList.filter(t => t.done)
    },
    todos() {
      return todoList.filter(t => !t.done)
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    // 请求数据案例
    initData() {
      const params = { user: '大伟聊前端' }
      getUserInfo(params)
        .then(() => {})
        .catch(() => {})
    },
    // Action 通过 store.dispatch 方法触发
    doDispatch() {
      this.$store.dispatch('setUserName', '大伟聊前端')
    }
  }
}
</script>

<style lang="less">
.about-container {
  background: #fff;
  height: 100vh;
  box-sizing: border-box;
  .warpper {
    padding: 50px 12px 12px 12px;
    .list {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #666;
      font-size: 24px;
      .demo-home__title {
        margin: 0 0 6px;
        font-size: 32px;
        .demo-home__title img,
        .demo-home__title span {
          display: inline-block;
          vertical-align: middle;
        }
      }
      .item {
        font-size: 24px;
        line-height: 34px;
        a {
          text-decoration: underline;
        }
        // .van-button {
        //   /* vant-ui 元素*/
        //   background: #ff5500;
        // }
      }
      .wechat {
        width: 821px;
        height: 336;
        img {
          width: 821px;
          height: 336px;
        }
      }
    }
  }
  .todo {
    color: red;
  }
  .finished {
    text-decoration: line-through;
    color: green;
    font-style: italic;
  }
}
</style>
