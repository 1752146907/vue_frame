<template>
    <div>
        <router-link  to="/">
            <div class="doctor-item">
                <img class="chat-item-author-image"
                       src="http://img5.imgtn.bdimg.com/it/u=745294792,745980739&fm=26&gp=0.jpg" />
                <div class="doctor-item-name text-truncate">
                    <span>赵云</span>
                    <span class="doctor-item-name-category">长坂坡之战</span>
                </div>
                <div class="doctor-item-name-category-state">
                    <span class="category-state">状态：待评价</span>
                    <span class="category-state">0.01元/次</span>
                </div>
            </div>
        </router-link>
        <div class="evaluate">
            <div class="evaluate-box">
                <van-field
                        class="evaluate-field"
                        type="textarea"
                        placeholder="请输入内容..."
                        :autosize="{minHeight:'170'}"
                />
                <div class="evaluate-fooder">
                    <span class="evaluate-fooder-item evaluate-fooder-item-active">
                        <img class="evaluate-fooder-item-icon"
                             src="./image/evaluate-good-active.png" alt="">
                        好评
                    </span>
                    <span class="evaluate-fooder-item">
                        <img class="evaluate-fooder-item-icon"
                             src="./image/evaluate-content.png" alt="">
                        中评
                    </span>
                    <span class="evaluate-fooder-item">
                        <img class="evaluate-fooder-item-icon"
                             src="./image/evaluate-diff.png" alt="">
                        差评
                    </span>
                </div>
            </div>
        </div>
        <div class="evaluate-footer">提交</div>
    </div>
</template>

<style src="./evaluate.css" scoped></style>

<script>

    import mixins from '../../../common/mixin';

    export default {
        components: {

        },
        mixins: [mixins],
        data: () => ({

        }),
        created () {

        },
        methods: {

        }
    }
</script>
