<template>
  <div class="employee_management m98Auto paddingTB15">
    <el-tabs type="border-card">
      <el-tab-pane label="员工信息">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="姓名">
            <el-input v-model="formInline.name" placeholder="请输入姓名" />
          </el-form-item>
          <el-form-item label="咨询品牌">
            <el-select v-model="formInline.brand" clearable placeholder="不限">
              <el-option
                v-for="item in optionsBrand"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="small" @click="findStaff">查询</el-button>
          </el-form-item>
          <el-form-item class="flRight">
            <el-button type="primary" icon="el-icon-plus" size="small" @click="newEmployee('新增')">新增</el-button>
            <!--            <el-button type="success" icon="el-icon-crop" size="small">批量操作</el-button>-->
          </el-form-item>
        </el-form>
        <el-table
          :data="tableData"
          border
          style="width: 100%;"
        >
          <el-table-column
            prop="id"
            label="ID"
            width="50"
            align="center"
          />
          <el-table-column
            prop="realname"
            label="名字"
            align="center"
          />
          <el-table-column
            prop="userid"
            label="用户名"
            align="center"
          />
          <el-table-column
            prop="brand_name"
            label="负责品牌"
            align="center"
          />
          <el-table-column
            prop="info_names"
            label="负责来源"
            align="center"
          />
          <el-table-column
            prop="number"
            label="每天自动分配上限"
            align="center"
          />
          <el-table-column
            prop="address"
            label="操作"
            width="180"
            align="center"
          >
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="newEmployee('编辑',scope.row)">编辑</el-button>
              <el-button v-if="scope.row.status" type="danger" icon="el-icon-remove" size="mini" @click="opsStaff(scope.row.id)">禁用</el-button>
              <el-button v-if="!scope.row.status" type="success" icon="el-icon-success" size="mini" @click="opsStaff(scope.row.id)">启用</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pro_top_pagination">
          <el-pagination
            background
            :page-size="pageTotal.page_size"
            layout="total, prev, pager, next"
            :total="pageTotal.total"
            @current-change="findStaff"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane label="电话客服今日签到列表">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="品牌">
            <el-select v-model="iphoneBrand" clearable placeholder="不限" @change="signLogsStaff">
              <el-option
                v-for="item in optionsBrand"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <el-table
          :data="iphoneData"
          border
          style="width: 100%;"
        >
          <el-table-column
            prop="id"
            label="ID"
            width="50"
            align="center"
          />
          <el-table-column
            prop="realname"
            label="名字"
            align="center"
          />
          <el-table-column
            prop="userid"
            label="用户名"
            align="center"
          />
          <el-table-column
            prop="brand_id"
            label="负责品牌"
            align="center"
          />
          <el-table-column
            prop="info_ids"
            label="负责来源"
            align="center"
          />
          <el-table-column
            prop="number"
            label="签到时间"
            align="center"
          />
          <el-table-column
            prop="number"
            label="今日自动分配数"
            align="center"
          />
          <el-table-column
            prop="number"
            label="今日回收到AE数"
            align="center"
          />

        </el-table>
        <div class="pro_top_pagination">
          <el-pagination
            background
            :page-size="iphonePageTotal.page_size"
            layout="total, prev, pager, next"
            :total="iphonePageTotal.total"
            @current-change="signLogsStaff"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane label="登录日志">
        <el-table
          :data="logData"
          border
          style="width: 100%;"
        >
          <el-table-column
            prop="id"
            label="ID"
            width="50"
            align="center"
          />
          <el-table-column
            prop="realname"
            label="名字"
            align="center"
          />
          <el-table-column
            prop="userid"
            label="用户名"
            align="center"
          />
          <el-table-column
            prop="created_at"
            label="时间"
            align="center"
          />
          <el-table-column
            prop="client_ip"
            label="客户端IP	"
            align="center"
          />
          <el-table-column
            prop="type"
            label="来源"
            align="center"
          />
          <el-table-column
            prop="type_str"
            label="操作"
            align="center"
          />
        </el-table>
        <div class="pro_top_pagination">
          <el-pagination
            background
            :page-size="logPageTotal.page_size"
            layout="total, prev, pager, next"
            :total="logPageTotal.total"
            @current-change="logStaff"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane label="在线用户">
        <el-table
          :data="onlineData"
          border
          style="width: 100%;"
        >
          <el-table-column
            prop="id"
            label="部门"
            width="50"
            align="center"
          />
          <el-table-column
            prop="realname"
            label="员工"
            align="center"
          />
          <el-table-column
            prop="created_at"
            label="登录时间"
            align="center"
          />
          <el-table-column
            prop="login_time"
            label="在线时长"
            align="center"
          />
          <el-table-column
            prop="updated_at"
            label="签到时间"
            align="center"
          />
          <el-table-column
            prop="last_client_ip"
            label="IP地址"
            align="center"
          />
          <el-table-column
            prop="client_type"
            label="客户端类型"
            align="center"
          />
          <el-table-column
            prop="address"
            label="操作"
            width="180"
            align="center"
          >
            <template slot-scope="scope">
              <el-button type="danger" icon="el-icon-edit" size="mini" @click="endOnLine(scope.row)">强制下线</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pro_top_pagination">
          <el-pagination
            background
            :page-size="onlinePageTotal.page_size"
            layout="total, prev, pager, next"
            :total="onlinePageTotal.total"
            @current-change="onlineStaff"
          />
        </div>
      </el-tab-pane>
    </el-tabs>

    <!--  弹框-->
    <el-dialog :title="`${dialogTitle}`" width="500px" :visible.sync="dialogFormVisible">
      <el-form :model="staffForm">
        <el-form-item label="名字" :label-width="formLabelWidth">
          <el-input v-model="staffForm.realname" autocomplete="off" placeholder="请输入名字" />
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="staffForm.userid" autocomplete="off" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="staffForm.password" autocomplete="off" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth">
          <el-input v-model="staffForm.mobile" autocomplete="off" placeholder="请输入手机" />
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="staffForm.email" autocomplete="off" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="权限组" :label-width="formLabelWidth">
          <el-select v-model="staffForm.type" placeholder="请选择权限">
            <el-option label="管理员" :value="1" />
            <el-option label="电话客服" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="所属项目" :label-width="formLabelWidth">
          <el-select v-model="staffForm.project_id" placeholder="请选择所属项目" @change="allBrand">
            <el-option
              v-for="item in optionsPro"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="所属品牌" :label-width="formLabelWidth">
          <el-select v-model="staffForm.brand_id" placeholder="所属品牌">
            <el-option
              v-for="item in optionsBrandDig"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="所属部门" :label-width="formLabelWidth">
          <el-tree
            ref="pidTree"
            :data="deptData"
            node-key="id"
            :props="defaultProps"
            highlight-current
            :expand-on-click-node="false"
            accordion
          >
            <span slot-scope="{ node,data }" class="custom-tree-node">
              <span @click="() => setSelectedNode(data)">{{ node.label }}</span>
            </span>
          </el-tree>
        </el-form-item>
        <el-form-item label="信息来源" :label-width="formLabelWidth">
          <el-select v-model="staffForm.info_as" multiple placeholder="请选择信息来源">
            <el-option
              v-for="item in optionInfo"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="每日自动分配上限" :label-width="formLabelWidth">
          <el-input v-model="staffForm.number" autocomplete="off" type="number" min="0" placeholder="请输入每日自动分配上限" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveStaff">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { indexStaff, opsStaff, saveStaff, onlineStaff, logStaff, signLogsStaff, offLineStaff } from '@/api/staff'
