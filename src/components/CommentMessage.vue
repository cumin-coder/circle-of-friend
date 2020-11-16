<template>
    <div class="container">

        <div class="comment-tab">评论区</div>
        <ul class="ul-content" >
            <li v-for="(item,index) in arrContents" :key="index" class="li-content">
                <div class="box">
                    <span class="name">
                        {{item.commentName}}:
                    </span>
                    <span class="content">
                        {{item.commentContent}}
                    </span>

                </div>
            </li>
        </ul>

    </div>
</template>

<script>
    export default {
        name: "UploadedPage",
        props: {
            arrContents: Array,
        },
    }
</script>

<style scoped>
    .ul-content {
        margin-left: 16px;
        height: 200px;
        overflow: auto;
    }

    .li-content{
        margin-top: 15px;
    }

    .comment-tab{
        width: 100%;
        text-align: center;
        font-weight: bold;
    }

    .name{
        padding: 5px;
        background: indianred;
        border-radius: 10px;
        color: #f1fbfe;
        font-weight: bold;
    }

    .content{
        margin-left: 5px;
    }

    .box{
        width:100%;
        height:100%;
        word-wrap:break-word
    }

</style>