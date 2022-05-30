<template>
  <div class="analysis_cost m98Auto">
    <div class="paddingTB20">
      <el-form  :model="formInline"  label-position="right" label-width="110px" size="mini" class="demo-form-inline">
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
        <el-form-item label="负责人">
          <el-cascader
            :options="optionCascader"
            :props="{ multiple: true, checkStrictly: true }"
            clearable
          />
        </el-form-item>
        <el-form-item label="聊天客服">
          <el-cascader
            :options="optionCascader"
            :props="{ multiple: true, checkStrictly: true }"
            clearable
          />
        </el-form-item>
        <el-form-item label="所属区域">
          <el-select v-model="optionsValue" multiple clearable placeholder="不限">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="品牌">
          <el-select v-model="optionsValue2" clearable placeholder="不限">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="信息来源">
          <el-select v-model="optionsValue" multiple clearable placeholder="不限">
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
        label="品牌"
        width="80"
        align="center"
      />
      <el-table-column
        prop="name"
        label="客户来源"
        align="center"
      />
      <el-table-column
        prop="address"
        label="客户数量"
        align="center"
      />
      <el-table-column
        prop="address"
        label="有效"
        align="center"
      />
      <el-table-column
        prop="address"
        label="有效率"
        align="center"
      />
      <el-table-column
        prop="address"
        label="潜在有效"
        align="center"
      />
      <el-table-column
        prop="address"
        label="潜在有效率"
        align="center"
      />
      <el-table-column
        prop="date"
        label="无效"
        width="80"
        align="center"
      />
      <el-table-column
        prop="name"
        label="无效率"
        align="center"
      />
      <el-table-column
        prop="address"
        label="未知"
        align="center"
      />
      <el-table-column
        prop="address"
        label="来访人数"
        align="center"
      />
      <el-table-column
        prop="address"
        label="成交人数"
        align="center"
      />
      <el-table-column
        prop="address"
        label="来访率"
        align="center"
      />
      <el-table-column
        prop="address"
        label="签约率"
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
  methods: {}
}
</script>

<style scoped lang="scss">
  .analysis_cost {

  }
</style>
