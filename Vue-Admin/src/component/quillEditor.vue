<template>
    <div>
        <quill-editor v-model="htmlForEditorValue"
                      ref="myQuillEditor"
                      :options="editorOption"
                      @change="onEditorChange($event)">
        </quill-editor>


        <Modal title="预览结果"
               v-model="visible">
            <img :src="previewImageUrl" v-if="visible" style="width: 100%">
        </Modal>
        <Modal  v-model="myUpload"
                title="我的上传"
                width="1000"
                loading
                scrollable>
            <Row type="flex">
                <Col span="4"
                     :xs="4"
                     :sm="4"
                     :md="3"
                     :lg="3"
                     v-for="(item, index) in checkList"
                     :key="index">
                <div class="upload-list"
                     v-on:click.stop="handleCheck(index)">
                    <div class="upload-list-img" :style="'background: url(' + item.filePath +')'"></div>
                    <div class="upload-list-cover"
                         v-if="!item.isCheck">
                        <div class="padding-top-22">
                            <Icon type="ios-eye-outline"
                                  size="22"
                                  v-on:click.stop="handleView(item.filePath)" />
                            <Icon type="ios-trash-outline"
                                  size="20"
                                  v-on:click.stop="handleRemove(item.fileId)" />
                        </div>
                    </div>
                    <div class="upload-list-shadow"
                         v-if="item.isCheck"></div>
                    <Icon class="icon-chack"
                          color="#ffffff"
                          v-if="item.isCheck"
                          type="md-checkmark-circle-outline"
                          size="38" />
                </div>
                </Col>
                <Spin size="large" fix v-if="isLoad"></Spin>
            </Row>
            <div slot="footer"
                 class="modal-footer">
                <div class="footer-left">
                    <Upload :before-upload="handleBeforeUpload"
                            :action="application.imageHost"
                            style="display: inline-block;width:102px;margin-right: 10px;">
                        <Button icon="ios-cloud-upload-outline"
                                @click="handleBeforeUploadButtom(0)">上传图片</Button>
                    </Upload>
                    <Upload :before-upload="handleBeforeUpload"
                            :action="application.imageHost"
                            style="display: inline-block;width:102px;">
                        <Button icon="ios-cloud-upload-outline"
                                @click="handleBeforeUploadButtom(1)">上传原图</Button>
                    </Upload>
                </div>
                <div class="footer-right">
                    <Button icon="ios-close-circle-outline"
                            @click="handleCancel">取消</Button>
                    <Button type="primary"
                            icon="ios-checkmark-circle-outline"
                            @click="handleOk">确定</Button>
                </div>
            </div>
            <Page class="page"
                  :page-size="32"
                  @on-change="handlePage"
                  :total="totalPage"
                  show-total />
        </Modal>

        <Modal v-model="deleteTips"
               title="确认提示"
               @on-ok="handleDelteImage"
               @on-cancel="modalcancel">
            <p>确定删除该图片吗？</p>
        </Modal>
    </div>
</template>

<style>
    .ql-editor{
        height: 400px;
    }
    .icon-chack{
        position: absolute;
        top: 26px;
        left: 0;
        right: 0;
    }
    .upload-list-shadow{
        position: absolute;
        top: 6px;
        right: 6px;
        bottom: 6px;
        left: 6px;
        background: rgba(0,0,0,.4);
    }
    .padding-top-22{
        padding-top: 22px;
    }
    .upload-list{
        display: inline-block;
        width: 94px;
        height: 94px;
        padding: 6px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #ffffff;
        position: relative;
        border: solid 1px rgba(0,0,0,.2);
        margin-right: 4px;
        position: relative;
    }
    .upload-list-img{
        width: 80px;
        height: 80px;
        background-size: contain !important;
        background-repeat: no-repeat !important;
        background-position: 50% !important;
    }
    .upload-list-cover{
        display: none;
        position: absolute;
        top: 6px;
        bottom: 6px;
        left: 6px;
        right: 6px;
        background: rgba(0,0,0,.6);
        cursor: pointer;
    }
    .upload-list:hover .upload-list-cover{
        display: block;
    }
    .upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 30px 4px 0px 4px;
    }
    .upload-list-add{
        padding-top: 26px;
        font-size: 14px;
        cursor: pointer;
        line-height: 20px !important;
        background-color: #fbfbfb !important;
        border: 1px dashed #d9d9d9 !important;
    }
    .page{
        text-align: right;
        margin-top: 16px;
    }
    .modal-footer{
        display: flex;
        flex-direction: row;
    }
    .footer-left{
        flex: 1;
        text-align: left;
    }
    .footer-right{
        flex: 1;
    }
</style>

