<template>
  <div class="find_customers m98Auto paddingTB15">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="手机号码">
        <el-input v-model="formInline.iphone" placeholder="请输入手机号码" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="small" @click="allCustomer">查询</el-button>
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
        width="80"
        align="center"
      />
      <el-table-column
        prop="name"
        label="客户名字"
        align="center"
      />
      <el-table-column
        prop="brand_name"
        label="咨询品牌"
        align="center"
      />
      <el-table-column
        prop="expired_time"
        label="最后分配类型"
        align="center"
      />
      <el-table-column
        prop="name"
        label="最后分配时间"
        align="center"
      />
      <el-table-column
        prop="name"
        label="最后分配失败原因"
        align="center"
      />
      <el-table-column
        prop="name"
        label="创建时间"
        align="center"
      />
      <el-table-column
        prop="name"
        label="所在位置"
        align="center"
      />
    </el-table>
    <div class="pro_top_pagination">
      <el-pagination
        background
        :page-size="pageTotal.page_size"
        layout="total, prev, pager, next"
        :total="pageTotal.total"
        @current-change="allCustomer"
      />
    </div>
  </div>
</template>

<script>
import { allCustomer } from '@/api/customers'
export default {
  name: 'Index',
  data() {
    return {
      tableData: [],
      formInline: {
        iphone: ''
      },
      pageTotal: {
        total: 0,
        total_page: 0,
        page_size: 10
      }
    }
  },
  mounted() {
    this.allCustomer()
  },
  methods: {
    allCustomer(page) {
      const that = this
      return new Promise((resolve, reject) => {
        allCustomer({ phone: that.formInline.iphone, page: page }).then(res => {
          const { data } = res
          that.tableData = data.list
          that.pageTotal.total = data.total
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
