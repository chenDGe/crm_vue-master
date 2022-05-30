<template>
  <div class="depart_management m98Auto">
    <div class="pro_top_button">
      <el-button type="success" icon="el-icon-plus" size="small" @click="newDepart('新增')">新增</el-button>
    </div>
    <div class="border paddingTB20">
      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        :props="defaultProps"
        default-expand-all
        :expand-on-click-node="false"
      >
        <span slot-scope="{ node,data }" class="custom-tree-node">
          <span>{{ node.label }}（经理：{{ data.members || '无' }}）</span>
          <span class="depart_edit">
            <el-button
              type="text"
              size="mini"
              @click="newDepart('编辑', data)"
            >
              编辑
            </el-button>
            <el-button
              type="text"
              size="mini"
              @click="openSource"
            >
              绑定来源
            </el-button>
          </span>
        </span>
      </el-tree>
    </div>
    <!--  弹框-->
    <el-dialog :title="`${dialogTitle}`" width="500px" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" placeholder="输入部门名称" />
        </el-form-item>
        <el-form-item label="排序优先级" :label-width="formLabelWidth">
          <el-input v-model="form.sort" autocomplete="off" type="number" min="0" />
        </el-form-item>
        <el-form-item label="上一级部门" :label-width="formLabelWidth">
          <el-tree
            :data="data"
            node-key="id"
            ref="pidTree"
            :props="defaultProps"
            default-expand-all
            highlight-current
            :expand-on-click-node="false"
            accordion
          >
            <span slot-scope="{ node,data }" class="custom-tree-node">
              <span @click="() => setSelectedNode(data)">{{ node.label }}</span>
            </span>
          </el-tree>
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
        <el-button type="primary" @click="departOk">保 存</el-button>
      </div>
    </el-dialog>
    <!-- 绑定来源 -->
    <el-dialog :title="`${sourceDialogTitle}`" :visible.sync="sourceFormVisible">
      <el-button class="maBot20" type="primary" size="mini" @click="innerVisible = true">新增</el-button>
      <el-table :data="gridData" border>
        <el-table-column property="date" label="序号" width="150" />
        <el-table-column property="name" label="每天自动分配上限" width="200" />
        <el-table-column property="address" label="今日自动分配数" />
        <el-table-column property="address" label="今日自动分配剩余额度" />
        <el-table-column property="address" label="来源" />
      </el-table>

      <el-dialog
        width="30%"
        title="新增来源"
        :visible.sync="innerVisible"
        append-to-body
      >
        <el-form :model="form">
          <el-form-item label="每日自动分配上限" :label-width="newFormLabelWidth">
            <el-input v-model="form.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="来源" :label-width="newFormLabelWidth">
            <el-select
              v-model="value"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="请选择文章标签"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">取 消</el-button>
          <el-button type="primary" @click="innerVisible = false">保 存</el-button>
        </div>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import { findDepartment, saveDepartment, usersDepartment } from '@/api/depart'
const id = 1000
export default {
  name: 'Index',
  data() {
    return {
      data: [],
      defaultProps: {
        children: 'child',
        label: 'name',
        multiple: true
      },
      personnelProps: {
        children: 'child',
        label: 'name',
        multiple: true
      },
      form: {
        name: '',
        pid: '',
        sort: 0,
        member_ids: []
      },
      dialogTitle: '' || '新增',
      dialogFormVisible: false,
      formLabelWidth: '100px',
      newFormLabelWidth: '150px',
      sourceFormVisible: false,
      sourceDialogTitle: '绑定来源',
      innerVisible: false,
      value: [],
      options: [],
      gridData: []
    }
  },
  mounted() {
    this.findDepartment()
  },
  methods: {
    newDepart(title, item) {
      this.dialogFormVisible = true
      this.dialogTitle = title
      this.form = { ...item }
      this.$nextTick(() => {
        this.$refs.pidTree.setCurrentKey(this.form.pid)
      })
    },
    openSource() {
      this.sourceFormVisible = true
      this.sourceDialogTitle = '绑定来源'
    },
    handleNodeClick(data) {
      console.log(data)
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
    // tree 单选
    setSelectedNode(data) {
      const that = this
      that.form.pid = data.id
    },
    // 保存部门
    departOk() {
      const that = this
      that.dialogFormVisible = false
      that.form.member_ids = that.form.member_ids.toString()
      return new Promise((resolve, reject) => {
        saveDepartment(that.form).then(res => {
          const { msg } = res
          that.form = {}
          that.options = []
          that.$notify.success({
            message: msg
          })
          this.findDepartment()
          resolve()
        }).catch(err => {
          console.log(err)
          reject()
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .depart_management {
    .depart_edit {
      padding: 0 20px;
    }
  }
</style>
