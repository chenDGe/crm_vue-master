<template>
  <div class="pro_management m98Auto">
    <div class="pro_top_button">
      <el-button type="success" icon="el-icon-plus" size="small" @click="newRule('新增')">新增</el-button>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%;"
    >
      <el-table-column
        prop="id"
        label="ID"
        width="80"
        align="center"
      />
      <el-table-column
        prop="name"
        label="分类名称"
        align="center"
        width="200px"
      />
      <el-table-column
        prop="rule"
        label="规则"
        align="center"
      />
      <el-table-column
        prop="address"
        label="操作"
        width="180"
        align="center"
      >
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="newRule('编辑', scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pro_top_pagination" />
    <!--  弹框-->
    <el-dialog :title="`${dialogTitle}`+ '客户分类规则'" width="500px" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" placeholder="请输入名称" />
        </el-form-item>
        <!--        <el-form-item label="排序优先级" :label-width="formLabelWidth">-->
        <!--          <el-input v-model="form.sort" autocomplete="off" />-->
        <!--        </el-form-item>-->
        <el-form-item label="标签规则" :label-width="formLabelWidth">
          <el-cascader
            v-model="form.rule_as"
            :props="defaultProp"
            :options="options"
            clearable
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="ruleOk">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { indexRule, saveRule, detailRule } from '@/api/rule'
import { indexLabel } from '@/api/lable'
export default {
  name: 'Index',
  data() {
    return {
      tableData: [],
      options: [
        {
          id: '&',
          name: '且',
          value: '&',
          detail: []
        },
        {
          id: '|',
          name: '或',
          value: '|',
          detail: []
        }
      ],
      defaultProp: {
        value: 'id',
        label: 'name',
        children: 'detail',
        multiple: true
      },
      form: {
        name: '',
        rule_as: [],
        rule: ''
      },
      formLabelWidth: '120px',
      dialogTitle: '' || '新增',
      dialogFormVisible: false,
      checked: false
    }
  },
  mounted() {
    this.indexRule()
    this.indexLabel()
  },
  methods: {
    newRule(title, item) {
      this.dialogFormVisible = true
      this.dialogTitle = title
      if (title === '编辑') {
        this.form = { ...item }
      }
    },
    indexRule() {
      const that = this
      return new Promise((resolve, reject) => {
        indexRule().then(res => {
          const { data } = res
          that.tableData = data
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    indexLabel() {
      const that = this
      return new Promise((resolve, reject) => {
        indexLabel().then(res => {
          const { data } = res
          that.options.forEach(item => {
            item.detail = data
          })
          console.log(that.options)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    ruleOk() {
      const that = this
      return new Promise((resolve, reject) => {
        that.form.rule_as.map(item => { item.splice(1, 1) })
        that.form.rule = that.form.rule_as.toString().replace(/,/g, '').substr(1)
        saveRule(that.form).then(res => {
          const { msg } = res
          that.dialogFormVisible = false
          that.$notify.success({
            message: msg
          })
          that.indexRule()
          that.restParam()
          resolve()
        }).catch(err => {
          that.restParam()
          reject(err)
        })
      })
    },
    restParam() {
      const that = this
      that.form = {
        name: '',
        rule_as: [],
        rule: ''
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .pro_management {
    .pro_top_pagination {
      padding: 20px 0;
    }
  }
</style>
