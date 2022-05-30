<template>
  <div class="touch_customers m98Auto">
    <div class="paddingTB20">
      <el-form :model="formInline" label-position="right" label-width="130px" style="width: 460px" size="mini" class="demo-form-inline">
        <el-form-item label="通话时间">
          <el-date-picker
            v-model="formInline.time_as"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
          />
        </el-form-item>
        <el-form-item label="通话时长">
          <el-col :span="11">
            <el-input  v-model="formInline.min_time" placeholder="最小"/>
          </el-col>
          <el-col class="line" :span="2">至</el-col>
          <el-col :span="11">
            <el-input v-model="formInline.max_time" placeholder="最大"/>
          </el-col>
        </el-form-item>
<!--        <el-form-item label="拨打者">-->
<!--          <el-cascader-->
<!--            :options="optionCascader"-->
<!--            :props="{ multiple: true }"-->
<!--            clearable-->
<!--          />-->
<!--        </el-form-item>-->
        <el-form-item label="呼入/呼出">
          <el-select v-model="formInline.type" clearable placeholder="不限">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="small" @click="messageLosCustomer">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="name"
        label="客户"
        align="center"
      >
        <template slot-scope="scope">
          <a @click="customDeilt(scope.$index, scope.row)">{{ scope.row.name }}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="号码"
        align="center"
      />
      <el-table-column
        prop="address"
        label="拨打者"
        align="center"
      />
      <el-table-column
        prop="address"
        label="通话时长"
        align="center"
      />
      <el-table-column
        prop="address"
        label="时间"
        align="center"
      />
      <el-table-column
        prop="address"
        label="电话录音"
        align="center"
      />
    </el-table>
    <div class="pro_top_pagination">
      <el-pagination
        background
        :page-size="pageTotal.page_size"
        layout="total,prev, pager, next"
        :total="pageTotal.total"
        @current-change="messageLosCustomer"
      />
    </div>
  </div>
</template>

<script>
import { messageLosCustomer } from '@/api/dhkfApi'
export default {
  name: 'Index',
  data() {
    return {
      tableData: [],
      formInline: {
        time_as: []
      },
      pageTotal: {
        total: 0,
        total_page: 0,
        page_size: 10
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      options: [{
        value: '1',
        label: '呼入'
      }, {
        value: '2',
        label: '呼出'
      }],
      optionsValue: ''
    }
  },
  mounted() {
    this.messageLosCustomer()
  },
  methods: {
    messageLosCustomer(current) {
      const that = this
      that.formInline.start_time = that.formInline.time_as[0]
      that.formInline.end_time = that.formInline.time_as[1]
      that.formInline.page = current
      return new Promise((resolve, reject) => {
        messageLosCustomer(that.formInline).then(res => {
          const { data } = res
          that.tableData = data.list
          that.pageTotal.total = data.total
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    /** 跳转到客户详情 **/
    customDeilt(index, item) {
      const indexFlag = []
      const topId = index === 0 ? '' : this.tableData[1].id
      const nextId = index === this.tableData.length - 1 ? '' : this.tableData[index + 1].id
      indexFlag.push(index === 0)
      indexFlag.push(index === this.tableData.length - 1)
      this.$router.push({ name: 'infoCost', query: { index: indexFlag, id: item.id, topId: topId, nextId: nextId, data: this.tableData, length: this.tableData.length, current: index }})
    }
  }
}
</script>

<style scoped>

</style>
