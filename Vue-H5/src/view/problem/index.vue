<template>
	<div class="problem">
		<div class="body-content">
			<div class="body-content-handle">
				<van-field
						class="body-textarea"
						v-model="message"
						type="textarea"
						placeholder="请详细描述您的症状、疾病和身体状况，便于医生更准确的分析（10-500字），为保护您的隐私，请勿在咨询中透露您的真实姓名、手机号、微信号等信息"
						rows="1"
						:autosize="{minHeight:'170'}"
				/>
			</div>

			<div class="body-upload">
				<div class="body-upload-item"></div>
				<div class="body-upload-add">
					<van-uploader>
						<van-icon name="photograph"
								  color="#8e8e8e"
								  size="20px" />
					</van-uploader>
				</div>
				<div class="body-upload-text"> 上传相关图片(检查单、CT、病例、患处、药品等)，只有您和当前医生可见,我们会确保您的隐私安全</div>
			</div>
		</div>
		<div class="problem-footer"
			 @click="handleAdd">提交</div>
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

		}),
		created () {

		},
		methods: {
			handleDetail: function() {
				this.$router.push({
					path: '/my/detail',
					query: {}
				});
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
