<template>
  <div class="warpper">
    <van-field name="switch" label="开关">
      <template #input>
        <van-switch v-model="switchChecked" size="20" />
      </template>
    </van-field>
    <van-field name="checkbox" label="复选框">
      <template #input>
        <van-checkbox v-model="checkbox" shape="square" />
      </template>
    </van-field>
    <van-field name="checkboxGroup" label="复选框组">
      <template #input>
        <van-checkbox-group v-model="checkboxGroup" direction="horizontal">
          <van-checkbox name="1" shape="square">复选框 1</van-checkbox>
          <van-checkbox name="2" shape="square">复选框 2</van-checkbox>
        </van-checkbox-group>
      </template>
    </van-field>
    <van-field name="radio" label="单选框">
      <template #input>
        <van-radio-group v-model="radio" direction="horizontal">
          <van-radio name="1">单选框 1</van-radio>
          <van-radio name="2">单选框 2</van-radio>
        </van-radio-group>
      </template>
    </van-field>
    <van-field name="stepper" label="步进器">
      <template #input>
        <van-stepper v-model="stepper" />
      </template>
    </van-field>
    <van-field name="rate" label="评分">
      <template #input>
        <van-rate v-model="rate" />
      </template>
    </van-field>
    <van-field name="slider" label="滑块">
      <template #input>
        <van-slider v-model="slider" />
      </template>
    </van-field>
    <van-field name="uploader" label="文件上传">
      <template #input>
        <van-uploader v-model="uploader" />
      </template>
    </van-field>

    <van-field
      readonly
      clickable
      name="picker"
      :value="cityValue"
      label="选择器"
      placeholder="点击选择城市"
      @click="showPicker = true"
    />
    <van-popup v-model="showPicker" position="bottom">
      <van-picker show-toolbar :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
    </van-popup>

    <van-field
      readonly
      clickable
      name="calendar"
      :value="calendarValue"
      label="日历"
      placeholder="点击选择日期"
      @click="showCalendar = true"
    />
    <van-calendar v-model="showCalendar" @confirm="onCalendarConfirm" />

    <div style="margin: 40px">
      <span class="dawei">大伟聊前端</span>
    </div>
    <div class="wrap-name">
      <span class="name">大伟聊前端</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      switchChecked: false,
      checkbox: false,
      checkboxGroup: [],
      radio: '1',
      stepper: 1,
      rate: 3,
      slider: 50,
      uploader: [{ url: 'https://img01.yzcdn.cn/vant/leaf.jpg' }],
      cityValue: '',
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
      showPicker: false,
      calendarValue: '',
      showCalendar: false
    }
  },
  methods: {
    onChange(val) {
      console.log(val)
    },
    onSearch(val) {
      console.log(val)
    },
    onClick() {
      console.log('搜索' + this.data.value)
    },
    onConfirm(value) {
      this.cityValue = value
      this.showPicker = false
    },
    onCalendarConfirm(date) {
      this.calendarValue = `${date.getMonth() + 1}/${date.getDate()}`
      this.showCalendar = false
    }
  }
}
</script>

<style lang="less" scoped>
.warpper {
  padding-top: 20px;
  .dawei {
    font-size: 18px;
  }
  .wrap-name {
    margin: 40px;
    .name {
      font-size: 30px;
    }
  }
}
</style>
