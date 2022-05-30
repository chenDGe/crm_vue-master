<template>
  <div class="import_customers m98Auto paddingTB15">
    <div class="import_tip">*不选择员工则导出全部客户</div>
    <div class="maBot20">
      <el-tree
        ref="tree"
        :data="data"
        show-checkbox
        node-key="id"
        :props="defaultProps"
        @check-change="handleCheckChange"
      />
      <el-select v-model="form.member_ids" clearable class="item_margin_15" placeholder="请选择员工">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.realname"
          :value="item.id"
        />
      </el-select>
      <el-button class="item_margin_15" type="primary" icon="el-icon-upload" @click="exportCustomer">导出</el-button>
    </div>
  </div>
</template>

<script>
import { findDepartment, usersDepartment } from '@/api/depart'

export default {
  name: 'Index',
  data() {
    return {
      data: [],
      options: [],
      form: {},
      defaultProps: {
        children: 'child',
        label: 'name',
        multiple: true
      }
    }
  },
  mounted() {
    this.findDepartment()
  },
  methods: {
    handleChange(value) {
      console.log(value)
    },
    exportCustomer() {
      window.location.href = 'http://crm.blogme.club/customer/export?creator=' + this.form.member_ids
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
  }
}
</script>

<style scoped>

</style>
