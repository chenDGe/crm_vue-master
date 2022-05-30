<template>
  <div class="star_customers m98Auto">
    <div class="paddingTB20">
      <el-form :model="formInline" label-position="right" label-width="110px" style="width: 460px" size="mini" class="demo-form-inline">
        <el-form-item label="搜索">
          <el-input placeholder="名字/手机号/微信/QQ"></el-input>
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
        <el-form-item>
          <el-select v-model="timeSelect" placeholder="请选择">
            <el-option
              v-for="item in timeSelectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="timeSelectOptions[timeSelect].label">
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
        <el-form-item label="标签">
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
        <el-form-item label="咨询品牌">
          <el-select v-model="optionsValue2" clearable placeholder="不限">
            <el-option
              v-for="item in options2"
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
        prop="date"
        label="序号"
        width="80"
        align="center"
      />
      <el-table-column
        prop="name"
        label="客户"
        align="center"
      />
      <el-table-column
        prop="address"
        label="创建时间"
        align="center"
      />
      <el-table-column
        prop="address"
        label="跟进人"
        align="center"
      />
      <el-table-column
        prop="address"
        label="最近动态"
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
      optionsValue2: '',
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
  },
  methods: {}
}
</script>

<style scoped>

</style>