<script>
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'

    import { quillEditor } from 'vue-quill-editor'
    import Quill from 'quill';
    import ImageCompressor from 'image-compressor.js';
    import mixin from '../common/mixin';

    export default {
        components: {
            quillEditor,
            Quill,
            ImageCompressor
        },
        props: {
            html: {
                type: String,
                required: false
            }
        },
        mixins: [mixin],
        data: () => ({
            isLoad: false,
            editorOption: {
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],
                        ['blockquote', 'code-block'],
                        [{ 'header': 1 }, { 'header': 2 }],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        [{ 'script': 'sub' }, { 'script': 'super' }],
                        [{ 'indent': '-1' }, { 'indent': '+1' }],
                        [{ 'direction': 'rtl' }],
                        [{ 'size': ['small', false, 'large', 'huge'] }],
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                        [{ 'font': [] }],
                        [{ 'color': [] }, { 'background': [] }],
                        [{ 'align': [] }],
                        ['link', 'image', 'video'],
                        ['clean']
                    ]
                },
                placeholder: "请输入您的内容..."
            },
            htmlForEditorValue: '',
            deleteTips: false,
            viewImageList: [],
            checkList: [],
            previewImageUrl: '',
            myUpload: false,
            visible: false,
            base64String: "",
            fileOriginalName: "",
            pageIndex: 1,
            pageSize: 32,
            quality: 0,
            totalPage: 0,
            deleteFileId: ''
        }),
        mounted () {
            if (this.html) {
                this.htmlForEditorValue = this.html;
            }

            console.log(this.html)

            //  点击图片自定义事件
            this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('image', this.handleAddImage);
        },
        methods: {
            onEditorChange(e) {
                this.htmlForEditorValue = e.html;
                this.$emit('htmlForEditorValue', this.htmlForEditorValue)
            },
            handlePage (events) {
                this.pageIndex = events;
                this.handleImageList();
            },
            handleDelteImage () {
                this.isLoad = true;
                this.request({
                    url: this.application.imageHost + '/module/file/admin/v1/delete',
                    data: {
                        fileIdList: [this.deleteFileId],
                    },
                    success: (data) => {
                        this.deleteTips = false;
                        this.isLoad = false;
                        this.$Message.success("删除成功");
                        this.handleImageList();
                    },
                    error: (response) => {
                        this.isLoad = false;
                    },
                    complete: () => {

                    }
                });
            },
            modalcancel () {
                this.deleteTips = false;
            },
            handleAddImage () {
                this.myUpload = true;
                this.handleImageList();
            },
            handleView (filePath) {
                this.previewImageUrl = filePath;
                this.visible = true
            },
            handleBeforeUploadButtom (index) {
                this.quality = index;
            },
            handleBeforeUpload (file) {
                if (file) {
                    if (!/\.(jpeg|jpe|jpg|gif|png|webp)$/i.test(file.name)) {
                        this.$Message.success('图片格式不对');
                    }
                }
                if (file.size > 1024 * 1024 * 5) {
                    this.$Message.success('图片大小不能超过5M');

                    return false;
                }

                this.isLoad = true;
                new ImageCompressor(file, {
                    success: (result) => {
                        quality: this.quality;
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            let base64String = e.currentTarget.result;
                            this.request({
                                url: this.application.imageHost + '/module/file/admin/v1/image/base64/upload',
                                data: {
                                    base64String: base64String,
                                    fileOriginalName: file.name
                                },
                                success: (response) => {
                                    this.handleImageList();
                                    this.$Message.success("上传成功");
                                },
                                error: (response) => {
                                    this.isLoad = false;

                                    this.$Message.error("上传失败");
                                },
                                complete: () => {

                                }
                            });
                        }

                        reader.readAsDataURL(result);
                    }
                })
                return false;
            },
            handleImageList () {
                this.request({
                    url: this.application.imageHost + '/module/file/admin/v1/image/list',
                    data: {
                        pageIndex: this.pageIndex,
                        pageSize: this.pageSize
                    },
                    success: (data) => {
                        for(let i = 0; i < data.data.list.length; i++) {
                            data.data.list[i].filePath = this.application.imageHost +  data.data.list[i].filePath;
                            data.data.list[i].isCheck = false;
                        }
                        this.checkList = data.data.list;
                        this.totalPage = data.data.total;
                        this.isLoad = false;
                    },
                    error: (response) => {
                        this.isLoad = false;
                    },
                    complete: () => {

                    }
                });
            },
            handleRemove (fileId) {
                this.deleteTips = true;
                this.deleteFileId = fileId;
            },
            handleOk () {
                for(let i = 0; i < this.checkList.length; i++) {
                    if(this.checkList[i].isCheck ) {
                        this.htmlForEditorValue += "<img src=" +  this.checkList[i].filePath + ">"
                        this.checkList[i].isCheck = false;
                    }
                }
                this.myUpload = false;
            },
            handleCancel () {
                this.myUpload = false;
            },
            handleCheck (index) {
                if (this.checkList[index].isCheck) {
                    this.checkList[index].isCheck = false;
                } else {
                    this.checkList[index].isCheck = true;
                }
            }
        }
    }
</script>
