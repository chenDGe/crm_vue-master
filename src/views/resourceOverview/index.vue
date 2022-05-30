<template>

  <div class="resource_overview m98Auto paddingTB20">
    <el-table
      :data="tableData"
      style="width: 100%"
      align="center"
      header-align="center"
      :show-header="false"
    >
      <el-table-column
        prop="date"
        width="180"
        align="center"
        header-align="center"
      />
      <el-table-column
        prop="name"
        width="100"
        align="center"
        header-align="center"
      />
      <el-table-column
        prop="address"
        width="180"
        align="center"
        header-align="center"
      />
      <el-table-column
        prop="address2"
        width="100"
        align="center"
        header-align="center"
      />
    </el-table>
  </div>
</template>

<script>
import { userResource } from '@/api/dhkfApi'
export default {
  name: 'Index',
  data() {
    return {
      tableData: []
    }
  },
  mounted() {
    this.userResource()
  },
  methods: {
    userResource() {
      const that = this
      return new Promise((resolve, reject) => {
        userResource().then(res => {
          const { data } = res
          that.tableData = [{
            date: '个人资源总数',
            name: data.total,
            address: '正在跟进数',
            address2: data.contact
          }, {
            date: '未签约客户数',
            name: data.wait,
            address: '签约客户数',
            address2: data.success
          }]
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
</script>
