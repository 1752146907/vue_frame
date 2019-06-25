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
                        <BreadcrumbItem>商品收藏</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div class="title">
                    商品收藏
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
                          :model="goodsBookmark"
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
                                      prop="merchantId"
                                      :rules="[{
									  	required: false,
										message: '请输入商户编号'
									  }]">
                                <Input v-model="goodsBookmark.merchantId"
                                       type="text"
                                       placeholder="请输入商户编号"/>
                            </FormItem>
                            <FormItem label="产品编号"
                                      prop="productId"
                                      :rules="[{
									  	required: false,
										message: '请输入产品编号'
									  }]">
                                <Input v-model="goodsBookmark.productId"
                                       type="text"
                                       placeholder="请输入产品编号"/>
                            </FormItem>
                            <FormItem label="商品编号"
                                      prop="goodsId"
                                      :rules="[{
									  	required: true,
										message: '请输入商品编号'
									  }]">
                                <Input v-model="goodsBookmark.goodsId"
                                       type="text"
                                       placeholder="请输入商品编号"/>
                            </FormItem>
                            <FormItem label="会员编号"
                                      prop="memberId"
                                      :rules="[{
									  	required: true,
										message: '请输入会员编号'
									  }]">
                                <Input v-model="goodsBookmark.memberId"
                                       type="text"
                                       placeholder="请输入会员编号"/>
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
            'Page': Page
        },
        mixins: [mixin],
        data: () => ({
            isLoad: false,
            isEdit: false,
            goodsBookmark: {}
        }),
        mounted() {
            switch (this.$router.history.current.matched[0].path) {
                case '/goods/bookmark/add':

                    break;
                case '/goods/bookmark/edit/:goodsBookmarkId':
                    this.isEdit = true;

                    this.handleLoad();

                    break;
                default:
                    break;
            }
        },
        methods: {
            handleLoad: function () {
                this.isLoad = true;

                this.request({
                    url: '/ec/goods/bookmark/admin/v1/find',
                    data: {
                        goodsBookmarkId: this.$route.params.goodsBookmarkId
                    },
                    success: (response) => {
                        this.goodsBookmark = response.data;
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
                        var data = this.goodsBookmark;

                        this.request({
                            url: this.isEdit ? '/ec/goods/bookmark/admin/v1/update' : '/ec/goods/bookmark/admin/v1/save',
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
