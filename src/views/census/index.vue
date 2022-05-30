<template>
  <div class="m98Auto paddingTB20">
    <el-tabs v-model="elTabsId" type="border-card" @tab-click="statisticsCustomer">
      <el-tab-pane label="通话次数" lazy>
        <ve-line :data="chartData1" :settings="chartSettings1" />
      </el-tab-pane>
      <el-tab-pane label="总通话时长" lazy>
        <ve-line :data="chartData2" :settings="chartSettings2" />
      </el-tab-pane>
      <el-tab-pane label="平均通话时长" lazy>
        <ve-line :data="chartData3" :settings="chartSettings3" />
      </el-tab-pane>
      <el-tab-pane label="联系客户数" lazy>
        <ve-line :data="chartData4" :settings="chartSettings4" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Vue from 'vue'
import { statisticsCustomer } from '@/api/dhkfApi'
import VeLine from 'v-charts/lib/line.common'

Vue.component(VeLine.name, VeLine)

export default {
  name: 'Index',
  data() {
    return {
      elTabsId: '0',
      chartData1: {
        columns: ['日期', '通话次数'],
        rows: []
      },
      chartData2: {
        columns: ['日期', '总通话时长'],
        rows: []
      },
      chartData3: {
        columns: ['日期', '平均通话时长'],
        rows: []
      },
      chartData4: {
        columns: ['日期', '联系客户数'],
        rows: []
      },
      chartSettings1: { yAxisName: ['次'] },
      chartSettings2: { yAxisName: ['时长(分钟)'] },
      chartSettings3: { yAxisName: ['时长(分钟)'] },
      chartSettings4: { yAxisName: ['总数'] }
    }
  },
  mounted() {
    this.statisticsCustomer()
  },
  methods: {
    // 呼叫类型,1通话次数,2总通话时长s,3平均通话时长s,4.联系客户数.
    statisticsCustomer() {
      const that = this
      return new Promise((resolve, reject) => {
        const tabIndex = Number(that.elTabsId) + 1
        statisticsCustomer({ type: Number(that.elTabsId) + 1 }).then(res => {
          const { data } = res
          if (tabIndex === 1) {
            that.chartData1.rows = []
            for (const tmp in data) {
              const param = { '日期': tmp, '通话次数': data[tmp] }
              that.chartData1.rows.push(param)
            }
          } else if (tabIndex === 2) {
            that.chartData2.rows = []
            for (const tmp in data) {
              const param = { '日期': tmp, '总通话时长': data[tmp] }
              that.chartData2.rows.push(param)
            }
          } else if (tabIndex === 3) {
            that.chartData3.rows = []
            for (const tmp in data) {
              const param = { '日期': tmp, '平均通话时长': data[tmp] }
              that.chartData3.rows.push(param)
            }
          } else if (tabIndex === 4) {
            that.chartData4.rows = []
            for (const tmp in data) {
              const param = { '日期': tmp, '联系客户数': data[tmp] }
              that.chartData4.rows.push(param)
            }
          }
          resolve(res)
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
