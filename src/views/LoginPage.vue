<template>
    <div class="container">
<!--        登录-->
        <Login></Login>
<!--        注册-->
        <Register></Register>


    </div>
</template>

<script>
    import Login from "../components/Login";
    import Register from "../components/Register";
    export default {
        name: "LoginPage",
        components:{
            Login,
            Register
        }
    }
</script>

<style scoped>
    html{
        width: 100%;
        height: 100%;
    }

    .container {
        width: 100%;
        height: 100%;
    }

</style>