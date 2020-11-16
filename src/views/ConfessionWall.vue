<template>
    <div class="container">
        <!--        回到顶部-->
        <vueToTop :type="4" :top="800" :size="40" color="#FFC0CB"></vueToTop>

        <!--        广告条-->
        <van-notice-bar
                left-icon="volume-o"
                scrollable
                text="私人微信：coderzw"
                color="#f40"
                v-show="$route.path === '/wall'"
        />

        <div class="lzw-button">
            <van-button type="primary" size="small" color="pink" @click="show=true" class="button">发表</van-button>
        </div>


        <!--        用户发表-->
        <van-action-sheet
                v-model="show"
                @closed="onClosed"
                title="我想说的话"
        >
            <van-form @submit="onSubmit">

                <van-field
                        v-model="name"
                        type="name"
                        name="name"
                        label="对谁说"
                        placeholder="请输入对方姓名"
                        maxlength="8"
                        :rules="[{ required: true, message: '请填写内容' }]"
                />

                <van-field
                        show-word-limit
                        maxlength="520"
                        v-model="content"
                        type="textarea"
                        name="content"
                        label="我想说的话"
                        placeholder="想说些什么..."
                        :rules="[{ required: true, message: '请填写内容' }]"
                />

                <div style="margin: 16px;">
                    <van-button round block color="pink" native-type="submit">
                        提交
                    </van-button>
                </div>
            </van-form>
        </van-action-sheet>


        <!--        下拉刷新-->
        <van-pull-refresh
                v-model="isLoading"
                @refresh="refresh"
                success-text="刷新成功"
        >

            <!--            每一项的真心话-->
            <ul class="ul-container">
                <li v-for="item in $route.path === '/space' ? dataArr : allInfo" :key="item._id" class="list-wall">
                    <Header2Name :header="item.header" :nickname="item.nickname"></Header2Name>
                    <div class="card">
                        <div class="top">
                            <p>对
                                <span>{{item.name}}</span>
                                <span class="time">{{item.time}}</span>
                                说</p>

                        </div>

                        <div class="center">
                            <p>{{item.content}}</p>
                        </div>

                        <div class="bottom">
                        <span class="good" @click="goodClick(item._id)">
                              <van-icon name="like" color="red" size="20px"/>
                             {{item.goodCount}}
                            </span>

                            <span class="comment" name="coupon-o" @click="clickComment(item._id)">
                               <van-icon name="chat-o" color="#fff" size="20px"/>
                                {{item.commentCount}}
                        </span>
                        </div>
                    </div>
                </li>
            </ul>

        </van-pull-refresh>

        <!--        评论-->
        <van-action-sheet
                v-model="comment"
                @closed="onClosed"
                title="评论"
        >
            <van-form @submit="onSubmitComment">
                <van-field
                        autosize
                        type="textarea"
                        v-model="commentContent"
                        name="commentContent"
                        label="我想说的话"
                        placeholder="想说些什么..."
                        :rules="[{ required: true, message: '请填写内容' }]"
                />

                <CommentMessage :arrContents="arrContents"></CommentMessage>

                <div style="margin: 16px;">
                    <van-button round block color="pink" native-type="submit">
                        提交
                    </van-button>
                </div>
            </van-form>
        </van-action-sheet>


        <div style="height: 4rem;" class="masking"></div>
    </div>
</template>

