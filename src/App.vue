<template>
    <div id="app">
        <van-tabbar v-model="active" inactive-color="pink" active-color="deeppink" v-if="$route.meta.isShow">
            <van-tabbar-item icon="paid">图片</van-tabbar-item>
            <van-tabbar-item icon="flower-o">真心</van-tabbar-item>
            <van-tabbar-item icon="friends-o">我的</van-tabbar-item>
        </van-tabbar>
        <keep-alive exclude="Profile,ConfessionWall"
        >
            <router-view/>
        </keep-alive>

    </div>
</template>

<script>
    export default {
        name: "App",
        data() {
            return {
                active: 2,
            }
        },
        created() {
            this.isLogin()
        },
        methods: {
            isLogin() {
                let token = this.$cookie.get("token")
                if (!token) {
                    //token不存在
                    this.$router.replace("/login")
                }
            }
        },
        watch: {
            active(key) {
                switch (key) {
                    case 0:
                        this.$router.replace("/pic")
                        break;
                    case 1:
                        this.$router.replace("/wall")

                        break;
                    case 2 :
                        this.$router.replace("/profile")
                        break;
                }
            },
        }
    };
</script>

<style lang="less" scoped>
    .tabbar {
        height: 33px;
    }

    .mint-tabbar > .mint-tab-item.is-selected {
        background: #424242;
    }

    .pic, .wall {
        color: #ccc;
        font-size: 20px;
    }
</style>

