/* eslint-disable */
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const resolve = dir => path.join(__dirname, dir)
// page title
const name = 'vue mobile template'
// 生产环境，测试和正式
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

// externals
// const externals = {
//   vue: 'Vue',
//   'vue-router': 'VueRouter',
//   vuex: 'Vuex',
//   vant: 'vant',
//   axios: 'axios'
// }
// CDN外链，会插入到index.html中
// const cdn = {
//   // 开发环境
//   dev: {
//     css: [],
//     js: []
//   },
//   // 生产环境
//   build: {
//     css: ['https://cdn.jsdelivr.net/npm/vant@2.4.7/lib/index.css'],
//     js: [
//       'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
//       'https://cdn.jsdelivr.net/npm/vue-router@3.1.5/dist/vue-router.min.js',
//       'https://cdn.jsdelivr.net/npm/axios@0.19.2/dist/axios.min.js',
//       'https://cdn.jsdelivr.net/npm/vuex@3.1.2/dist/vuex.min.js',
//       'https://cdn.jsdelivr.net/npm/vant@2.4.7/lib/index.min.js'
//     ]
//   }
// }

module.exports = {
  publicPath: './', // 署应用包时的基本 URL。 vue-router hash 模式使用
  //  publicPath: '/app/', //署应用包时的基本 URL。  vue-router history模式使用
  outputDir: 'dist', //  生产环境构建文件的目录
  assetsDir: 'static', //  outputDir的静态资源(js、css、img、fonts)目录
  lintOnSave: !IS_PROD,
  productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  devServer: {
    port: 9020, // 端口
    open: false, // 启动后打开浏览器
    client: {
      overlay: {
        //  当出现编译器错误或警告时，在浏览器中显示全屏覆盖层
        warnings: false,
        errors: true
      }
    },
    proxy: {
      //配置跨域
      '/api': {
        target: 'https://test.xxx.com',
        // ws:true,
        changOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },
  css: {
    extract: IS_PROD, // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)。
    sourceMap: false,
    loaderOptions: {
      less: {
        // 向全局less样式传入共享的全局变量, $src可以配置图片cdn前缀
        // 详情: https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
        additionalData: `
          @import "assets/css/variables.less";
          `
      }
    }
  },
  configureWebpack: config => {
    config.name = name
    config.output.filename = 'js/[name].[contenthash:4].js'
    config.output.chunkFilename = 'js/[name].[contenthash:4].js'
    // 为生产环境修改配置...
    if (IS_PROD) {
      config.plugins.push(
        // 开启Gzip压缩
        new CompressionWebpackPlugin({
          test: /\.js$|\.html$|\.css$/u,
          threshold: 10240 // 超过 10kb 压缩
        })
      )
      // externals
      // config.externals = externals
    }
  },

  chainWebpack: config => {
    // config.plugins.delete('preload')
    // config.plugins.delete('prefetch')

    // 别名 alias
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('api', resolve('src/api'))
      .set('views', resolve('src/views'))
      .set('components', resolve('src/components'))

    /**
     * 添加CDN参数到htmlWebpackPlugin配置中
     */
    // config.plugin('html').tap(args => {
    //   if (IS_PROD) {
    //     args[0].cdn = cdn.build
    //   } else {
    //     args[0].cdn = cdn.dev
    //   }
    //   return args
    //  })
    /**
     * 行内样式转vm
     */
    config.module
      .rule('vue')
      .test(/\.vue$/)
      .use('style-vw-loader')
      .loader('style-vw-loader')
      .options({
        unitToConvert: 'px', // 要转化的单位
        viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
        viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
        unitPrecision: 5, // 指定`px`转换为视窗单位值的小数位数
        viewportUnit: 'vw', //指定需要转换成的视窗单位，建议使用vw
        selectorBlackList: ['dawei'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
        minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
        mediaQuery: false // 允许在媒体查询中转换`px`
      })
      .end()

    /**
     * 设置保留空格
     */
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()
    /**
     * 打包分析
     */
    if (IS_PROD) {
      // 压缩图片
      config.module
        .rule('images')
        .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({ bypassOnDebug: true })
      config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
        {
          analyzerMode: 'static'
        }
      ])
    }
    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(!IS_PROD, config => config.devtool('cheap-source-map'))

    config.when(IS_PROD, config => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // 将 runtime 作为内联引入不单独存在
            inline: /runtime\..*\.js$/
          }
        ])
        .end()
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          // cacheGroups 下可以可以配置多个组，每个组根据test设置条件，符合test条件的模块
          commons: {
            name: 'chunk-commons',
            test: resolve('src'),
            minChunks: 3, //  被至少用三次以上打包分离
            priority: 5, // 优先级
            reuseExistingChunk: true // 表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的。
          },
          node_vendors: {
            name: 'chunk-libs',
            chunks: 'all', // 只打包初始时依赖的第三方  // initial同步，async异步，all同步或者异步
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            reuseExistingChunk: true
          },
          vantUI: {
            name: 'chunk-vantUI', // 单独将 vant 拆包
            priority: 20, // 数字大权重到，满足多个 cacheGroups 的条件时候分到权重高的
            test: /[\\/]node_modules[\\/]_?vant(.*)/,
            reuseExistingChunk: true
          },
          chart: {
            name: 'chunk-chart', // 单独将 vant 拆包
            priority: 25, // 数字大权重到，满足多个 cacheGroups 的条件时候分到权重高的
            test: /[\\/]node_modules[\\/]_?@antv_f2(.*)/,
            reuseExistingChunk: true
          }
        }
      })
      config.optimization.runtimeChunk('single')
    })
  }
}