<script>
    import _ from 'lodash'
    import CommentMessage from "../components/CommentMessage";
    import Header2Name from "../components/Header2Name";
    import moment from "moment"

    export default {
        name: "ConfessionWall",
        components: {
            CommentMessage,
            Header2Name
        },
        props:{
            dataArr: Array
        },
        data() {
            return {
                moment,
                //是否显示提交表格
                show: false,
                //是否显示评论表格
                comment: false,

                //内容 与 姓名
                content: '',
                name: '',

                //评论
                commentContent: '',
                commentName: '',
                arrayComment: [],
                comment_id: '',

                //每条信息的数组
                allInfo: null,

                //WebSocket 变量大全
                WebSocket: null,

                //返回的查询数
                arrContents: [],

                //下拉刷新
                isLoading: true,
            }
        },
        created() {
            this.getWallInfo()
        },
        methods: {
            onSubmit(values) {
                if ("WebSocket" in window) {
                    //WebSocket(必须)
                    this.WebSocket = new WebSocket(`ws://${process.env.VUE_APP_BASE_API}:8081/`);

                    let {content, name} = values
                    if (!(content.split(" ").join("").length) || !(name.split(" ").join("").length)) {
                        this.$Toast.fail("内容不能为空格！！")
                        return
                    }

                    const _this = this
                    this.WebSocket.onopen = function () {
                        console.log("服务器端的WebSocket已连接")
                        //传递前端数据给后端
                        this.send(JSON.stringify({
                            content,
                            name,
                            goodCount: 0,
                            commentCount: 0,
                            commentContent: [],
                            time: moment().format('YYYY-MM-DD HH:mm:ss'),
                            //    头像
                            header: _this.$cookie.get("headerurl"),
                            //    昵称
                            nickname: _this.$cookie.get("nickname")
                        }))
                    }

                    //onmessage是接收后端传递过来的数据
                    this.WebSocket.onmessage = (message) => {
                        let {data} = message
                        let parseData = JSON.parse(data)
                        console.log(parseData)
                        this.allInfo.unshift(parseData)
                    }

                } else {
                    this.$Toast.success("当前浏览器 Not support websocket");
                }

                //1.提交后将内容清空
                this.content = ''
                this.name = ''

                //2.关闭填写内容区域
                this.show = false

                //3.提交后提示内容
                this.$Toast.success("她/他会看到的")

            },

            //将数据取出加载到页面中
            async getWallInfo() {
                let {data} = await this.$AjaxComment.reqGetAllMessage()
                if (data.status === 1) {
                    //拿到数据库中的数据 并倒叙放到页面中
                    this.allInfo = data.msg.reverse()
                }
                return data
            },

            // 节流点赞
            goodClick: _.throttle(async function (_id) {
                await this.$AjaxComment.reqUpdataGoodCount(_id).then(() => {
                    this.getWallInfo()
                })
            }, 1000),

            //开启评论
            clickComment(_id) {
                console.log(_id)
                this.comment = true
                this.comment_id = _id
                this.sendAjaxfind()
            },

            //输入评论
            onSubmitComment(data) {
                //1.提交后将内容清空
                this.commentContent = ''
                this.commentName = ''

                data["commentName"] = this.$cookie.get("nickname")

                //拿到输入框的 【 名称 和 内容 】 data => {commentName: "xxx", commentContent: "xxxx"}
                this.sendAjaxAdd(data)

                //评论数量加一
                this.$AjaxComment.reqUpdataCommentCount(this.comment_id).then(() => {
                    this.getWallInfo()
                })

            },

            //调用后端添加接口,向后端添加数据
            async sendAjaxAdd(data) {
                await this.$AjaxComment.reqAddComment(this.comment_id, data).then(() => {
                    this.sendAjaxfind()
                })
            },

            // 调用后端查询接口,查询需要的数据
            async sendAjaxfind() {
                let {data} = await this.$AjaxComment.reqFindComment(this.comment_id)
                this.arrContents = data.msg
            },

            //1.关闭面板后将内容清空
            onClosed() {
                this.commentContent = ''
                this.commentName = ''
            },

            //下拉刷新
            refresh() {
                this.getWallInfo().then(res => {
                    if (res.status == 1) this.isLoading = false
                })
            }
        },
    }
</script>

<style scoped>

    /deep/ .v-top {
        z-index: 99;
        margin-bottom: 100px;
    }


    .card {

        width: 100%;
        height: 200px;
        margin: 0 auto;
        box-sizing: border-box;
        border-right: 10px;


    }

    .top {
        width: 100%;
        height: 35px;
        background: pink;
        box-sizing: border-box;

    }

    .top > p {
        text-align: center;
        line-height: 35px;
        font-weight: bold;
    }

    .top > p > span {
        padding: 5px;
        background: indianred;
        border-radius: 10px;
        color: #f1fbfe;
        font-weight: bold;
    }

    .top .time {
        margin-left: 5px;
    }

    .center {
        width: 100%;
        height: 130px;
        background: #f1fbfe;

        overflow: auto;
        box-sizing: border-box;

    }

    .center > p {
        padding: 5px 0 0 5px;
    }

    .bottom {
        width: 100%;
        /*height: 35px;*/
        display: flex;
        justify-content: space-around;
        box-sizing: border-box;
        background: pink;

    }

    .bottom .good, .comment {
        line-height: 35px;
    }

    .list-wall {
        margin-top: 10px;
    }
    .lzw-button {
        width: 100%;
        /*height: 30px;*/

    }

    .button {
        position: absolute;
        right: 8px;
        top: 5px;
    }

</style>