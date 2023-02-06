// 按需全局引入 vant组件
import Vue from 'vue'
import {
  Button,
  List,
  Cell,
  Tabbar,
  TabbarItem,
  // Search,
  Form,
  Field,
  Switch,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Stepper,
  Rate,
  Slider,
  Uploader,
  Popup,
  Picker,
  Calendar
} from 'vant'
Vue.use(Button)
Vue.use(Cell)
Vue.use(List)
// Vue.use(Search)
Vue.use(Form)
Vue.use(Field)
Vue.use(Switch)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Stepper)
Vue.use(Rate)
Vue.use(Slider)
Vue.use(Uploader)
Vue.use(Popup)
Vue.use(Picker)
Vue.use(Calendar)
Vue.use(Tabbar).use(TabbarItem)
