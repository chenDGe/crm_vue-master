<template>
  <div class="import_customers m98Auto paddingTB15">
    <div class="import_tip">*不选即导入到小组库</div>
    <el-select v-model="member_id" clearable placeholder="选择电话客服" class="maBot10" >
      <el-option
        v-for="item in memberOptions"
        :key="item.id"
        :label="item.realname"
        :value="item.id">
      </el-option>
    </el-select>
    <el-upload
      class="upload-demo maBot20"
      action="string"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :before-upload="beforeUpload"
      multiple
      :limit="1"
      :file-list="fileList"
      accept=".xls, .xlsx, .csv"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">(只能上传xls,xlsx,csv文件)</div>
    </el-upload>
    <el-link icon="el-icon-download" type="primary" @click="exportCustomer">下载示例模板</el-link>
  </div>
</template>

<script>
import { importCustomer } from '@/api/dhkfApi'
import { customerUser } from '@/api/user'
export default {
  name: 'Index',
  data() {
    return {
      fileList: [],
      member_id: '',
      memberOptions: []
    }
  },
  mounted() {
    this.customerUser()
  },
  methods: {
    customerUser() {
      const that = this
      return new Promise((resolve, reject) => {
        customerUser().then(res => {
          const { data } = res
          that.memberOptions = data
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    // handleExceed(files, fileList) {
    //   this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    // },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    beforeUpload(file) {
      const that = this
      const params = new FormData()
      params.append('file', file)
      params.append('member_id', that.member_id)
      return new Promise((resolve, reject) => {
        importCustomer(params).then(res => {
          const { msg } = res
          that.$notify.success({
            message: msg,
            duration: 1000
          })
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    exportCustomer() {
      window.location.href = 'https://www.summerclub.club/assets/demo.xls'
    }
  }
}
</script>

<style scoped lang="scss">
</style>