import { findBrand, allBrand } from '@/api/brand'
import { indexInfo } from '@/api/info'
import { findPro } from '@/api/project'
import { findDepartment } from '@/api/depart'
export default {
  name: 'Index',
  data() {
    return {
      tableData: [],
      iphoneData: [],
      logData: [],
      onlineData: [],
      options: [],
      formInline: {
        name: '',
        brand: '',
        page: ''
      },
      pageTotal: {
        total: 0,
        total_page: 0,
        page_size: 10
      },
      iphonePageTotal: {
        total: 0,
        total_page: 0,
        page_size: 10
      },
      logPageTotal: {
        total: 0,
        total_page: 0,
        page_size: 10
      },
      onlinePageTotal: {
        total: 0,
        total_page: 0,
        page_size: 10
      },
      iphoneBrand: '',
      staffForm: {
        realname: '',
        // login_name: '',
        userid: '',
        mobile: '',
        email: '',
        type: '',
        password: '',
        project_id: '',
        brand_id: '',
        dept_id: '',
        info_as: '',
        info_ids: '',
        number: 0
      },
      optionsPro: [],
      optionsBrand: [],
      optionsBrandDig: [],
      deptData: [],
      optionInfo: [],
      dialogTitle: '' || '新增',
      dialogFormVisible: false,
      formLabelWidth: '150px',
      defaultProps: {
        children: 'child',
        label: 'name'
      }
    }
  },
  mounted() {
    this.findStaff()
    this.findBrand()
    this.selectPro()
    this.findDepartment()
    this.signLogsStaff()
    this.logStaff()
    this.onlineStaff()
    this.indexInfo()
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    newEmployee(title, item) {
      this.dialogFormVisible = true
      this.dialogTitle = title
      this.staffForm = { ...item }
    },
    findStaff(pageId) {
      const that = this
      that.formInline.page = pageId
      return new Promise((resolve, reject) => {
        indexStaff(that.formInline).then(res => {
          const { data } = res
          data.list.forEach(item => {
            if (item.info_ids) {
              item['info_as'] = item.info_ids.split(',')
            }
          })
          that.tableData = data.list
          that.pageTotal.total = data.total
          resolve()
        }).catch(err => {
          console.log(err)
          reject()
        })
      })
    },
    findBrand() {
      const that = this
      return new Promise((resolve, reject) => {
        findBrand().then(res => {
          const { data } = res
          that.optionsBrand = data.list
          resolve()
        }).catch(err => {
          console.log(err)
          reject()
        })
      })
    },
    opsStaff(ids) {
      const that = this
      return new Promise((resolve, reject) => {
        opsStaff({ member_id: ids }).then(res => {
          const { msg } = res
          that.$notify.success({
            message: msg
          })
          this.findStaff()
        }).catch(err => {
          console.log(err)
          reject()
        })
      })
    },
    saveStaff() {
      const that = this
      return new Promise((resolve, reject) => {
        that.staffForm.info_ids = that.staffForm.info_as.toString()
        saveStaff(that.staffForm).then(res => {
          that.dialogFormVisible = false
          that.findStaff()
          resolve()
        }).catch(err => {
          console.log(err)
          reject()
        })
      })
    },
    selectPro() {
      return new Promise((resolve, reject) => {
        const that = this
        findPro().then(response => {
          const { data } = response
          that.optionsPro = data.list
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    findDepartment() {
      return new Promise((resolve, reject) => {
        const that = this
        findDepartment().then(res => {
          const { data } = res
          that.deptData = data
          resolve()
        }).catch(err => {
          console.log(err)
          reject()
        })
      })
    },
    // tree 单选
    setSelectedNode(data) {
      const that = this
      that.staffForm.dept_id = data.id
    },
    endOnLine(item) {
      const that = this
      return new Promise((resolve, reject) => {
        offLineStaff({ $member_id: item.id }).then(res => {
          const { msg } = res
          // that.onlineData = data
          that.$notify.success({
            message: msg
          })
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    signLogsStaff(current) {
      const that = this
      return new Promise((resolve, reject) => {
        signLogsStaff({ brand_id: that.iphoneBrand, page: current }).then(res => {
          const { data } = res
          that.iphoneData = data.list
          that.iphonePageTotal.total = data.total
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    logStaff(current) {
      const that = this
      return new Promise((resolve, reject) => {
        logStaff({ page: current }).then(res => {
          const { data } = res
          that.logData = data.list
          that.logPageTotal.total = data.total
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    onlineStaff(current) {
      const that = this
      return new Promise((resolve, reject) => {
        onlineStaff({ page: current }).then(res => {
          const { data } = res
          that.onlineData = data
          that.onlinePageTotal.total = data.total
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    allBrand() {
      const that = this
      return new Promise((resolve, reject) => {
        allBrand({ project_id: that.staffForm.project_id }).then(res => {
          const { data } = res
          that.optionsBrandDig = data
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    indexInfo() {
      const that = this
      return new Promise((resolve, reject) => {
        indexInfo().then(res => {
          const { data } = res
          that.optionInfo = data.list
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
