<template>
    <div>
        <van-nav-bar
                title="我的空间"
                left-arrow
                @click-left="onClickLeft"
        />

        <h1>{{message}}</h1>
        <ConfessionWall :dataArr="data"></ConfessionWall>
    </div>
</template>

<script>
    import ConfessionWall from "../views/ConfessionWall";

    export default {
        name: "MySpace",
        data() {
            return {
                data: null,
                message: ''
            }
        },
        components: {
            ConfessionWall
        },
        created() {
            this.ajaxProfileUser()
        },
        methods: {
            onClickLeft() {
                this.$router.replace("/profile")
            },
            async ajaxProfileUser() {
                let {data} = await this.$AjaxComment.reqProfileUser(this.$cookie.get("nickname"))
                if(data.msg){
                    return this.message = data.msg
                }
                this.data = data.data.reverse()
            },
        },
    }
</script>

<style scoped>
    /deep/ .v-top {
        z-index: 99;
        margin-bottom: 100px;
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
</style>