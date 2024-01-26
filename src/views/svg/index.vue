<template>
  <div>
    <embed ref="myDiv" :src="map" type="image/svg+xml" pluginspage="http://www.adobe.com/svg/viewer/install/" id="em" />
    <svg>
      <!-- <image :href="map" /> -->
      <circle v-for="(marker, index) in markers" :key="index" v-bind="marker" />
    </svg>
  </div>
</template>
<script>
import map from '@/assets/f2.svg'
export default {
  data() {
    return {
      map,
      markers: [{ cx: 100, cy: 100, r: 10, fill: 'red' }]
    }
  },
  mounted() {
    const myDiv = this.$refs.myDiv
    console.log(myDiv.getSVGDocument())
  }
}
</script>
