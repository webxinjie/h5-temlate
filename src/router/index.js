import Vue from 'vue'
import Router from 'vue-router'

// hack router push callback
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)
const constantRouterMap = [
  {
    path: '/',
    component: () => import('@/views/layouts/index'),
    redirect: '/home',
    meta: {
      title: '首页',
      keepAlive: false
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/home/index'),
        meta: { title: '首页', keepAlive: false }
      },
      {
        path: '/chart',
        name: 'Chart',
        component: () => import(/* webpackChunkName: "chart" */ '@/views/chart/index'),
        meta: { title: '图表', keepAlive: false }
      },
      {
        path: '/form',
        name: 'Form',
        component: () => import(/* webpackChunkName: "form" */ '@/views/form'),
        meta: { title: '搜索', keepAlive: false }
      },
      {
        path: '/svg',
        name: 'Svg',
        component: () => import(/* webpackChunkName: "svg" */ '@/views/svg'),
        meta: { title: '地图标注', keepAlive: false }
      },
      {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "home" */ '@/views/home/about'),
        meta: { title: '关于我', keepAlive: false }
      }
    ]
  }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // 如果你是 history模式 需要配置vue.config.js publicPath
    // base: process.env.BASE_URL,
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
