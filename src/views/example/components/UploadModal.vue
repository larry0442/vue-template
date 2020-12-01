<template>
  <a-modal
    destroyOnClose
    centered
    :visible="visible"
    :title="title"
    :width="640"
    @ok="handleSubmit"
    @cancel="handleClose"
  >
    <a-spin :spinning="confirmLoading">
      <a-upload
        action="https://upload-z2.qiniup.com"
        list-type="picture-card"
        :data="uploadData"
        :file-list="fileList"
        @preview="handlePreview"
        :beforeUpload="beforeUpload"
        @change="handleChange"
        name="file"
       >
        <div v-if="fileList.length < 8">
          <a-icon type="plus" />
          <div class="ant-upload-text">Upload</div>
        </div>
      </a-upload>
      <a-modal
        :visible="previewVisible"
        :footer="null"
        @cancel="handleCancel"
      >
        <img
          alt="example"
          style="width: 100%"
          :src="previewImage"
        />
      </a-modal>
    </a-spin>
  </a-modal>
</template>
<script>
import { fetchUploadToken } from '../../../services/file';

const md5 = require('md5');

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  name: 'AddForm',
  props: {
    visible: {
      required: true,
      type: Boolean,
      default: false,
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
    sourceData: {
      type: [Object, Array],
      default: () => ({}),
    },
  },
  data() {
    return {
      confirmLoading: false,
      form: this.$form.createForm(this),
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
      currentRecord: {},
      previewVisible: false,
      previewImage: '',
      fileList: [],
      uploadData: {},
    };
  },
  computed: {
    title() {
      return this.isEdit ? '编辑' : '新增';
    },
  },
  watch: {
    visible(newVal) {
      if (newVal && this.isEdit) {
        this.getDetail();
      }
    },
  },
  methods: {
    getUploadToken() {
      return fetchUploadToken().then((res) => { this.uploadData = res.data; });
    },
    async beforeUpload(file) {
      console.log(file);
      const arr = file.name.split('.');
      const filename = `${arr[0] + md5(arr[0]) + md5(new Date(0))}.${arr[1]}`;
      await this.getUploadToken();
      this.uploadData.key = filename;
      return true;
    },
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        // eslint-disable-next-line
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      this.fileList = fileList;
    },
    getDetail() {
    },
    handleClose() {
      this.$emit('refresh');
      this.$emit('close');
    },
    handleSubmit() {},
  },
};
</script>
<style>
</style>
