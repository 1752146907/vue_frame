<template>
    <div>
        <div class="content">
            <div class="content-sidebar">
                <div class="content-sidebar-item">所有商品</div>
                <div class="content-sidebar-item content-sidebar-item-active">妇女专列</div>
                <div class="content-sidebar-item">儿童专列</div>
                <div class="content-sidebar-item">理疗专列</div>
                <div class="content-sidebar-item">老人专列</div>
                <div class="content-sidebar-item">妇女专列</div>
                <div class="content-sidebar-item">儿童专列</div>
                <div class="content-sidebar-item">理疗专列</div>
                <div class="content-sidebar-item">老人专列</div>
                <div class="content-sidebar-item">妇女专列</div>
                <div class="content-sidebar-item">儿童专列</div>
                <div class="content-sidebar-item">理疗专列</div>
                <div class="content-sidebar-item">老人专列</div>
                <div class="content-sidebar-item">妇女专列</div>
                <div class="content-sidebar-item">儿童专列</div>
                <div class="content-sidebar-item">理疗专列</div>
                <div class="content-sidebar-item">老人专列</div>
                <div class="content-sidebar-item">妇女专列</div>
                <div class="content-sidebar-item">儿童专列</div>
                <div class="content-sidebar-item">理疗专列</div>
                <div class="content-sidebar-item">老人专列</div>
                <div class="content-sidebar-item">妇女专列</div>
                <div class="content-sidebar-item">儿童专列</div>
                <div class="content-sidebar-item">理疗专列</div>
                <div class="content-sidebar-item">老人专列</div>
            </div>
            <div class='content-product'>
                <div class="content-product-box">
                    <div class="content-product-item" bindtap="handleActive">
                        <div class='content-product-item-box-active'>
                            <div class='overlay'>
                                <van-icon class='success-active'
                                          name="success"
                                          color="#ffffff"
                                          size="40px"  />
                            </div>
                            <img class='content-product-item-image' src="../my/image/author.jpeg" />
                            <div class='content-product-item-name'>鱼肝油鱼肝油鱼肝油鱼肝油鱼肝油鱼肝油鱼肝油鱼肝油鱼肝油</div>
                            <div class='content-product-item-price'>￥298.00</div>
                        </div>
                    </div>
                    <div class="content-product-item" v-for="item in 10" :key="item">
                        <div class='content-product-item-box'>
                            <img class='content-product-item-image' src="../my/image/author.jpeg" />
                            <div class='content-product-item-name'>鱼肝油</div>
                            <div class='content-product-item-price'>￥298.00</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class='footer'>
            <div class='footer-box'>
                <div class='footer-box-left'>
                    <div class='footer-box-left-product'>已选：鱼肝油</div>
                    <div class='footer-box-left-price'>
                        价格：<span class='footer-box-left-price-text'>￥298.00</span>
                    </div>
                </div>
                <div class='footer-box-sublime'>发送给客户</div>
            </div>
        </div>
    </div>
</template>

<style src="./index.css" scoped></style>

<script>

    import mixins from '../../common/mixin';

    export default {
        components: {

        },
        mixins: [mixins],
        data: () => ({
            active: 1
        }),
        created() {

        },
        methods: {
            handleChat: function () {
                this.$router.push({
                    path: '/my/chat',
                    query: {}
                });
            },
            handleDel() {
                console.log("00000");
            }
        }
    }
</script>
