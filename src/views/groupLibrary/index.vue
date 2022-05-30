<template>
  <div class="touch_customers m98Auto">
    <div class="paddingTB20">
      <el-form :inline="true" :model="formInline" label-position="right" label-width="110px" size="mini" class="demo-form-inline">
        <el-form-item label="搜索">
          <el-input v-model="formInline.phone" placeholder="名字/手机号/微信/QQ" />
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="formInline.created_time_as"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <!--        <el-form-item>-->
        <!--          <el-select v-model="timeSelect" placeholder="请选择">-->
        <!--            <el-option-->
        <!--              v-for="item in timeSelectOptions"-->
        <!--              :key="item.value"-->
        <!--              :label="item.label"-->
        <!--              :value="item.value"-->
        <!--            />-->
        <!--          </el-select>-->
        <!--        </el-form-item>-->
        <el-form-item :label="timeSelectOptions[timeSelect].label">
          <el-date-picker
            v-model="formInline.updated_time_as"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="标签">
          <el-select v-model="formInline.label_ids_as" multiple placeholder="请选择">
            <el-option
              v-for="item in labelOption"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="最后放弃人">
          <el-select v-model="formInline.owner_as" multiple>
            <el-option
              v-for="item in departOption"
              :key="item.id"
              :label="item.realname"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="所属区域">
          <el-select v-model="formInline.area" clearable placeholder="不限">
            <el-option
              v-for="item in regionOption"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="groupCustomer">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="序号"
        width="80"
        align="center"
      />
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
        prop="created_at"
        label="创建时间"
        align="center"
      />
      <el-table-column
        prop="owner_name"
        label="跟进人"
        align="center"
      />
      <el-table-column
        prop="log"
        label="最近动态"
        align="center"
      />
      <el-table-column
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-thumb" size="mini" @click="receiveCustomer(scope.row.id)">领取客户</el-button>
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
  </div>
</template>

<script>
import { receiveCustomer, groupCustomer, labelCustomer, brandCustomer, regionCustomer } from '@/api/dhkfApi'
import { indexStaff } from '@/api/staff'
export default {
  name: 'Index',
  data() {
    return {
      pageTotal: {
        total: 0,
        total_page: 0,
        page_size: 10
      },
      tableData: [],
      labelOption: [],
      departOption: [],
      brandOption: [],
      regionOption: [],
      formInline: {
        phone: '',
        start_created_at: '',
        end_created_at: '',
        start_updated_at: '',
        end_updated_at: '',
        label_ids: '',
        owner: '',
        area: '',
        owner_as: [],
        label_ids_as: [],
        created_time_as: [],
        updated_time_as: []
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
      timeSelectOptions: [{
        value: '0',
        label: '更新动态时间'
      }, {
        value: '1',
        label: '未更新动态时间'
      }],
      timeSelect: '0'
    }
  },
  mounted() {
    this.groupCustomer()
    this.labelCustomer()
    this.indexStaff()
    this.brandCustomer()
    this.regionCustomer()
  },
  methods: {
    groupCustomer(page) {
      const that = this
      return new Promise((resolve, reject) => {
        groupCustomer(that.paramFormat(page)).then(res => {
          const { data } = res
          that.tableData = data.list
          that.tableData = data.list
          that.pageTotal.total = data.total
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    paramFormat(page) {
      const that = this
      that.formInline.owner = that.formInline.owner_as.toString()
      that.formInline.label_ids = that.formInline.label_ids_as.toString()
      that.formInline.start_created_at = that.formInline.created_time_as[0]
      that.formInline.end_created_at = that.formInline.created_time_as[1]
      that.formInline.start_updated_at = that.formInline.updated_time_as[0]
      that.formInline.end_updated_at = that.formInline.updated_time_as[1]
      that.formInline.page = page
      return that.formInline
    },
    /**  标签  **/
    labelCustomer() {
      const that = this
      return new Promise((resolve, reject) => {
        labelCustomer().then(res => {
          const { data } = res
          that.labelOption = data
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    /** 跟进人 **/
    indexStaff() {
      const that = this
      return new Promise((resolve, reject) => {
        indexStaff().then(res => {
          const { data } = res
          that.departOption = data.list
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    /** 品牌 **/
    brandCustomer() {
      const that = this
      return new Promise((resolve, reject) => {
        brandCustomer().then(res => {
          const { data } = res
          that.brandOption = data
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    /** 区域 **/
    regionCustomer() {
      const that = this
      return new Promise((resolve, reject) => {
        regionCustomer().then(res => {
          const { data } = res
          that.regionOption = data
          resolve()
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
    },
    receiveCustomer(id) {
      const that = this
      return new Promise((resolve, reject) => {
        receiveCustomer({ customer_id: id }).then(res => {
          const { msg } = res
          that.$notify.success({
            message: msg
          })
          that.groupCustomer()
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    currentChange(e) {
      const that = this
      that.pageTotal.page = e
      that.groupCustomer(e)
    }
  }
}
</script>

<style scoped>

</style>
