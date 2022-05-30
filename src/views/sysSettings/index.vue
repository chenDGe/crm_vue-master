<template>
  <div class="sys_Setting m98Auto paddingTB15">
    <el-tabs type="border-card">
      <el-tab-pane label="系统设置">
        <el-form ref="form" :model="form" label-width="320px">
          <el-form-item label="回收至项目库/公共库：">
            <el-col :span="11">
              <el-switch v-model="form.recycle_old_users" :inactive-value="0" :active-value="1" @change="onSubmit"/>
            </el-col>
          </el-form-item>
          <el-form-item label="新客户回收至聊天客服：">
            <el-switch v-model="form.recycle_new_users" :inactive-value="0" :active-value="1" @change="onSubmit"/>
          </el-form-item>
          <el-form-item label="跟进总周期：">
            <el-switch v-model="form.follow_up_cycle" :inactive-value="0" :active-value="1" @change="onSubmit"/>
          </el-form-item>
<!--          <el-form-item label="星标客户：">-->
<!--            <el-switch v-model="form.star_customer" :inactive-value="0" :active-value="1" @change="onSubmit"/>-->
<!--          </el-form-item>-->
          <el-form-item label="项目库：">
            <el-switch v-model="form.project_library" :inactive-value="0" :active-value="1" @change="onSubmit"/>
          </el-form-item>
          <el-form-item label="小组库：">
            <el-switch v-model="form.group_library" :inactive-value="0" :active-value="1" @change="onSubmit"/>
          </el-form-item>
          <el-form-item label="留言板客户资源自动对接：">
            <el-switch v-model="form.message_board_customer" :inactive-value="0" :active-value="1" @change="onSubmit"/>
          </el-form-item>
<!--          <el-form-item label="53客户资源自动对接：">-->
<!--            <el-switch v-model="form.customer" :inactive-value="0" :active-value="1" @change="onSubmit"/>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="瑾珑客户资源自动对接：">-->
<!--            <el-switch v-model="form.jl_customer" :inactive-value="0" :active-value="1" @change="onSubmit"/>-->
<!--          </el-form-item>-->
          <el-form-item label="自动分配先按部门分组：">
            <el-switch v-model="form.auto_assign" :inactive-value="0" :active-value="1" @change="onSubmit"/>
          </el-form-item>
          <el-form-item label="是否启用按剩余可自动分配名额递减顺序分配：">
            <el-switch v-model="form.by_remaining" :inactive-value="0" :active-value="1" @change="onSubmit"/>
          </el-form-item>
          <el-form-item label="自动清除录音：">
            <el-switch v-model="form.auto_clear_recording" :inactive-value="0" :active-value="1" @change="onSubmit"/>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="录音通话设置">
        <el-form :model="form" :label-width="formLabelWidth" style="width:500px">
          <el-form-item label="呼出通话时延迟多少秒才开始录音">
            <el-input v-model="form.start_recording" placeholder="请输入" autocomplete="off" />
          </el-form-item>
          <el-form-item label="通话时长低于一定秒数时不上传">
            <el-input v-model="form.min_upload" placeholder="请输入" autocomplete="off" />
          </el-form-item>
          <el-form-item label="录音保留月数">
            <el-input v-model="form.retention_time" placeholder="请输入" autocomplete="off" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="自动分配设置">
        <el-form :model="form" :label-width="formLabelWidth" style="width:500px">
          <el-form-item label="自动分配每天开始时间-结束时间">
            <el-time-select
              v-model="form.day_start"
              placeholder="起始时间"
              :picker-options="{
                start: '00:00',
                step: '00:15',
                end: '23:59'
              }"
            />
            <el-time-select
              v-model="form.day_end"
              placeholder="结束时间"
              :picker-options="{
                start: '00:00',
                step: '00:15',
                end: '23:59',
                minTime: form.day_start
              }"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="客户列表设置">
        <el-form :model="form" label-width="280px" style="width:500px">
          <el-form-item label="已收款的客户只列出多少天以内收款完成的">
            <el-input v-model="form.how_many_days" placeholder="请输入" autocomplete="off" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="短信设置">
        <el-form :model="form" label-width="300px" style="width:500px">
          <el-form-item label="短信签名">
            <el-input v-model="form.sms_sign" placeholder="请输入" autocomplete="off" />
          </el-form-item>
          <el-form-item label="短信模板CODE - 招商专员提交来访计划">
            <el-input v-model="form.sms_tem_visit" placeholder="请输入" autocomplete="off" />
          </el-form-item>
          <el-form-item label="短信模板CODE - 分配商务经理">
            <el-input v-model="form.sms_tem_member" placeholder="请输入" autocomplete="off" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="小组库设置">
        <el-form :model="form" label-width="280px" style="width:500px">
          <el-form-item label="在小组库多少天没人领取自动进项目库">
            <el-input v-model="form.day" placeholder="请输入" autocomplete="off" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { saveSys, indexSys } from '@/api/sys'
export default {
  name: 'Index',
  data() {
    return {
      form: {},
      formLabelWidth: '230px',
      input: '',
      value2: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)]
    }
  },
  mounted() {
    this.indexSys()
  },
  methods: {
    onSubmit() {
      const that = this
      const param = { ...that.form }
      for (const key in param) {
        if (typeof param[key] === 'boolean') {
          param[key] = Number(param[key])// key 是键
        }
      }
      return new Promise((resolve, reject) => {
        saveSys(param).then(res => {
          const { msg } = res
          that.$notify.success({
            message: msg,
            duration: 500
          })
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    indexSys() {
      const that = this
      return new Promise((resolve, reject) => {
        indexSys().then(res => {
          const { data } = res
          that.form = data
          resolve()
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
