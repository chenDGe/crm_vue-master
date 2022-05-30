<template>
  <div class="pro_management m98Auto">
    <div class="pro_top_button">
      <el-button type="success" icon="el-icon-plus" size="small" @click="newBrand('新增')">新增</el-button>
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
        prop="project_name"
        label="所属项目"
        align="center"
      />
      <el-table-column
        prop="max_limit"
        label="资源自动分配上限"
        align="center"
      />
      <el-table-column
        prop="max_follow"
        label="资源最大跟进上限"
        align="center"
      />
      <el-table-column
        prop="expired_min"
        label="未发生有效联系分钟数"
        align="center"
      />
      <el-table-column
        prop="expired_day"
        label="未发生有效联系天数"
        align="center"
      />
      <el-table-column
        prop="address"
        label="操作"
        width="180"
        align="center"
      >
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="newBrand('编辑',scope.row)">编辑</el-button>
          <el-button v-if="scope.row.status" type="danger" icon="el-icon-remove" size="mini" @click="editStatus(scope.row.id)">禁用</el-button>
          <el-button v-if="!scope.row.status" type="success" icon="el-icon-success" size="mini" @click="editStatus(scope.row.id)">启用</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pro_top_pagination">
      <el-pagination
        background
        :page-size="pageTotal.page_size"
        layout="total, prev, pager, next"
        :total="pageTotal.total"
        @current-change="currentChange"
      />
    </div>
    <!--  弹框-->
    <el-dialog :title="`${dialogTitle}`+ '品牌'" width="600px" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" placeholder="输入名称" />
        </el-form-item>
        <!--        <el-form-item label="排序优先级" prop="level" :label-width="formLabelWidth">-->
        <!--          <el-input v-model="form.level" autocomplete="off" type="number" min="0" />-->
        <!--        </el-form-item>-->
        <el-form-item label="资源自动分配上限" prop="max_limit" :label-width="formLabelWidth">
          <el-input v-model="form.max_limit" autocomplete="off" type="number" min="0" />
        </el-form-item>
        <el-form-item label="资源最大跟进上限" prop="max_follow" :label-width="formLabelWidth">
          <el-input v-model="form.max_follow" autocomplete="off" type="number" min="0" />
        </el-form-item>
        <el-form-item label="未发生有效联系分钟数" prop="expired_min" :label-width="formLabelWidth">
          <el-input v-model="form.expired_min" autocomplete="off" type="number" min="0" />
        </el-form-item>
        <el-form-item label="未发生有限联系天数" prop="expired_day" :label-width="formLabelWidth">
          <el-input v-model="form.expired_day" autocomplete="off" type="number" min="0" />
        </el-form-item>
        <!--        <el-form-item label="星标客户可延长次数" prop="star_days" :label-width="formLabelWidth">-->
        <!--          <el-input v-model="form.star_days" autocomplete="off" type="number" min="0" />-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="每次延长天数" prop="per_days" :label-width="formLabelWidth">-->
        <!--          <el-input v-model="form.per_days" autocomplete="off" type="number" min="0" />-->
        <!--        </el-form-item>-->
        <el-form-item label="跟进期限天数" prop="follow_max_day" :label-width="formLabelWidth">
          <el-input v-model="form.follow_max_day" autocomplete="off" type="number" min="0" />
        </el-form-item>
        <el-form-item label="逾期进入公共库" prop="expired_max_day" :label-width="formLabelWidth">
          <el-input v-model="form.expired_max_day" autocomplete="off" type="number" min="0" />
        </el-form-item>
        <el-form-item label="所属项目" prop="project_id" :label-width="formLabelWidth">
          <el-select v-model="form.project_id" placeholder="选择项目">
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
        <el-button type="primary" @click="brandOk('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { findBrand, opsBrand, saveBrand } from '@/api/brand'
import { findPro } from '@/api/project'
export default {
  name: 'Index',
  data() {
    return {
      tableData: [],
      form: {
        name: '',
        level: 0,
        project_id: '',
        max_limit: 0,
        max_follow: 0,
        expired_min: 0,
        expired_day: 0,
        follow_max_day: 0,
        expired_max_day: 0,
        star_days: 0,
        per_days: 0
      },
      rules: {
        name: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        // level: [
        //   { required: true, message: '请输入', trigger: 'blur' }
        // ],
        project_id: [
          { required: true, message: '请输入', trigger: 'change' }
        ],
        max_limit: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        max_follow: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        expired_min: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        expired_day: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        follow_max_day: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        expired_max_day: [
          { required: true, message: '请输入', trigger: 'blur' }
        ]
        // star_days: [
        //   { required: true, message: '请输入', trigger: 'blur' }
        // ],
        // per_days: [
        //   { required: true, message: '请输入', trigger: 'blur' }
        // ]
      },
      options: [],
      pageTotal: {
        total: 0,
        total_page: 0,
        page_size: 10
      },
      dialogTitle: '' || '新增',
      dialogFormVisible: false,
      formLabelWidth: '180px'
    }
  },
  mounted() {
    this.selectPro()
    this.findBrand()
  },
  methods: {
    newBrand(title, item) {
      this.dialogFormVisible = true
      this.dialogTitle = title
      console.log(item)
      this.form = { ...item }
    },
    findBrand(param) {
      return new Promise((resolve, reject) => {
        const that = this
        findBrand(param).then(response => {
          const { data } = response
          that.tableData = data.list
          that.pageTotal = {
            total: data.total,
            total_page: data.total_page
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    async brandOk(form) {
      const that = this
      that.$refs[form].validate((valid) => {
        if (valid) {
          return new Promise((resolve, reject) => {
            saveBrand(that.form).then(res => {
              const { msg } = res
              that.$notify.success({
                message: msg
              })
              that.findBrand()
              that.dialogFormVisible = false
            }).catch(error => {
              const { msg } = error
              that.$notify.error({
                message: msg
              })
              reject(error)
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    selectPro() {
      return new Promise((resolve, reject) => {
        const that = this
        findPro().then(response => {
          const { data } = response
          that.options = data.list
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    editStatus(id) {
      return new Promise((resolve, reject) => {
        const that = this
        opsBrand({ brand_id: id }).then(response => {
          const { msg } = response
          that.$notify.success({
            message: msg
          })
          that.findBrand()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    currentChange(e) {
      const that = this
      that.findBrand({ page: e })
    }
  }
}
</script>

<style scoped lang="scss">
  .pro_management {
    .pro_top_pagination {
    }
  }
</style>
