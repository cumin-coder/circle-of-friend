<template>
    <div>
        <van-button class="reg-btn" @click="clickReg" style="color: pink; font-weight: bold">注册中心</van-button>
        <van-action-sheet
                v-model="comment"
                title="注册中心"
        >
            <van-form @submit="onSubmitComment">
                <van-field
                        v-model="registerName"
                        maxlength="12"
                        name="asyncAccount"
                        label="账号"
                        placeholder="请输入账号"
                        :rules="[
                                  { required: true,message: '账号不能为空' },
                                  { validator : asyncAccount,message: '此用户名已注册' },
                                ]"
                />

                <van-field
                        v-model="pwd"
                        type="password"
                        name="pwd"
                        maxlength="12"
                        label="密码"
                        placeholder="请输入密码"
                        :rules="[
                                 { required: true,message: '密码不能为空' },
                                { validator: isLessThanSix, message: '密码不能小于6位数' },
                                ]"
                />


                <van-field
                        v-model="registerEmail"
                        type="email"
                        name="pattern"
                        label="邮箱"
                        placeholder="请输入QQ邮箱"
                        :rules="[
                                { required: true,message: '邮箱不能为空' },
                                { pattern, message: '请输入正确的邮箱号' },
                                { validator: asyncEmail, message: '此邮箱已注册' },
                                ]"
                />

                <van-field
                        v-model="code"
                        type="code"
                        name="asyncCode"
                        maxlength="4"
                        label="验证码"
                        placeholder="请输入验证码"
                        :rules="[
                                { required: true,message: '验证码不能为空' },
                                { required: true, message: '请输入正确的验证码...' }
                                ]"

                >

                    <template #button>
                        <van-button size="small" type="primary" v-if="isSendCode" :disabled="isDisabled"
                                    @click="sendCode">发送验证码
                        </van-button>
                        <van-button size="small" type="primary" color="#ccc" v-if="!isSendCode"
                                    :disabled="true">倒计时({{codeTime}})
                        </van-button>
                    </template>


                </van-field>

                <div style="margin: 16px;">
                    <van-button round block color="pink" native-type="submit" :disabled="isSubmit">
                        提交
                    </van-button>
                </div>
            </van-form>


        </van-action-sheet>
    </div>
</template>

<script>
    import _ from "lodash";

    export default {
        name: "Register",
        data() {
            return {
                //是否打开注册中心
                comment: false,

                //注册的用户名
                registerName: '',

                //密码
                pwd: '',

                //注册的邮箱号
                registerEmail: '',

                //验证码
                code: '',

                //是否发送验证码
                isSendCode: true,

                //验证码倒计时
                codeTime: 60,
                timer: null,
                //是否启用发送验证码
                isDisabled: true,


                //邮箱号是否合法
                pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,

                //是否启用提交
                isSubmit: true,
                nowTime: `${Date.now()}_green绿色`
            }
        },
        methods: {
            //打开注册中心
            clickReg() {
                this.comment = true
            },

            async onSubmitComment(data) {
                let {asyncAccount, pwd, pattern, asyncCode} = data

                //设置cookie
                let millisecond = new Date().getTime();
                //设置一个星期token过期
                let expiresTime = new Date(millisecond + 60 * 1000 * 60 * 24 * 7);
                this.$cookie.set("nickname", this.nowTime, {expires: expiresTime})

                //发送请求
                await this.$AjaxLogin.reqUserRegisterIfRepetitionr(
                    asyncAccount,
                    pwd,
                    pattern,
                    asyncCode,
                    'http://127.0.0.1:2003/public/img/default-header.png',
                    this.nowTime
                ).then(res => {
                    let {status, msg} = res.data
                    if (!status) {
                        //验证码错误
                        return this.$toast(msg)
                    } else {
                        this.$toast(msg)
                        this.comment = false

                        this.resetCode()

                        this.registerName = ''
                        this.pwd = ''
                        this.registerEmail = ''
                        this.code = ''
                    }


                })
            },

            //验证账号是否重复
            asyncAccount: _.throttle(async function (newValue) {
                let {data} = await this.$AjaxLogin.reqUserIsExist(newValue)
                return data.status
            }, 1000),

            //密码长度判断
            isLessThanSix() {
                if (this.pwd.length <= 6) {
                    return false
                }
            },

            //发送验证码
            async sendCode() {
                if (!this.pattern.test(this.registerEmail)) {
                    return this.$toast("请填写正确QQ邮箱号")
                }

                this.isSendCode = false
                this.isSubmit = false

                await this.$AjaxLogin.reqGetCode(this.registerEmail)

                if (!this.timer) {
                    this.timer = setInterval(() => {
                        this.codeTime--
                        if (this.codeTime === 0) {
                            this.resetCode()
                        }
                    }, 1000)
                }


            },

            //验证邮箱号是否存在
            asyncEmail: _.throttle(async function (newValue) {
                let {data} = await this.$AjaxLogin.reqEmailIsExist(newValue)
                this.isDisabled = !data.status
                return data.status
                //是否启用发送验证码
            }, 1000),

            //重置验证码
            resetCode() {
                this.codeTime = 60
                this.isSendCode = true
                clearInterval(this.timer);
                this.timer = null
            },
        }
    }
</script>

<style scoped>
    .reg-btn {
        position: absolute;
        right: 20px;
    }
</style>