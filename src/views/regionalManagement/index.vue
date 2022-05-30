<template>
  <div class="pro_management m98Auto">
    <div class="pro_top_button">
      <el-button type="success" icon="el-icon-plus" size="small" @click="newRegional('新增')">新增</el-button>
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
        prop="sort"
        label="优先级"
        align="center"
      />
      <el-table-column
        prop="city"
        label="区域"
        align="center"
      />
      <el-table-column
        prop="address"
        label="操作"
        width="180"
        align="center"
      >
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="newRegional('编辑',scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pro_top_pagination">
      <el-pagination
        background
        :page-size="pageTotal.page_size"
        layout="total,prev, pager, next"
        :total="pageTotal.total"
        @current-change="indexArea"
      />
    </div>
    <!--  弹框-->
    <el-dialog :title="`${dialogTitle}`+ '区域管理'" width="500px" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="排序优先级" :label-width="formLabelWidth">
          <el-input v-model="form.sort" autocomplete="off" type="number" min="0" />
        </el-form-item>
        <el-form-item label="所属区域" :label-width="formLabelWidth">
          <el-select v-model="form.city_ids_as" multiple placeholder="请选择区域">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="regionalOk">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { indexArea, saveArea, cityArea } from '@/api/regional'
export default {
  name: 'Index',
  data() {
    return {
      tableData: [],
      options: [],
      value1: [],
      form: {
        name: '',
        sort: 0,
        city_ids: '',
        city_ids_as: []
      },
      pageTotal: {
        total: 0,
        total_page: 0,
        page_size: 10
      },
      dialogTitle: '' || '新增',
      dialogFormVisible: false,
      formLabelWidth: '120px'
    }
  },
  mounted() {
    this.indexArea()
    this.cityArea()
  },
  methods: {
    newRegional(title, item) {
      this.dialogFormVisible = true
      this.dialogTitle = title
      if (title === '编辑') {
        item['city_ids_as'] = item.city_ids.split(',').map(parseFloat)
        this.form = { ...item }
      }
    },
    indexArea(current) {
      const that = this
      return new Promise((resolve, reject) => {
        indexArea({ page: current }).then(res => {
          const { data } = res
          that.tableData = data.list
          that.pageTotal.total = data.total
        }).catch(err => {
          reject(err)
        })
      })
    },
    regionalOk() {
      const that = this
      return new Promise((resolve, reject) => {
        that.form.city_ids = that.form.city_ids_as.toString()
        saveArea(that.form).then(res => {
          that.dialogFormVisible = false
          const { msg } = res
          that.$notify.success({
            message: msg
          })
          that.indexArea()
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    cityArea() {
      const that = this
      return new Promise((resolve, reject) => {
        cityArea().then(res => {
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
        city_ids: '',
        city_ids_as: []
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
