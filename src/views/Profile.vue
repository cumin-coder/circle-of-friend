<template>
    <div>
        <van-nav-bar
                title="个人信息"
                right-text="退出"
                @click-right="onClickRight"
        />

        <van-cell-group>


            <van-cell title="头像" class="title">

                <template #right-icon>
                    <input type="file" name="file" @change="inpEvent" class="inputStyle_lzw">
                    <!--                    <img class="header-img" :src="headerUrl" alt="">-->
                    <van-image width="100" height="100" :src="headerUrl" error-icon="ellipsis"
                               @click="clickImg"></van-image>

                </template>

            </van-cell>


            <van-cell title="昵称" :value="name" @click="openShow"></van-cell>
            <van-cell title="翰动号" :value='"ID：" + ID'/>
        </van-cell-group>


        <!--        新昵称-->
        <van-popup v-model="show" class="van-cell"
        >
            <van-form @submit="onSubmit">
                <van-field
                        v-model="newName"
                        center
                        name="newName"
                        clearable
                        maxlength="10"
                        label="新昵称："
                        label-width="56px"
                >
                    <template #button>
                        <van-button size="small" type="primary" color="pink">确认</van-button>
                    </template>
                </van-field>
            </van-form>

        </van-popup>

        <van-button @click="clickMySpace">我的空间</van-button>
    </div>
</template>

<script>
    import {ImagePreview} from 'vant';

    export default {
        name: "Profile",
        data() {
            return {
                headerUrl: "",
                name: "",
                ID: "",
                mongodbID: "",
                show: false,
                newName: ''
            }
        },
        created() {
            this.ID = this.$cookie.get("username")

            //获取默认昵称的函数
            this.ajaxGetChangeName()
        },
        methods: {
            //头像预览图
            clickImg() {
                ImagePreview({
                    images: [this.headerUrl],
                    showIndex: false
                });
            },

            //打开我的空间
            clickMySpace() {
                this.$router.replace('/space')

                window.location.reload();
            },

            //退出
            onClickRight() {
                this.$cookie.set("token", '', -1)
                this.$cookie.set("username", '', -1)
                this.$cookie.set("nickname", '', -1)
                this.$cookie.set("headerurl", '', -1)
                this.$router.replace("/login")
            },

            openShow() {
                this.show = true
            },

            //获取默认昵称的函数
            async ajaxGetChangeName() {
                let {data} = await this.$AjaxProfile.reqAjaxGetChangeName(this.ID)
                let {_id, changename} = data.msg

                this.name = changename
                this.mongodbID = _id

                //获取头像
                this.getHeader()
            },

            onSubmit(value) {
                if (value.newName.length < 1) return
                let newName = value.newName

                this.$AjaxProfile.reqChangeName(this.mongodbID, newName).then(res => {
                    //修改名字并保存到cookie李
                    let oldName = this.$cookie.get("nickname")
                    this.$cookie.set("nickname", newName)

                    //提示修改成功
                    let {msg} = res.data
                    this.$toast(msg)

                    //修改nickname
                    this.$AjaxComment.reqUpdataNickName(newName, oldName)

                    //初始化
                    this.newName = ''
                    this.show = false

                    //重载一下新的名字
                    this.ajaxGetChangeName()
                })

            },

            getHeader() {
                this.$AjaxProfile.reqAjaxGetHeader(this.mongodbID).then(res => {
                    let {urlheader} = res.data.msg
                    this.$cookie.set("headerurl", urlheader)
                    this.headerUrl = urlheader
                })

            },

            inpEvent(e) {
                let fileInfo = e.target.files[0]
                let form = new FormData()
                form.append("changeurl", fileInfo, this.mongodbID)
                this.$AjaxProfile.reqAjaxFormData(form).then(res => {
                    let {msg} = res.data
                    this.headerUrl = msg.urlheader
                    window.location.reload();
                })
            },
        }
    }
</script>

<style scoped>

    >>> .van-button--default{
        width: 100%;
    }

    .inputStyle_lzw {
        width: 100%;
        height: 100%;
    }

    .title {
        line-height: 100px;
    }

    .header-img {
        width: 100px;
        height: 100px;
    }

    .van-cell {
        width: 100%;
    }
</style>