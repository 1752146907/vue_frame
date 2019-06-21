<template>
    <div>
        <div class="chat">
            <!--<div class="no-data">-->
            <!--<img src="../../image/empty.svg" class="no-data-image-icon" />-->
            <!--<div class="no-data-text">当前没有数据</div>-->
            <!--</div>-->
            <div v-for="item in 12" :key="item" @click="handleChat">
                <van-swipe-cell :right-width="66">
                    <van-cell-group>
                        <div class="chat-item">
                            <div class="chat-item-left">
                                <img src="./image/author.jpeg" class="chat-item-imges" alt="头像"/>
                                <span class="badge">7</span>
                            </div>
                            <div class="chat-item-info">
                                <div class="chat-item-name">Mr.Li</div>
                                <div class="chat-item-content">
                                    喜欢的依然喜欢，只是学会了隐藏。不喜欢的依然不喜欢，只是学会了面对。
                                </div>
                            </div>
                            <div class="chat-item-right">
                                2028年10月22日
                            </div>
                        </div>
                    </van-cell-group>
                    <div slot="right"
                         class="chat-item-del"
                         @click="handleDel(11111)">删除</div>
                </van-swipe-cell>
            </div>
        </div>

        <Footer :active="1" />
    </div>
</template>

<style src="./index.css" scoped></style>

<script>

    import mixins from '../../common/mixin';
    import Footer from '../../component/footer';

    export default {
        components: {
            'Footer': Footer
        },
        mixins: [mixins],
        data: () => ({

        }),
        created() {

        },
        methods: {
            handleChat: function () {
                this.$router.push({
                    path: '/chat/chat',
                    query: {}
                });
            },
            handleDel() {
                console.log("00000");
            }
        }
    }
</script>
