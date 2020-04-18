// elemet按需引入
import Vue from 'vue';
import { MessageBox , Message } from 'element-ui';
// 注册组件 会出现弹框 引入部分组件
// 使用use其他页面会莫名的弹出空白框
// Vue.use( MessageBox )
// Vue.use( Message )
// 解决element空白框的使用
Vue.component(MessageBox.name, MessageBox);
Vue.component(Message.name, Message);
// 将MessageBox的方法挂载到vue原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;