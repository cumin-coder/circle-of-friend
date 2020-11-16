<template>
    <div class="header2name">
        <div class="contentImg">
            <img :src="header" alt="" class="img" @click="clickImg">
            <span class="name">{{nickname}}</span>
            <span class="del" @click="clickDel" v-if="$route.path !== '/wall'">删除</span>
        </div>
    </div>
</template>

<script>
    import { ImagePreview } from 'vant';
    export default {
        name: "Header2Name",
        props: {
            header: String,
            nickname: String
        },
        data() {
            return {

            }
        },
        methods: {
            clickImg() {
                ImagePreview({
                    images: [this.header],
                    showIndex: false
                });
            },
            clickDel(){
                this.$AjaxComment.reqDelProfile(this.$cookie.get("nickname")).then(res=>{
                    let {msg} = res.data
                    this.$toast(msg)
                    window.location.reload();

                })
            }
        }
    }
</script>

<style scoped>

    .header2name {
        position: relative;
        width: 100%;
        height: 40px;
        background: pink;
    }

    .img {
        width: 40px;
        height: 40px;
        border-radius: 20%;
    }

    .name {
        position: absolute;
        line-height: 40px;
        /*padding: 5px;*/
        color: #fff;
        font-weight: bold;
        margin-left: 10px;
    }

    .del{
        position: absolute;
        top: 5px;
        right: 10px;
        padding: 5px;
        background: indianred;
        border-radius: 10px;
        color: #f1fbfe;
        font-weight: bold;
    }

</style>