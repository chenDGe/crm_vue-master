<template>
  <div class="analysis_cost m98Auto">
    <div class="paddingTB20">
      <el-form :model="formInline" style="width: 460px" label-position="right" label-width="110px" size="mini" class="demo-form-inline">
        <el-form-item label="搜索">
          <el-input placeholder="名字/手机号/微信/QQ" />
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="value2"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          />
        </el-form-item>
        <el-form-item label="来访日期">
          <el-date-picker
            v-model="value2"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          />
        </el-form-item>
        <el-form-item label="谈单人">
          <el-cascader
            :options="optionCascader"
            :props="{ multiple: true, checkStrictly: true }"
            clearable
          />
        </el-form-item>
        <el-form-item label="跟进人">
          <el-cascader
            :options="optionCascader"
            :props="{ multiple: true, checkStrictly: true }"
            clearable
          />
        </el-form-item>
        <el-form-item label="考察品牌">
          <el-select v-model="optionsValue2" clearable placeholder="不限">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="来访公司">
          <el-select v-model="optionsValue" clearable placeholder="不限">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="所属区域">
          <el-select v-model="optionsValue" clearable placeholder="不限">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="small">查询</el-button>
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
        label="ID"
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
        prop="brand_name"
        label="咨询品牌"
        align="center"
      />
      <el-table-column
        prop="visit_name"
        label="考察品牌"
        align="center"
      />
      <el-table-column
        prop="label"
        label="信息来源"
        align="center"
      />
      <el-table-column
        prop="company_name"
        label="来访公司"
        align="center"
      />
      <el-table-column
        prop="step_time"
        label="来访日期"
        align="center"
      />
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      tableData: [{
        date: '1',
        name: '2',
        address: '3'
      }],
      formInline: {
        user: '',
        region: ''
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
      optionCascader: [{
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }],
      value2: '',
      options: [{
        value: '1',
        label: '华东'
      }, {
        value: '2',
        label: '华北'
      }],
      options2: [{
        value: '1',
        label: '品牌1'
      }, {
        value: '2',
        label: '品牌2'
      }],
      optionsValue: '',
      optionsValue2: ''
    }
  },
  mounted() {
  },
  methods: {
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

<style scoped lang="scss">
  .analysis_cost {

  }
</style>
