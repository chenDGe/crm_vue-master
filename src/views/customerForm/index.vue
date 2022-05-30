<template>
  <div class="customer_form m98Auto">
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
        label="字段类型"
        align="center"
      >
        <template :slot-scope="scope">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="字段名"
        align="center"
      >
        <template>
          <el-input v-model="input" placeholder="请输入字段名"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="字段显示名称"
        align="center"
      >
        <template>
          <el-input v-model="input" placeholder="请输入字段显示名"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="是否必填"
        align="center"
      >
        <template>
          <!-- `checked` 为 true 或 false -->
          <el-checkbox v-model="checked">是</el-checkbox>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="是否开启"
        align="center"
      >
        <template>
          <!-- `checked` 为 true 或 false -->
          <el-checkbox v-model="checked">是</el-checkbox>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="是否停用"
        align="center"
      >
        <template>
          <!-- `checked` 为 true 或 false -->
          <el-checkbox v-model="checked">是</el-checkbox>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="排序优先级"
        align="center"
      >
        <template>
          <el-input v-model="input" placeholder="请输入字段名"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="选项"
        align="center"
      />
      <el-table-column
        prop="address"
        label="操作"
        width="200"
        align="center"
      >
        <template :slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="newStatus('编辑')">保存</el-button>
          <el-button type="danger" icon="el-icon-delete-solid
" size="mini" @click="newStatus('编辑')">取消</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import { fetchList } from '@/api/article'

export default {
  name: 'Index',
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tableData: [{
        id: '1',
        name: '测试'
      }, {
        id: '2',
        name: '测试1'
      }, {
        id: '3',
        name: '测试2'
      }],
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      input: '',
      checked: false
    }
  },
  created() {
    // this.getList()
  },
  methods: {
    async getList() {
      this.listLoading = true
      // eslint-disable-next-line no-undef
      const { data } = await fetchList(this.listQuery)
      const items = data.items
      this.list = items.map(v => {
        this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
        v.originalTitle = v.title //  will be used when user click the cancel botton
        return v
      })
      this.listLoading = false
    },
    cancelEdit(row) {
      row.title = row.originalTitle
      row.edit = false
      this.$message({
        message: 'The title has been restored to the original value',
        type: 'warning'
      })
    },
    confirmEdit(row) {
      row.edit = false
      row.originalTitle = row.title
      this.$message({
        message: 'The title has been edited',
        type: 'success'
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .edit-input {
    padding-right: 100px;
  }
  .cancel-btn {
    position: absolute;
    right: 15px;
    top: 10px;
  }
</style>
