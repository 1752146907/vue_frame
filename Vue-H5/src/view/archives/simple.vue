<template>
	<div class="archives">
		<van-cell-group>
			<div class="archives-item">
				<div class="archives-item-author">填写档案</div>
			</div>
			<div class="archives-item">
				<div class="archives-item-author"><span class="star">*</span> 性别</div>
				<div class="archives-item-content">
					<input class="archives-item-content-input" placeholder="请输入用户名" />
				</div>
			</div>
			<div class="archives-item">
				<div class="archives-item-author"><span class="star">*</span> 性别</div>
				<div class="archives-item-content">
					<span>
						<van-icon color="#b20004"
								  style="position: relative;top: 1px;"
								  name="passed" /> 男
					</span>
					<span class="archives-item-content-sex">
						<van-icon name="passed"
								  style="position: relative;top: 1px;"  /> 女
					</span>
					<span class="archives-item-content-sex">
						<van-icon name="passed"
								  style="position: relative;top: 1px;"  /> 保密
					</span>
				</div>
			</div>
			<div class="archives-item">
				<div class="archives-item-author"><span class="star">*</span> 出生时间</div>
				<div class="archives-item-content"
					 @click="handleCheckDate">
					<input class="archives-item-content-input"
						   v-model="birthday"
						   placeholder="请输入出生时间"
						   />
				</div>
			</div>
		</van-cell-group>

		<van-datetime-picker
				class="date-time-picker"
				v-if="isCheckDate"
				v-model="currentDate"
				type="date"
				:min-date="minDate"
				:max-date="maxDate"
				@confirm="handleSelectData"
				@cancel="handleCloseDate"
		/>
		<div class="mask"
			 @click="handleCloseDate"
			 v-if="isCheckDate"></div>

		<div class="archives-footer"
			 @click="handleAdd">新增</div>
	</div>
</template>

<style src="./add.css" scoped></style>

<script>

    import mixins from '../../common/mixin';
    import util from '../../common/util';

    export default {
        components: {

        },
        mixins: [mixins],
        data: () => ({
            checked: true,
			isCheckDate: false,
            currentDate: new Date(2000, 0, 1),
			minDate: new Date(1970, 0, 1),
            maxDate: new Date(),
            birthday: ''
        }),
        created () {

        },
        methods: {
            handleCheckDate: function () {
                this.isCheckDate = true;
			},
            handleCloseDate: function () {
                this.isCheckDate = false;
			},
            handleSelectData: function(value) {
                this.isCheckDate = false;
                this.birthday = util.timeToYMD(value);
            },
            handleAdd: function() {
                this.$router.push({
                    path: '/archives/add',
                    query: {}
                });
            }
        }
    }
</script>
