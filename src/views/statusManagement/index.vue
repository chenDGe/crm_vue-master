<template>
  <div class="pro_management m98Auto">
    <div class="pro_top_button">
      <el-button type="success" icon="el-icon-plus" size="small" @click="newStatus('新增')">新增</el-button>
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
        label="状态名称"
        align="center"
      />
      <el-table-column
        prop="label"
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
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="newStatus('编辑', scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pro_top_pagination">
      <el-pagination
        background
        :page-size="pageTotal.page_size"
        layout="total,prev, pager, next"
        :total="pageTotal.total"
        @current-change="indexStatus"
      />
    </div>
    <!--  弹框-->
    <el-dialog :title="`${dialogTitle}`+ '资源状态'" width="500px" :visible.sync="dialogFormVisible">
      <el-form :model="form" :label-width="formLabelWidth">
        <el-form-item label="名称">
          <el-input v-model="form.name" autocomplete="off" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="排序优先级">
          <el-input v-model="form.sort" autocomplete="off" type="number" min="0" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="标签规则">
          <el-select  v-model="form.label_detail_ids" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveStatus">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { indexStatus, saveStatus, labelStatus } from '@/api/status'
export default {
  name: 'Index',
  data() {
    return {
      tableData: [],
      form: {
        name: '',
        sort: 0,
        label_detail_ids: ''
      },
      pageTotal: {
        total: 0,
        total_page: 0,
        page_size: 10
      },
      options: {},
      formLabelWidth: '120px',
      dialogFormVisible: false,
      dialogTitle: '' || '新增'
    }
  },
  mounted() {
    this.indexStatus()
    this.labelStatus()
  },
  methods: {
    newStatus(title, item) {
      this.dialogFormVisible = true
      this.dialogTitle = title
      if (title === '编辑') {
        item.label_detail_ids = Number(item.label_detail_ids)
        this.form = { ...item }
      }
    },
    indexStatus(current) {
      const that = this
      return new Promise((resolve, reject) => {
        indexStatus({ page: current }).then(res => {
          const { data } = res
          that.tableData = data.list
          that.pageTotal.total = data.total
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    saveStatus() {
      const that = this
      return new Promise((resolve, reject) => {
        saveStatus(that.form).then(res => {
          const { msg } = res
          that.dialogFormVisible = false
          that.$notify.success({
            message: msg
          })
          that.restParam()
          that.indexStatus()
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    labelStatus() {
      const that = this
      return new Promise((resolve, reject) => {
        labelStatus().then(res => {
          const { data } = res
          that.options = data
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    restParam() {
      const that = this
      that.form = {
        name: '',
        sort: 0,
        label_detail_ids: ''
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
