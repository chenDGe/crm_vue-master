<template>
  <div class="pro_management m98Auto paddingTB20">
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
        label="信息来源"
        align="center"
      />
      <el-table-column
        prop="address"
        label="操作"
        width="180"
        align="center"
      >
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="userInfo(scope.row.id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pro_top_pagination">
      <el-pagination
        background
        :page-size="pageTotal.page_size"
        layout="total,prev, pager, next"
        :total="pageTotal.total"
        @current-change="indexInfo"
      />
    </div>
    <!--    弹窗-->
    <el-dialog :title="`${dialogTitle}`" :visible.sync="dialogTableVisible">
      <div class="maBot20">
        <el-button type="success" icon="el-icon-plus" size="small" @click="innerVisible = true">新增</el-button>
      </div>
      <el-table :data="gridData" border>
        <el-table-column align="center" property="date" label="ID" width="80" />
        <el-table-column align="center" property="name" label="成员名字" />
        <el-table-column align="center" property="address" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="danger" icon="el-icon-edit" size="mini" @click="deleteInfo(scope.row.id)">移除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog
        width="400px"
        title="添加成员"
        :visible.sync="innerVisible"
        append-to-body
      >
        <el-tree
          ref="tree"
          :data="treeData"
          show-checkbox
          node-key="id"
          :props="defaultProps"
          @check-change="handleCheckChange"
        />
        <el-select v-model="user_id" placeholder="请选择员工">
          <el-option
            v-for="item in treeOptions"
            :key="item.id"
            :label="item.realname"
            :value="item.id"
          />
        </el-select>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="userOk">确 定</el-button>
        </span>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import { indexInfo, userInfo, deleteInfo } from '@/api/info'
import { findDepartment, usersDepartment } from '@/api/depart'
export default {
  name: 'Index',
  data() {
    return {
      tableData: [],
      gridData: [],
      options: [],
      treeOptions: [],
      treeData: [],
      value: '',
      user_id: '',
      info_id: '',
      dialogTableVisible: false,
      dialogTitle: '信息来源规则管理',
      innerVisible: false,
      defaultProps: {
        children: 'child',
        label: 'name',
        multiple: true
      },
      pageTotal: {
        total: 0,
        total_page: 0,
        page_size: 10
      }
    }
  },
  mounted() {
    this.indexInfo()
    this.findDepartment()
  },
  methods: {
    handleChange(value) {
      console.log(value)
    },
    indexInfo(current) {
      const that = this
      return new Promise((resolve, reject) => {
        indexInfo({ page: current }).then(res => {
          const { data } = res
          that.tableData = data.list
          that.pageTotal.total = data.total
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    userInfo(id) {
      const that = this
      that.info_id = id
      return new Promise((resolve, reject) => {
        userInfo({ id: that.info_id }).then(res => {
          const { data } = res
          that.gridData = data.list
          that.dialogTableVisible = true
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    userOk() {
      const that = this
      return new Promise((resolve, reject) => {
        deleteInfo({ id: that.user_id }).then(res => {
          const { msg } = res
          that.$notify.success({
            message: msg
          })
          that.userInfo(that.info_id)
          that.dialogVisible = false
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    deleteInfo(id) {
      const that = this
      return new Promise((resolve, reject) => {
        deleteInfo({ id: id }).then(res => {
          const { msg } = res
          that.$notify.success({
            message: msg
          })
          that.userInfo(that.info_id)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    findDepartment() {
      const that = this
      return new Promise((resolve, reject) => {
        findDepartment().then(res => {
          const { data } = res
          that.treeData = data
          resolve()
        }).catch(err => {
          console.log(err)
          reject()
        })
      })
    },
    handleCheckChange(data, checked, indeterminate) {
      const that = this
      const res = this.$refs.tree.getCheckedKeys()
      if (res.toString()) {
        return new Promise((resolve, reject) => {
          usersDepartment({ ids: res.toString() }).then(res => {
            that.treeOptions = res.data
          }).catch()
        })
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
