<template>
  <div class="find_customers m98Auto paddingTB15">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="手机号码">
        <el-input placeholder="请输入手机号码" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="small">查询</el-button>
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
        prop="name"
        label="咨询品牌"
        align="center"
      />
      <el-table-column
        prop="name"
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
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
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
      formInline: {
        user: ''
      }
    }
  },
  mounted() {
  },
  methods: {}
}
</script>

<style scoped>

</style>
