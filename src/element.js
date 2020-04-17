// elemet按需引入
import Vue from 'vue';
import { MessageBox , Message } from 'element-ui';
// 注册组件
Vue.use( MessageBox )
Vue.use( Message )
// 将MessageBox的方法挂载到vue原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;