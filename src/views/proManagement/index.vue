<template>
  <div class="pro_management m98Auto">
    <div class="pro_top_button">
      <el-button type="success" icon="el-icon-plus" size="small" @click="newPro('新增')">新增</el-button>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%;"
    >
      <el-table-column
        prop="id"
        label="ID"
        width="180"
        align="center"
      />
      <el-table-column
        prop="name"
        label="名字"
        align="center"
      />
      <el-table-column
        prop="address"
        label="操作"
        width="180"
        align="center"
      >
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="newPro('编辑',scope.$index)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pro_top_pagination">
      <!--      <el-pagination-->
      <!--        background-->
      <!--        :page-size="20"-->
      <!--        layout="total, prev, pager, next"-->
      <!--        :total="pagination.total"-->
      <!--      />-->
    </div>
    <!--  弹框-->
    <el-dialog :title="`${dialogTitle}`+ '项目'" width="500px" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" placeholder="输入项目名" clearable autocomplete="off" />
        </el-form-item>
        <el-form-item label="排序优先级" :label-width="formLabelWidth">
          <el-input v-model="form.level" type="number" autocomplete="off" min="0" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="proOk">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import { findPro, editPro } from '@/api/project'
export default {
  name: 'Index',
  data() {
    return {
      tableData: [],
      form: {
        name: '',
        level: 0
      },
      dialogFormVisible: false,
      formLabelWidth: '120px',
      dialogTitle: '' || '新增',
      param: {},
      pagination: {
        total: '' || 0
      }
    }
  },
  mounted() {
    this.selectPro()
  },
  // editPro
  methods: {
    newPro(title, row) {
      const that = this
      that.dialogFormVisible = true
      that.dialogTitle = title
      that.form.name = title === '编辑' ? that.tableData[row].name : ''
      that.param = { id: 0 || title === '编辑' ? that.tableData[row].id : '', name: that.form.name }
    },
    proOk() {
      const that = this
      that.dialogFormVisible = false
      that.param = Object.assign({}, that.param, that.form)
      return new Promise((resolve, reject) => {
        editPro(that.param).then(response => {
          that.selectPro()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    selectPro() {
      return new Promise((resolve, reject) => {
        const that = this
        findPro().then(response => {
          const { data } = response
          that.tableData = data.list
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .pro_management {
    .pro_top_pagination {
      padding: 20px 0;
    }
    .el-dialog {
      width: 500px;
    }
  }
</style>
