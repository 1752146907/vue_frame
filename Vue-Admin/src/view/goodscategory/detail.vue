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
                        <BreadcrumbItem>商品分类</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div class="title">
                    商品分类
                </div>
                </Col>
                <Col :xs="24"
                     :sm="12"
                     :md="12"
                     :lg="12"
                     class="action">
                <Button class="action-margin"
                        custom-icon="iconfont icon-left-circle"
                        size="large"
                        @click="handleBack">
                    返回
                </Button>
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
                          :model="goodsCategory"
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
                            <FormItem label="分类名称"
                                      prop="goodsCategoryName"
                                      :rules="[{
									  	required: true,
										message: '请输入分类名称'
									  }]">
                                <Input v-model="goodsCategory.goodsCategoryName"
                                       type="text"
                                       placeholder="请输入分类名称"/>
                            </FormItem>
                            <FormItem label="上级分类编号"
                                      prop="goodsCategoryParentId">
                                <Select v-model="goodsCategory.goodsCategoryParentId"
                                        style="width:226px">
                                    <Option v-for="item in goodsCategoryParentArr" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="上传图片"
                                      prop="goodsCategoryImageId">
                                <imageUpload :number="1"
                                             v-if="goodsCategory.goodsCategoryImageId"
                                             @checkImageList = "handleUploadImageList"
                                             :settingOption="[{
                                                  imageId: goodsCategory.goodsCategoryImageId,
                                                  imagePath: goodsCategory.goodsCategoryImagePath
                                               }]"></imageUpload>
                                <imageUpload :number="1"
                                             v-if="!goodsCategory.goodsCategoryImageId"
                                             @checkImageList = "handleUploadImageList"></imageUpload>
                            </FormItem>
                            <FormItem label="排序"
                                      prop="goodsCategorySort"
                                      :rules="[{
									  	required: true,
										message: '请输入排序'
									  }]">
                                <InputNumber :min="0" v-model="goodsCategory.goodsCategorySort"></InputNumber>
                            </FormItem>
                            <FormItem label="简介"
                                      prop="goodsCategoryDescription"
                                      :rules="[{
									  	required: true,
										message: '请输入简介'
									  }]">
                                <Input v-model="goodsCategory.goodsCategoryDescription"
                                       type="textarea"
                                       placeholder="请输入简介"/>
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
    import {Row, Col, Breadcrumb, BreadcrumbItem, Button, Modal, Form, FormItem, Input, Table, InputNumber,  Page} from 'iview';

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
            'InputNumber': InputNumber,
            'Page': Page,
            imageUpload
        },
        mixins: [mixin],
        data: () => ({
            isLoad: false,
            isEdit: false,
            goodsCategory: {},
            productId: '',
            goodsCategoryParentArr: [
                // {
                //     value: 'New York',
                //     label: 'New York'
                // }
            ],
            model1: ''
        }),
        mounted() {
            this.productId = this.$storage.getProductId();
            this.handleCategoryTree();
            switch (this.$router.history.current.matched[0].path) {
                case '/goods/category/add':

                    break;
                case '/goods/category/edit/:goodsCategoryId':
                    this.isEdit = true;
                    this.handleLoad();

                    break;
                default:
                    break;
            }
        },
        methods: {
            handleUploadImageList: function (data) {
                this.goodsCategory.goodsCategoryImageId = data[0].imageId;
                this.goodsCategory.goodsCategoryImagePath = data[0].imagePath;
            },
            handleLoad: function () {
                this.isLoad = true;

                this.request({
                    url: '/ec/goods/category/admin/v1/find',
                    data: {
                        goodsCategoryId: this.$route.params.goodsCategoryId
                    },
                    success: (response) => {
                        this.goodsCategory = response.data;
                    },
                    error: (response) => {
                        this.$Message.error(response.message);
                    },
                    complete: () => {
                        this.isLoad = false;
                    }
                });
            },
            handleCategoryTree: function () {
                this.isLoad = true;

                this.request({
                    url: '/ec/goods/category/admin/v1/tree',
                    data: {
                        productId: this.productId
                    },
                    success: (response) => {
                        response.data.map((data, index) => {
                            this.goodsCategoryParentArr.push({
                                value: data.goodsCategoryId,
                                label: data.goodsCategoryName
                            });
                        })
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
                if (typeof(this.goodsCategory.goodsCategoryParentId) == 'undefined') {
                    this.goodsCategory.goodsCategoryParentId = '';
                }
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.goodsCategory.productId = this.productId;
                        var data = this.goodsCategory;
                        this.isLoad = false;

                        this.request({
                            url: this.isEdit ? '/ec/goods/category/admin/v1/update' : '/ec/goods/category/admin/v1/save',
                            data: data,
                            success: (response) => {
                                this.$Message.success(response.message);

                                this.handleBack();
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
