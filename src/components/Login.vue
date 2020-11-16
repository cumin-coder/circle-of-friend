<template>
        <div class="form-container">
            <van-form @submit="onSubmit">
                <van-field
                        v-model="username"
                        name="username"
                        maxlength="8"
                        label="账号"
                        placeholder="账号"
                        :rules="[{ required: true, message: '请填写账号' }]"
                />
                <van-field
                        v-model="password"
                        type="password"
                        name="password"
                        maxlength="12"
                        label="密码"
                        placeholder="密码"
                        :rules="[{ required: true, message: '请填写密码' }]"
                />
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit" color="pink">
                        登录
                    </van-button>
                </div>
            </van-form>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                username: '',
                password: '',
            };
        },
        created() {
            //token认证
            this.tokenVerify()
        },
        methods: {
            tokenVerify() {
                const token = this.$cookie.get("token")
                this.$AjaxLogin.reqToken(token).then(res => {
                    let {status} = res.data
                    if (status === 1) {
                        this.$router.replace("/wall")
                    }
                })
            },

            //提交登录信息
            onSubmit(values) {
                let {username, password} = values

                this.$AjaxLogin.reqUserLogin(username,password).then(res => {
                    let {status, msg, result} = res.data
                    //result => undefined
                    if (!result) return this.$toast(msg)
                    let {username, token,changename,urlheader} = result
                    if (status === 1) {
                        //设置cookie
                        let millisecond = new Date().getTime();

                        //设置一个星期token过期
                        let expiresTime = new Date(millisecond + 60 * 1000 * 60 * 24 * 7);

                        this.$cookie.set("username", username, {expires: expiresTime})
                        this.$cookie.set("token", token, {expires: expiresTime})
                        this.$cookie.set("nickname", changename, {expires: expiresTime})
                        this.$cookie.set("headerurl", urlheader, {expires: expiresTime})

                        //提示
                        this.$toast.success(msg)

                        this.$router.push("/profile")

                        this.username = ''
                        this.password = ''
                        return
                    } else {
                        console.log(msg)
                        return this.$toast(msg)
                    }

                })
            },
        },

        watch: {
            registerName(newValue) {
                this.asyncAccount(newValue)
            },
            registerEmail(newValue) {
                this.asyncEmail(newValue)
            },
        }
    }
</script>

<style scoped>
    /deep/ .van-form {
        padding: 10px;
    }
</style>