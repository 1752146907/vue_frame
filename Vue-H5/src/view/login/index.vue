<template>
    <div>
        <div @click="showCodeDialog = !showCodeDialog">登陆</div> 
        <!-- showCodeDialog是一个布尔值，当前页面点击按钮，修改它，子组件监听数据变化，加载滑动模块 -->
        <Geet :isGeet="showCodeDialog" @geetPath="GeetPath" @clickChange="GeetChange"></Geet>
    </div>
</template>

<style src="./index.css" scoped></style>

<script>

    import mixins from '../../common/mixin';
    import Geet from "./Geet.vue";

    export default {
        components: {
            Geet
        },
        mixins: [mixins],
        data: () => ({
            showCodeDialog: false   // 极速校验
        }),
        created() {

        },
        methods: {
             // 图形验证码
            handleSlideVerify: function () {
                this.showCodeDialog = !this.showCodeDialog;
                window.scrollTo(0, 0);
            },
            GeetChange(val) {   // 极验图片加载之后，通过更改控制变量实现可以再次加载
                this.showCodeDialog = val;
            },
            GeetPath(val) {     // 接受到图形验证参数，将参数发往服务端进行验证
                // 校验通过
                this.showCodeDialog = false;
                alert("校验通过")
            },
        }
    }
</script>
