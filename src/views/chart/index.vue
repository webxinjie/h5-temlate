<template>
  <div id="app">
    <canvas id="myChart" style="width: 100%; height: 300px"></canvas>
    <canvas id="pieChart" style="width: 100%; height: 300px"></canvas>
    <div>
      <h1>行内样式</h1>
      <p style="color: red; font-size: 24px">行内样式</p>
      <p class="p2">非行内样式</p>
    </div>
  </div>
</template>
<script>
import * as F2 from '@antv/f2'
export default {
  name: 'App',
  data() {
    return {
      pieData: [
        {
          name: '长津湖',
          percent: 0.4,
          a: '1'
        },
        {
          name: '我和我的父辈',
          percent: 0.2,
          a: '1'
        },
        {
          name: '失控玩家',
          percent: 0.18,
          a: '1'
        },
        {
          name: '宝可梦',
          percent: 0.15,
          a: '1'
        },
        {
          name: '峰爆',
          percent: 0.05,
          a: '1'
        },
        {
          name: '其他',
          percent: 0.02,
          a: '1'
        }
      ],
      intData: [
        {
          year: '2019 年',
          sales: 121
        },
        {
          year: '2020 年',
          sales: 100
        },
        {
          year: '2021 年',
          sales: 97
        },
        {
          year: '2022 年',
          sales: 85
        }
      ]
    }
  },

  methods: {
    drawChart() {
      var chart = new F2.Chart({
        id: 'myChart',
        pixelRatio: window.devicePixelRatio
      })
      chart.source(this.intData, {
        sales: {
          tickCount: 5
        }
      })
      // 让柱状图的宽度适配不同的屏幕尺寸
      var barWidth = 36 * (window.innerWidth / 375)
      chart.interval().position('year*sales').color('l(90) 0:#1890ff 1:#70cdd0').size(barWidth) // 定义柱状图渐变色
      chart.render()
    },
    drawPieChart() {
      // Step 1: 创建 Chart 对象
      const chart = new F2.Chart({
        id: 'pieChart',
        pixelRatio: window.devicePixelRatio // 指定分辨率
      })
      // Step 2: 载入数据源
      chart.source(this.pieData)
      // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴  marker 方形圆形显示
      chart.legend({
        position: 'right',
        marker: {
          symbol: 'square'
        }
      })
      chart.coord('polar', {
        transposed: true,
        innerRadius: 0.3, // 中间空心
        radius: 0.85
      })
      chart.axis(false)
      chart
        .interval()
        .position('a*percent')
        .color('name', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0'])
        .adjust('stack')
        .style({
          lineWidth: 1,
          stroke: '#fff',
          lineJoin: 'round',
          lineCap: 'round'
        })
      chart.render()
    }
  },
  mounted() {
    const vm = this
    // this.$nextTick(() => {
    // 	vm.drawChart();
    // });
    vm.drawChart()
    vm.drawPieChart()
  }
}
</script>

<style lang="less">
.p2 {
  font-size: 24px;
  color: blue;
}
</style>
