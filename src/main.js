import Vue from 'vue'
import App from './App.vue'

//引入全局CSS
import "./assets/css/index.css";
//引入vant
import "./ui/vant"

//view-design
import "./ui/view-design"
import 'view-design/dist/styles/iview.css';

import {Toast} from "vant"
Vue.prototype.$Toast = Toast

//引入路由
import router from "./router/index"


//引入全局AJAX请求
import * as AjaxComment from "./network/apiComment"
import * as AjaxUpdataPic from "./network/apiUpdataPic"
import * as AjaxProfile from "./network/apiProfile"
import * as AjaxLogin from "./network/apiLogin"

//回到顶部
import vueToTop from 'vue-totop'
Vue.use(vueToTop)

import { ImagePreview } from 'vant';

import cookie from "js-cookie"
Vue.prototype.$cookie = cookie



// 全局注册
Vue.use(ImagePreview);

Vue.prototype.$AjaxComment = AjaxComment
Vue.prototype.$AjaxUploadedPic = AjaxUpdataPic
Vue.prototype.$AjaxProfile = AjaxProfile
Vue.prototype.$AjaxLogin = AjaxLogin


Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router,
}).$mount('#app')
