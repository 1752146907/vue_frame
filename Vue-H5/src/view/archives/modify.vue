<template>
	<div class="archives">
		<van-cell-group>
			<div class="archives-item">
				<div class="archives-item-author">编辑档案</div>
			</div>
			<div class="archives-item">
				<div class="archives-item-author"><span class="star">*</span> 关系</div>
				<div class="archives-item-content">
					<input class="archives-item-content-input" placeholder="自己/父母/爱人/子女/其他" />
				</div>
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
			<div class="archives-item">
				<div class="archives-item-author"><span class="star">*</span> 身高</div>
				<div class="archives-item-content">
					<input class="archives-item-content-input"
						   type="number"
						   placeholder="请输入身高" />
				</div>
			</div>
			<div class="archives-item">
				<div class="archives-item-author"><span class="star">*</span> 体重</div>
				<div class="archives-item-content">
					<input class="archives-item-content-input"
						   type="number"
						   placeholder="请输入体重" />
				</div>
			</div>
			<div class="archives-item">
				<div class="archives-item-author"><span class="star">*</span> 是否喝酒</div>
				<div class="archives-item-content">
					<van-switch v-model="checked"
								size="20px"
								style="float: right"
								active-color="#b20004" />
				</div>
			</div>
			<div class="archives-item">
				<div class="archives-item-author"><span class="star">*</span> 是否抽烟</div>
				<div class="archives-item-content">
					<van-switch v-model="checked"
								size="20px"
								style="float: right"
								active-color="#b20004" />
				</div>
			</div>
			<div class="archives-item">
				<div class="archives-item-author"><span class="star">*</span> 大小便正常</div>
				<div class="archives-item-content">
					<van-switch v-model="checked"
								size="20px"
								style="float: right"
								active-color="#b20004" />
				</div>
			</div>
			<div class="archives-item">
				<div class="archives-item-author"><span class="star">*</span> 是否饮食规律</div>
				<div class="archives-item-content">
					<van-switch v-model="checked"
								size="20px"
								style="float: right"
								active-color="#b20004" />
				</div>
			</div>
			<div class="archives-item">
				<div class="archives-item-author"><span class="star">*</span> 是否有过敏史</div>
				<div class="archives-item-content">
					<van-switch v-model="checked"
								size="20px"
								style="float: right"
								active-color="#b20004" />
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
