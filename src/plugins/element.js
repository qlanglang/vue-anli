import Vue from 'vue'
import { Button,
  Input,
  Form,
  FormItem,
  Message,
  Container,
  Header,
  Aside,
  Main,  
  Menu,
  Submenu,
  MenuItem } from 'element-ui'


Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
// $开头是vue内部的东西  $message是随便写的可能是饿了吗模仿vue的 
Vue.prototype.$message = Message
