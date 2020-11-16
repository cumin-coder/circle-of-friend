import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

//引入路由组件
import ConfessionWall from "../views/ConfessionWall";
import TodayPictures from "../views/TodayPictures";
import Profile from "../views/Profile";
import LoginPage from "../views/LoginPage";
import MySpace from "../components/MySpace";

// 解决路由访问重复时报错问题：
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const routes = [
    {path: "/", redirect: "/profile"},
    {
        path: "/login", component: LoginPage, meta: {
            isShow: false
        }
    },
    {
        path: '/wall', component: ConfessionWall, meta: {
            isShow: true
        }
    },
    {
        path: '/pic', component: TodayPictures, meta: {
            isShow: true
        }
    },
    {
        path: "/profile", component: Profile, meta: {
            isShow: true
        }

    },
    {
        path: "/space",
        component: MySpace
    }
]

const router = new VueRouter({
    mode: 'history',
    routes,
})


export default router

