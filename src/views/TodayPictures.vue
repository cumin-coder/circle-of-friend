<template>
    <div class="container">

        <div class="div1_lzw">
            <div class="div2_lzw"> 上 传 图 片 </div>
            <input type="file" name="file" @change="inpEvent" class="inputStyle_lzw">
        </div>

        <van-pull-refresh
                v-model="isLoading"
                @refresh="refresh"
                success-text="刷新成功"
        >
            <ul class="ul-dom">
                <li v-for="(item,index) in images" :key="index" class="li-dom">
                    <div class="img-border">
                        <img :src="item.url" v-lazy="item.url" alt="" class="img-dom" @click="clickPreview(item.url)">
                    </div>

                    <div class="good2comment">
                        <span class="good" @click="clickGood(item._id)"><van-icon name="like" color="red" size="20px"/> {{ item.goodCount }}</span>
                        <span class="comment" @click="clickComment(item._id)"> <van-icon name="chat-o" color="#fff" size="20px"/> {{ item.commentCount }}</span>
                    </div>
                </li>
            </ul>
        </van-pull-refresh>


        <van-action-sheet
                v-model="comment"
                @closed="onClosed"
                title="评论"
        >
            <van-form @submit="onSubmitComment">
                <van-field
                        show-word-limit
                        maxlength="52"
                        v-model="commentContent"
                        type="commentContent"
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
    import {ImagePreview, Toast} from 'vant';
    import CommentMessage from "../components/CommentMessage";
    import _ from 'lodash'

    export default {
        name: "TodayPictures",
        components: {
            CommentMessage,

        },
        data() {
            return {
                images: [],

                //下拉刷新
                isLoading: true,
                //是否显示提交表格
                show: false,
                //是否显示评论表格
                comment: false,
                commentName: '',
                commentContent: '',
                arrContents: [],
                comment_id: '',
            }
        },
        created() {
            this.getAllImages()
        },

        methods: {
            //下拉刷新
            refresh() {
                this.getAllImages().then(() => {
                    this.isLoading = false
                })
            },

            //点击图片预览
            clickPreview(url) {
                ImagePreview({
                    images: [url],
                    showIndex: false
                });
            },

            //上传图片给服务器
            async inpEvent(e) {
                //获取本地图片的各项信息
                let fileInfo = e.target.files[0]

                let form = new FormData()
                form.append("singleload", fileInfo, fileInfo.name)

                await this.$AjaxUploadedPic.uploadedServer(form).then((data) => {
                    let {msg, status} = data.data
                    if (status === 0) {
                        Toast.fail({
                            message: msg,
                            icon: 'close',
                        });
                    }
                    this.getAllImages()
                })


                /*** base64加密图片 */
                /*
                    let reader = new FileReader()
                    //转成base64位码
                    reader.readAsDataURL(fileInfo)
                    //该事件在读取操作完成时触发
                    reader.onloadend = (e)=> {
                        let url = e.target.result
                        this.imgs.unshift(url);
                    }
                 */


            },

            //获取图片全部数据
            async getAllImages() {
                let data = await this.$AjaxUploadedPic.reqGetAllImage()
                let {msg} = data.data

                if (msg.length === 0) return
                this.images = msg.reverse()
            },

            //点赞加一
            clickGood: _.throttle(async function(id){
                await this.$AjaxUploadedPic.reqGoodIncrease(id).then(()=>{
                    //更新数据
                    this.getAllImages()
                })
            },1000),

            //点击打开评论
            clickComment(id) {
                this.comment_id = id
                this.comment = true

                //加载评论
                this.getAllCommentData()
            },

            //点击发表 拿到input框的内容
            async onSubmitComment(data) {
                this.commentName = ""
                this.commentContent = ""

                data["commentName"] = this.$cookie.get("nickname")


                //追加评论信息
                await this.$AjaxUploadedPic.reqAddCommentContent(this.comment_id,data).then(() => {
                    this.getAllCommentData()
                })


                //评论数量加一
                this.$AjaxUploadedPic.reqUpdataCommentCount(this.comment_id).then(()=>{
                    //更新数据
                    this.getAllImages()
                })
            },

            //查找所有的评论数据
            async getAllCommentData() {
                let {data} = await this.$AjaxUploadedPic.reqGetAllCommentData(this.comment_id)
                this.arrContents = data.msg
            },

            //完全关闭评论触发
            onClosed() {
                this.commentContent = ''
                this.commentName = ''
            },
        }
    }
</script>

<style scoped>
    .ul-dom {
        width: 100%;
        height: 100%;
    }

    .li-dom {
        width: 100%;
        box-sizing: border-box;
        text-align: center;
        margin-top: 10px;

    }

    .img-dom {
        display: block;
        width: 100%;
        box-shadow: 0px 0px 20px 1px pink;
        box-sizing: border-box;
        border-radius: 20px;


    }

    .img-border {
        /*border: 20px solid #fff;*/
        border-left: 20px solid #fff;
        border-right: 20px solid #fff;
        border-bottom: 20px solid #fff;

        /*border-style: solid double dashed ;*/
    }

    .good2comment {
        display: flex;
        justify-content: space-around;
        line-height: 35px;
        background: pink;
        height: 35px;

        border-radius: 20px;

    }

</style>