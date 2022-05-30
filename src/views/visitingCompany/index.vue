<template>
  <div class="pro_management m98Auto">
    <div class="pro_top_button">
      <el-button type="success" icon="el-icon-plus" size="small" @click="newVisiting('新增')">新增</el-button>
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
        prop="members"
        label="经理"
        align="center"
      />
      <el-table-column
        prop="address"
        label="操作"
        width="180"
        align="center"
      >
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="newVisiting('编辑',scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pro_top_pagination">
      <el-pagination
        background
        :page-size="pageTotal.page_size"
        layout="total,prev, pager, next"
        :total="pageTotal.total"
        @current-change="selectVisitor"
      />
    </div>
    <!--  弹框-->
    <el-dialog :title="`${dialogTitle}`" width="500px" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" placeholder="输入名称" />
        </el-form-item>
        <el-form-item label="排序优先级" :label-width="formLabelWidth">
          <el-input v-model="form.sort" autocomplete="off" min="0" type="number" placeholder="输入排序" />
        </el-form-item>
        <el-form-item label="经理" :label-width="formLabelWidth">
          <el-tree
            ref="tree"
            :data="data"
            show-checkbox
            node-key="id"
            :props="defaultProps"
            @check-change="handleCheckChange"
          />
          <el-select v-model="form.member_ids" multiple placeholder="请选择员工">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.realname"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="visitingOk">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { findVisitor, saveVisitor } from '@/api/visiting'
import { findDepartment, usersDepartment } from '@/api/depart'

export default {
  name: 'Index',
  data() {
    return {
      data: [],
      tableData: [],
      defaultProps: {
        children: 'child',
        label: 'name',
        multiple: true
      },
      form: {
        name: '',
        sort: 0,
        member_ids: ''
      },
      pageTotal: {
        total: 0,
        total_page: 0,
        page_size: 10
      },
      options: [],
      dialogTitle: '' || '新建',
      dialogFormVisible: false,
      formLabelWidth: '100px'
    }
  },
  mounted() {
    this.selectVisitor()
    this.findDepartment()
  },
  methods: {
    newVisiting(title, item) {
      this.dialogFormVisible = true
      this.dialogTitle = title
      this.form = { ...item }
    },
    selectVisitor(current) {
      return new Promise((resolve, reject) => {
        const that = this
        findVisitor({ page: current }).then(response => {
          const { data } = response
          that.tableData = data.list
          that.pageTotal.total = data.total
        }).catch(err => {
          reject(err)
        })
      })
    },
    visitingOk() {
      return new Promise((resolve, reject) => {
        const that = this
        that.form.member_ids = that.form.member_ids.toString()
        saveVisitor(that.form).then(res => {
          this.dialogFormVisible = false
          that.restParam()
          that.selectVisitor()
        }).catch(err => {
          console.log(err)
          reject()
        })
      })
    },
    findDepartment() {
      return new Promise((resolve, reject) => {
        const that = this
        findDepartment().then(res => {
          const { data } = res
          that.data = data
          resolve()
        }).catch(err => {
          console.log(err)
          reject()
        })
      })
    },
    handleCheckChange(data, checked, indeterminate) {
      const that = this
      if (that.dialogFormVisible) {
        const res = this.$refs.tree.getCheckedKeys()
        if (res.toString()) {
          return new Promise((resolve, reject) => {
            usersDepartment({ ids: res.toString() }).then(res => {
              that.options = res.data
            }).catch()
          })
        } else {
          that.options = []
        }
      }
    },
    restParam() {
      this.form = {}
    }
  }
}
</script>

<style scoped lang="scss">
  .pro_management {
  }
</style>
