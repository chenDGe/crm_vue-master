<template>
  <div class="label_management m98Auto">
    <div class="pro_top_button">
      <el-button type="success" icon="el-icon-plus" size="small" @click="newLabel('新增')">新增标签组</el-button>
    </div>
    <el-form label-position="top" label-width="80px" :model="formLabelAlign">
      <el-form-item v-for="(item, labelIndex) in labelData">
        <div slot="label" class="span-box">
          <span>{{ item.name }} </span>
          <i class="el-icon-edit lablePadding15" @click="newLabel('编辑', item)" />
<!--          <i class="el-icon-delete colorRed" />-->
        </div>
        <el-tag
          v-for="(tag, tagIndex) in item.detail"
          :key="tag.id"
          closable
          :disable-transitions="false"
          @close="handleClose(tag, labelIndex, tagIndex)"
        >
          {{ tag.name }}
        </el-tag>
        <el-input
          v-if="item.inputVisible"
          ref="saveTagInput"
          v-model="item.inputValue"
          v-focus
          class="input-new-tag"
          size="small"
          @keyup.enter.native="handleInputConfirm(labelIndex)"
          @blur="handleInputConfirm(labelIndex)"
        />
        <el-button v-else class="button-new-tag" size="small" @click="showInput(labelIndex)">+ 添加标签</el-button>
      </el-form-item>
    </el-form>
    <!--  弹框-->
    <el-dialog :title="`${dialogTitle}`+ '标签组'" width="550px" :visible.sync="dialogFormVisible">
      <el-form :model="labelForm">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="labelForm.name" placeholder="输入名称" clearable autocomplete="off" />
        </el-form-item>
        <el-form-item label="排序优先级" :label-width="formLabelWidth">
          <el-input v-model="labelForm.sort" type="number" autocomplete="off" min="0" />
        </el-form-item>
        <el-form-item label="编码" title="(&quot;客户来源&quot; 组要设为 &quot;CLIENT_SOURCE&quot;，“跟进状况” 组要设为 &quot;CLIENT_INFO_VALIDITY&quot;):" :label-width="formLabelWidth">
          <el-input v-model="labelForm.code" autocomplete="off" />
        </el-form-item>
        <el-form-item label="组内标签是否排他" title="使用时最多只能贴其中一个" :label-width="formLabelWidth">
          <el-checkbox v-model="labelForm.repeat_flag_as">是</el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="labelOk">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { indexLabel, saveLabel, addLabel, deleteLabel } from '@/api/lable'
export default {
  name: 'LabelManagement',
  directives: {
    // 注册一个局部的自定义指令 v-focus
    focus: {
      // 指令的定义
      inserted: function(el) {
        // 聚焦元素
        el.querySelector('input').focus()
      }
    }
  },
  data() {
    return {
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      },
      labelForm: {
        name: '',
        sort: 0,
        repeat_flag_as: true,
        repeat_flag: '',
        code: ''
      },
      labelData: [],
      dynamicTags: ['标签一', '标签二', '标签三'],
      dialogFormVisible: false,
      formLabelWidth: '150px',
      dialogTitle: '' || '新增'
    }
  },
  mounted() {
    this.indexLabel()
  },
  methods: {
    newLabel(title, itemData) {
      const that = this
      that.restParam()
      that.dialogFormVisible = true
      that.dialogTitle = title
      if (title === '编辑') {
        itemData['repeat_flag_as'] = !that.labelForm.repeat_flag
        that.labelForm = { ...itemData }
      }
    },
    handleClose(tag, labelIndex, tagIndex) {
      this.deleteLabel(this.labelData[labelIndex].detail[tagIndex].id)
    },

    showInput(labelIndex) {
      this.labelData[labelIndex].inputVisible = true
    },

    handleInputConfirm(labelIndex) {
      const inputValue = this.labelData[labelIndex].inputValue
      const labelData = this.labelData
      if (inputValue) {
        this.addLabel(labelData[labelIndex].id, inputValue)
      }
      this.labelData[labelIndex].inputVisible = false
      this.labelData[labelIndex].inputValue = ''
    },
    indexLabel() {
      const that = this
      return new Promise((resolve, reject) => {
        indexLabel().then(res => {
          const { data } = res
          data.forEach(item => {
            item['inputVisible'] = false
            item['inputValue'] = ''
          })
          that.labelData = data
          resolve()
        }).catch(err => {
          console.log(err)
          reject()
        })
      })
    },
    labelOk() {
      const that = this
      that.labelForm.repeat_flag = that.labelForm.repeat_flag_as ? 1 : 0
      return new Promise((resolve, reject) => {
        saveLabel(that.labelForm).then(res => {
          that.dialogFormVisible = false
          that.indexLabel()
          resolve()
        }).catch(err => {
          console.log(err)
          reject()
        })
      })
    },
    addLabel(pid, name) {
      const that = this
      return new Promise((resolve, reject) => {
        addLabel({ pid: pid, name: name }).then(res => {
          that.indexLabel()
        }).catch(err => {
          console.log(err)
          reject()
        })
      })
    },
    deleteLabel(id) {
      const that = this
      return new Promise((resolve, reject) => {
        deleteLabel({ id: id }).then(res => {
          that.indexLabel()
        }).catch(err => {
          console.log(err)
          reject()
        })
      })
    },
    restParam() {
      const that = this
      that.labelForm = {
        name: '',
        sort: 0,
        repeat_flag_as: true,
        repeat_flag: '',
        code: ''
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .label_management {
    .el-tag + .el-tag {
      margin-left: 10px;
    }
    .button-new-tag {
      margin-left: 10px;
      height: 32px;
      line-height: 30px;
      padding-top: 0;
      padding-bottom: 0;
    }
    .input-new-tag {
      width: 90px;
      margin-left: 10px;
      vertical-align: bottom;
    }
    .lablePadding15 {
      padding: 0 15px;
    }
  }
</style>
