<template>
    <div class="main">

        <van-swipe :autoplay="13000"
                   :height="208">
            <van-swipe-item>
                <img src="http://s.amazeui.org/media/i/demos/pure-1.jpg" alt="">
            </van-swipe-item>
            <van-swipe-item>
                <img src="http://s.amazeui.org/media/i/demos/pure-3.jpg" alt="">
            </van-swipe-item>
        </van-swipe>

        <div class="lookup margin-top-10">
            <van-cell-group>
                <van-cell value="专业医生解答"
                          icon="info-o"
                          @click="handleAddProblem">
                    <template slot="title">
                        <span class="van-cell-text">快速提问</span>
                        <van-tag type="danger">限时免费</van-tag>
                    </template>
                </van-cell>
                <van-cell value="查擅长.看评价.选医生"
                          icon="search"
                          @click="handleDoctor">
                    <template slot="title">
                        <span class="van-cell-text">找医生</span>
                        <van-tag type="danger">实惠有效</van-tag>
                    </template>
                </van-cell>
                <van-cell icon="tosend"
                          @click="handleCategory">
                    <template slot="title">
                        <span class="van-cell-text">按科室找医生</span>
                    </template>
                </van-cell>
            </van-cell-group>
        </div>

        <div class="dynamic margin-top-10">
            <div class="dynamic-title">
                -- 就诊动态 --
            </div>
            <div class="dynamic-body">
                <van-swipe :autoplay="5000"
                           :duration="5200"
                           :height="278"
                           :touchable="false"
                           :show-indicators="false"
                           vertical>
                    <van-swipe-item>
                        <div class="dynamic-item" v-for="(item, index) in 7" :key="index">
                            <img src="./image/author.jpeg" class="dynamic-item-author" alt="">
                            <div class="dynamic-item-name text-truncate">王大锤{{index}}</div>
                            <div class="dynamic-item-content text-truncate">特别精神，跟打了兴奋剂一样晚上睡不着。</div>
                            <div class="dynamic-item-time text-truncate">2018/12/23</div>
                        </div>
                    </van-swipe-item>
                    <van-swipe-item>
                        <div class="dynamic-item" v-for="(item, index) in 7" :key="index">
                            <img src="./image/author.jpeg" class="dynamic-item-author" alt="">
                            <div class="dynamic-item-name text-truncate">王大锤{{index}}</div>
                            <div class="dynamic-item-content text-truncate">特别精神，跟打了兴奋剂一样晚上睡不着。</div>
                            <div class="dynamic-item-time text-truncate">2018/12/23</div>
                        </div>
                    </van-swipe-item>
                </van-swipe>
            </div>
            <!--<div class="dynamic-item" v-for="item in 6" :key="item">-->
                <!--<img src="./image/author.jpeg" class="dynamic-item-author" alt="">-->
                <!--<div class="dynamic-item-name text-truncate">王大锤</div>-->
                <!--<div class="dynamic-item-content text-truncate">特别精神，跟打了兴奋剂一样晚上睡不着。</div>-->
                <!--<div class="dynamic-item-time text-truncate">2018/12/23</div>-->
            <!--</div>-->
        </div>

        <div class="dynamic margin-top-10">
            <div class="dynamic-title">
                -- 患者好评 --
            </div>
            <div class="dynamic-body">
                <van-swipe :autoplay="5000"
                           :duration="5200"
                           :height="278"
                           :touchable="false"
                           :show-indicators="false"
                           vertical>
                    <van-swipe-item>
                        <div class="dynamic-item" v-for="(item, index) in 7" :key="index">
                            <img src="./image/author.jpeg" class="dynamic-item-author" alt="">
                            <div class="dynamic-item-name text-truncate">王大锤{{index}}</div>
                            <div class="dynamic-item-content text-truncate">特别精神，跟打了兴奋剂一样晚上睡不着。</div>
                            <div class="dynamic-item-time text-truncate">2018/12/23</div>
                        </div>
                    </van-swipe-item>
                    <van-swipe-item>
                        <div class="dynamic-item" v-for="(item, index) in 7" :key="index">
                            <img src="./image/author.jpeg" class="dynamic-item-author" alt="">
                            <div class="dynamic-item-name text-truncate">王大锤{{index}}</div>
                            <div class="dynamic-item-content text-truncate">特别精神，跟打了兴奋剂一样晚上睡不着。</div>
                            <div class="dynamic-item-time text-truncate">2018/12/23</div>
                        </div>
                    </van-swipe-item>
                </van-swipe>
            </div>
        </div>

        <Footer :active="0" />
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

console.log(this.$storage)
        },
        methods: {
            handleChat: function () {
                this.$router.push({
                    path: '/my/chat',
                    query: {}
                });
            },
            handleDoctor: function () {
                this.$router.push({
                    path: '/doctor/list',
                    query: {}
                });
            },
            handleCategory: function () {
                this.$router.push({
                    path: '/doctor/category',
                    query: {}
                });
            },
            handleAddProblem: function () {
                this.$router.push({
                    path: '/problem/index',
                    query: {}
                });
            },
            handleDel() {
                console.log("00000");
            }
        }
    }
</script>
