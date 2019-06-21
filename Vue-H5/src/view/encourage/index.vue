<template>
    <div class="encourage">
        <div class="header-top">
            <div class="header-top-content">
                <img class="doctor-avatar" src="http://s.amazeui.org/media/i/demos/bw-2014-06-19.jpg?imageView/1/w/1000/h/1000/q/80" />
                <div class="doctor-name">某钟</div>
                <div class="doctor-desc">谢谢医生的辛苦付出</div>
            </div>
        </div>
        <div class="give-money">
            <div class="give-money-title">请选择答谢金额</div>
            <div class="give-money-box">
                <div class="give-money-item-box"
                      bindtap="handleSelect">
                    <div class="give-money-item give-money-item-active">
                        <div class="give-money-item-text">8元</div>
                    </div>
                    <div class="give-money-item-desc give-money-item-desc-active">小小心意</div>
                </div>
                <div class="give-money-item-box"
                      bindtap="handleSelect">
                    <div class="give-money-item">
                        <div class="give-money-item-text">8元</div>
                    </div>
                    <div class="give-money-item-desc give-money-item-desc-active">小小心意</div>
                </div>
                <div class="give-money-item-box"
                      bindtap="handleSelect">
                    <div class="give-money-item">
                        <div class="give-money-item-text">8元</div>
                    </div>
                    <div class="give-money-item-desc give-money-item-desc-active">小小心意</div>
                </div>
                <div class="give-money-item-box"
                      bindtap="handleSelect">
                    <div class="give-money-item">
                        <div class="give-money-item-text">8元</div>
                    </div>
                    <div class="give-money-item-desc give-money-item-desc-active">小小心意</div>
                </div>
            </div>
            <div class="submit" bindtap='handleSublime'>完成</div>
            <div class="give-money-desc">答谢金会全部转入该医生的账户</div>
        </div>
        <div class="mind-list-wall">
            <div class="mind-list-wall-title">
                <div class="mind-list-wall-text">小钟钟医生的心意墙：</div>
            </div>
            <div class="mind-list-item">
                <span class="reward-name">11111111111</span>
                <img class="reward-img" src="../my/evaluate/image/evaluate-good-active.png" />
                <span class="reward-price">8元</span>
                <span class="reward-time">刚刚</span>
            </div>
            <div class="mind-list-item">
                <span class="reward-name">11111111111</span>
                <img class="reward-img" src="../my/evaluate/image/evaluate-good-active.png" />
                <span class="reward-price">8元</span>
                <span class="reward-time">刚刚</span>
            </div>
        </div>
    </div>
</template>

<style src="./index.css" scoped></style>

<script>

    import mixins from '../../common/mixin';

    export default {
        components: {},
        mixins: [mixins],
        data: () => ({}),
        created() {

        },
        methods: {
            handleDetail: function () {
                this.$router.push({
                    path: '/my/detail',
                    query: {}
                });
            },
            handleAdd: function () {
                this.$router.push({
                    path: '/archives/add',
                    query: {}
                });
            }
        }
    }
</script>
