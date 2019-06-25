<template>
    <div>
        <div class="header">
            <Row type="flex"
                 align="middle">
                <Col :xs="24"
                     :sm="12"
                     :md="12"
                     :lg="12">
                <div class="breadcrumb">
                    <Breadcrumb>
                        <BreadcrumbItem>首页</BreadcrumbItem>
                        <BreadcrumbItem>网店</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div class="title">
                    网店
                </div>
                </Col>
                <Col :xs="24"
                     :sm="12"
                     :md="12"
                     :lg="12"
                     class="action">
                <a-radio-button class="action-margin"
                        custom-icon="iconfont icon-left-circle"
                        size="large"
                        @click="handleBack">
                    返回
                </a-radio-button>
                <Button type="primary"
                        custom-icon="iconfont icon-check-circle"
                        size="large"
                        :loading="isLoad"
                        @click="handleSubmit">
                    提交
                </Button>
                </Col>
            </Row>
        </div>
        <div class="main">
            <div class="content">
                <Spin fix
                      v-if="isLoad"
                      size="large"/>
                <div class="tab">
                    <div class="tab-title">
                        基本信息
                    </div>
                    <Form ref="form"
                          :model="shop"
                          class="tab-form"
                          :label-width="100"
                          @keydown.native.enter.prevent="handleSubmit">
                        <Row class="tab-form-row"
                             type="flex"
                             align="middle">
                            <Col :xs="24"
                                 :sm="12"
                                 :md="12"
                                 :lg="8">
                            <FormItem label="商户编号"
                                      prop="shopId"
                                      v-if="false"
                                      :rules="[{
									  	required: false,
										message: '请输入商户编号'
									  }]">
                                <Input v-model="shop.shopId"
                                       type="text"
                                       :disabled="true"
                                       placeholder="请输入商户编号"/>
                            </FormItem>
                            <FormItem label="名称"
                                      prop="shopName"
                                      :rules="[{
									  	required: true,
										message: '请输入名称'
									  }]">
                                <Input v-model="shop.shopName"
                                       type="text"
                                       placeholder="请输入名称"/>
                            </FormItem>
                            <FormItem label="编码"
                                      prop="shopCode"
                                      :rules="[{
									  	required: true,
										message: '请输入编码'
									  }]">
                                <Input v-model="shop.shopCode"
                                       type="text"
                                       placeholder="请输入编码"/>
                            </FormItem>
                            <FormItem label="上传图片"
                                      prop="shopLogoPath"
                                      :rules="[{
									  	required: true,
										message: '请上传图片'
									  }]">
                                <imageUpload :number="1"
                                             v-if="shop.shopLogoPath"
                                             @checkImageList = "handleUploadImageList"
                                             :settingOption="[{
                                                  imageId: shop.shopLogoId,
                                                  imagePath: shop.shopLogoPath
                                               }]"></imageUpload>
                                <imageUpload :number="1"
                                             v-if="!shop.shopLogoPath"
                                             @checkImageList = "handleUploadImageList"></imageUpload>
                            </FormItem>
                            <FormItem label="简介"
                                      prop="shopDescription"
                                      :rules="[{
									  	required: true,
										message: '请输入简介'
									  }]">
                                <Input v-model="shop.shopDescription"
                                       type="text"
                                       placeholder="请输入简介"/>
                            </FormItem>
                            <FormItem label="负责人QQ"
                                      prop="shopManagerQQ"
                                      :rules="[{
									  	required: true,
										message: '请输入负责人QQ'
									  }]">
                                <Input v-model="shop.shopManagerQQ"
                                       type="text"
                                       placeholder="请输入负责人QQ"/>
                            </FormItem>
                            <FormItem label="负责人手机"
                                      prop="shopManagerMobile"
                                      :rules="[{
									  	required: true,
										message: '请输入负责人手机号码'
									  }]">
                                <Input v-model="shop.shopManagerMobile"
                                       type="text"
                                       placeholder="请输入负责人手机号码"/>
                            </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        </div>
    </div>
</template>

<style src="./detail.css" scoped></style>

<script>
    import {Row, Col, Breadcrumb, BreadcrumbItem, Button, Modal, Form, FormItem, Input, Table,  Page} from 'iview';

    import mixin from '../../common/mixin';
    import imageUpload from '../../component/imageUpload';

    export default {
        components: {
            'Row': Row,
            'Col': Col,
            'Breadcrumb': Breadcrumb,
            'BreadcrumbItem': BreadcrumbItem,
            'Button': Button,
            'Modal': Modal,
            'Form': Form,
            'FormItem': FormItem,
            'Input': Input,
            'Table': Table,
            'Page': Page,
            imageUpload
        },
        mixins: [mixin],
        data: () => ({
            isLoad: false,
            isEdit: false,
            productId: "",
            shop: {}
        }),
		mounted() {
            this.handleActiveMenu('/shop/edit');

            this.productId = this.$storage.getProductId();
            switch (this.$router.history.current.matched[0].path) {
                case '/shop/add':

                    break;
                case '/shop/edit':
                    this.isEdit = true;

                    this.handleLoad();

                    break;
                default:
                    break;
            }
        },
        methods: {
            handleUploadImageList: function (data) {
                this.shop.shopLogoId = data[0].imageId;
                this.shop.shopLogoPath = data[0].imagePath;
            },
            handleLoad: function () {
                this.isLoad = true;

                this.request({
                    url: '/ec/shop/admin/v1/find',
                    data: {
                        productId: this.productId
                    },
                    success: (response) => {
                        this.shop = response.data;
                    },
                    error: (response) => {
                        this.$Message.error(response.message);
                    },
                    complete: () => {
                        this.isLoad = false;
                    }
                });
            },
            handleSubmit: function () {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        var data = {
                            shopId: this.shop.shopId,
                            shopName: this.shop.shopName,
                            shopLogoId: this.shop.shopLogoId,
                            shopLogoPath: this.shop.shopLogoPath,
                            shopManagerQQ: this.shop.shopManagerQQ,
                            shopDescription: this.shop.shopDescription,
                            shopManagerMobile: this.shop.shopManagerMobile,
                            systemVersion: this.shop.systemVersion
                        };

                        this.request({
                            url: this.isEdit ? '/ec/shop/admin/v1/update' : '/ec/shop/admin/v1/save',
                            data: data,
                            success: (response) => {
                                this.$Message.success(response.message);

                                this.handleLoad();
                            },
                            error: (response) => {
                                this.$Message.error(response.message);
                            },
                            complete: () => {
                                this.isLoad = false;
                            }
                        });
                    }
                });
            }
        }
    }
</script>
