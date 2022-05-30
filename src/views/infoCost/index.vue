<template>
  <div class="info_cost m98Auto paddingTB20">
    <div class="info_cost_top">
      <el-table
        :data="tableData"
        :show-header="false"
        :span-method="objectSpanMethod"
        border
        size="mini"
        style="width: 100%"
      >
        <el-table-column
          label="日期"
          width="180"
          style="text-align: center"
        >
          <img style="width: 60%" :src="require('@/assets/nav/good.jpg')">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180"
        />
        <el-table-column
          prop="address"
          label="地址"
        />
        <el-table-column
          prop="name2"
          label="姓名"
          width="180"
        />
        <el-table-column
          prop="address2"
          label="地址"
        />
      </el-table>
      <el-divider content-position="left">客户信息</el-divider>
      <el-tabs type="border-card">
        <el-tab-pane label="基本资料">
          <el-tooltip class="item" effect="dark" content="编辑资料" placement="bottom">
            <el-button class="maBot20" type="primary" icon="el-icon-edit" circle @click="dialogFormVisible4 = true" />
          </el-tooltip>
          <el-tooltip v-if="!is_owner" class="item" effect="dark" content="领取客户" placement="bottom">
            <el-button class="maBot20" type="success" title="领取客户" icon="el-icon-thumb" circle @click="receiveCustomer()" />
          </el-tooltip>
          <el-tooltip v-if="is_owner" class="item" effect="dark" content="放弃跟进客户" placement="bottom">
            <el-button class="maBot20" type="danger" title="放弃跟进客户" icon="el-icon-delete" circle @click="dialogFormVisible6 = true" />
          </el-tooltip>

          <!--          el-icon-thumb-->

          <el-table
            :data="tableData2"
            :show-header="false"
            border
            size="mini"
            style="width: 100%"
          >
            <el-table-column
              prop="name"
              label="姓名"
              width="180"
            />
            <el-table-column
              prop="address"
              label="地址"
            />
            <el-table-column
              prop="name2"
              label="姓名"
              width="180"
            />
            <el-table-column
              prop="address2"
              label="地址"
            />
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="商务资料">
          <el-button class="maBot20" type="primary" icon="el-icon-edit" circle @click="dialogFormVisible5 = true" />
          <el-table
            :data="tableData3"
            :show-header="false"
            border
            size="mini"
            style="width: 100%"
          >
            <el-table-column
              prop="name"
              label="姓名"
              width="180"
            />
            <el-table-column
              prop="address"
              label="姓名"
              width="180"
            />
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="客户标签">
<!--          <el-divider content-position="left">客户标签</el-divider>-->
          <el-button class="maBot20" type="primary" icon="el-icon-edit" circle @click="dialogFormVisible3 = true" />
          <div class="tag">
            <span>意向等级：</span>
            <el-radio-group v-model="level" class="item_margin_15" size="mini" @change="saveLabelCustomer">
              <el-radio :label="1" border>A级客户</el-radio>
              <el-radio :label="2" border>B级客户</el-radio>
              <el-radio :label="3" border>C级客户</el-radio>
            </el-radio-group>
          </div>
          <!--      status-->
          <div class="tag">
            <span>签约状态：</span>
            <el-radio-group v-model="status" class="item_margin_15" size="mini" @change="statusGroup">
              <el-radio :label="3" border>已签约</el-radio>
              <el-radio :label="4" border>未签约</el-radio>
            </el-radio-group>
          </div>
          <div v-for="item in labelData" :key="item.id" class="tag">
            <span>{{ item.name }}：</span>
            <el-tag v-for="childItem in item.child" :key="childItem.id" class="item_margin_15" type="success">{{ childItem.name }}</el-tag>
          </div>
        </el-tab-pane>
      </el-tabs>
      <el-divider content-position="left">沟通方式</el-divider>
      <!--      iphoneBE//BEIphone-->
      <!--      <el-button type="success" class="el-icon-phone-outline" @click="iphoneBE">北恩拨打客户电话</el-button>-->
      <el-button type="success" class="el-icon-phone-outline" @click="BEIphone">拨打客户电话(贝恩端)</el-button>
      <span class="paddingLeft15 font12">电话连接状态：<i :class="['fontWeight600', iphone_flag === '正在连接电话...'? 'colorDuf':(iphone_flag==='连接成功'?'colorSuc': 'colorWin')]">{{ iphone_flag }}</i></span>

      <el-divider content-position="left">商务跟进</el-divider>
      <div class="business">
        <span>商务经理：</span>
        <span>无</span>
      </div>
      <el-divider content-position="left">快捷跳转</el-divider>
      <el-button size="mini" :disabled="Boolean(indexFlag[0])" @click="currentList($route.query.topId, 'top')">上一条</el-button>
      <el-button size="mini" :disabled="Boolean(indexFlag[1])" @click="currentList($route.query.nextId, 'next')">下一条</el-button>
      <div class="business">
        <el-divider content-position="left">来访计划</el-divider>
        <div class="height50 paddingTB20 maBot10">
          <el-button type="primary" size="mini" @click="newInfoCost('新增')">新增来访计划</el-button>
        </div>
        <el-table
          :data="tableData4"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="look_time"
            label="来访时间"
            width="320"
          />
          <el-table-column
            prop="company_name"
            label="来访公司"
          />
          <el-table-column
            prop="status"
            label="状态"
            width="180"
          />
          <el-table-column
            prop="address"
            width="180"
            label="操作"
          >
            <template slot-scope="scope">
              <el-link type="primary" @click="newInfoCost('编辑', scope.row)">修改</el-link>
              <el-link class="paddingLeft15" type="warning" @click="cancelPlanCustomer(scope.row.id)">取消</el-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-divider content-position="left">跟进记录</el-divider>
      <el-input v-model="log" type="textarea" placeholder="输入客户跟进记录" />
      <div class="height50">
        <el-button type="primary" class="maTop20 flRight" :disabled="log === ''" size="mini" @click="remarkCustomer">添加记录</el-button>
      </div>
      <el-timeline class="border paddingTB15 maTop20">
        <el-timeline-item
          v-for="(activity, index) in logsData"
          :key="index"
          :color="activity.color"
          size="large"
          :timestamp="activity.realname + activity.remark">
          {{activity.created_at}}
        </el-timeline-item>
      </el-timeline>

      <el-divider content-position="left">提醒</el-divider>
      <el-button size="mini" @click="dialogFormVisible2 = true">预约提醒</el-button>
    </div>
    <!-- 放弃跟进客户 弹框 dialogFormVisible6-->
    <el-dialog title="放弃跟进客户" width="400px" :visible.sync="dialogFormVisible6">
      <el-form :model="form" size="mini">
        <el-input v-model="discardCust" type="textarea" placeholder="请填写放弃原因" />
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible6 = false">取 消</el-button>
        <el-button type="primary" :disabled="discardCust === ''" @click="discardCustomer">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 来访计划  弹框-->
    <el-dialog :title="`${dialogTitle}`+ '来访计划'" width="500px" :visible.sync="dialogFormVisible">
      <el-form :model="planForm" size="mini">
        <el-form-item label="联系人名字" :label-width="formLabelWidth">
          <el-input v-model="planForm.name" autocomplete="off" placeholder="请输入联系人名字" />
        </el-form-item>
        <el-form-item label="联系人性别" :label-width="formLabelWidth">
          <el-select v-model="planForm.sex" value="0" placeholder="请选择性别">
            <el-option label="男" :value="0" />
            <el-option label="女" :value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="联系人手机" :label-width="formLabelWidth">
          <el-input v-model="planForm.mobile" autocomplete="off" placeholder="请输入联系人手机" />
        </el-form-item>
        <el-form-item label="来访公司" :label-width="formLabelWidth">
          <el-select v-model="planForm.company_id" placeholder="请选择">
            <el-option
              v-for="item in companyOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="来访日期" :label-width="formLabelWidth">
          <el-date-picker
            v-model="planForm.look_time "
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
          />
        </el-form-item>
        <el-form-item label="考察品牌" :label-width="formLabelWidth">
          <el-select v-model="planForm.brand_id" placeholder="请选择">
            <el-option
              v-for="item in brandOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="是否派车" :label-width="formLabelWidth">
          <el-checkbox v-model="planForm.is_car" :true-label="0" :false-label="1">是</el-checkbox>
        </el-form-item>
        <el-form-item label="来访人数" :label-width="formLabelWidth">
          <el-input v-model="planForm.person_number" autocomplete="off" placeholder="请输入来访人数" />
        </el-form-item>
        <el-form-item label="来访人员关系" :label-width="formLabelWidth" widht="300">
          <el-input v-model="planForm.member_relation" type="textarea" placeholder="请输入来访人员关系" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="savePlanCustomer">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 预约提醒  弹框-->
    <el-dialog :title="`${dialogTitle2}`+ '预约提醒'" width="400px" :visible.sync="dialogFormVisible2">
      <el-form :model="form" size="mini">
        <el-date-picker
          v-model="notify_time"
          type="datetime"
          placeholder="选择日期时间"
          default-time="12:00:00"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="notifyCustomer">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 客户标签  弹框-->
    <el-dialog :title="`${dialogTitle3}`+ '客户标签'" class="minWith400" :visible.sync="dialogFormVisible3">
      <el-form :model="form" size="mini">
        <el-form-item v-for="item in labelsOption" :key="item.id" :label="item.name">
          <el-checkbox-group v-model="checkList">
            <el-checkbox v-for="childItem in item.child" :key="childItem.id" :label="childItem.id">{{ childItem.name }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="saveLabelCustomer">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 基本资料  弹框-->
    <el-dialog :title="`${dialogTitle3}`+ '基本资料'" width="400px" :visible.sync="dialogFormVisible4">
      <el-form :model="form" size="mini" :label-width="formLabelWidth2">
        <el-form-item label="姓名:">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="性别:">
          <el-select v-model="form.sex" value="0" placeholder="请选择性别">
            <el-option label="男" :value="0" />
            <el-option label="女" :value="1" />
          </el-select>
        </el-form-item>
        <!--        <el-form-item label="地区:">-->
        <!--          <el-input />-->
        <!--        </el-form-item>-->
        <el-form-item label="手机1:">
          <el-input v-model="form.mobile1" />
        </el-form-item>
        <el-form-item label="手机2:">
          <el-input v-model="form.mobile2" />
        </el-form-item>
        <el-form-item label="QQ:">
          <el-input v-model="form.qq" />
        </el-form-item>
        <el-form-item label="微信:">
          <el-input v-model="form.wechat" />
        </el-form-item>
        <el-form-item label="备注:">
          <el-input v-model="form.remark" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible4 = false">取 消</el-button>
        <el-button type="primary" @click="editCost">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 商务资料  弹框-->
    <el-dialog :title="`${dialogTitle3}`+ '商务资料'" width="400px" :visible.sync="dialogFormVisible5">
      <el-form :model="form" size="mini" :label-width="formLabelWidth2">
        <el-form-item label="生日:">
          <el-date-picker
            v-model="birthday"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible5 = false">取 消</el-button>
        <el-button type="primary" @click="updateCustomer">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { signCustomer, failCustomer, uploadCustomer, receiveCustomer, discardCustomer, saveLabelCustomer, updateCustomer, cancelPlanCustomer, notifyCustomer, remarkCustomer, visitorPlanCustomer, brandResource, detailCustomer, labelsCustomer, saveResource, savePlanCustomer } from '@/api/dhkfApi'
import { formatDateTime, recordDateTime, TimeDifference } from '@/js/common'
export default {
  name: 'Index',
  data() {
    return {
      tableData: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
      logsData: [],
      labelData: [],
      labelsOption: [],
      formLabelWidth2: '60px',
      formLabelWidth: '120px',
      form: {},
      planForm: {
        is_car: 0
      },
      log: '',
      notify_time: '',
      current: '',
      discardCust: '',
      brandOptions: [],
      companyOptions: [],
      indexFlag: [],
      costData: [],
      radio: 1,
      checkList: [],
      checked: false,
      value1: '',
      dialogTitle: '' || '新增',
      dialogTitle2: '' || '编辑',
      dialogTitle3: '' || '编辑',
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      dialogFormVisible4: false,
      dialogFormVisible5: false,
      dialogFormVisible6: false,
      is_owner: 0, // 是否当前跟进人 0false 1 true
      value3: '',
      costId: '', // 客户ID
      birthday: '',
      iphoneId: '',
      iphone_flag: '正在连接电话...',
      iphoneUploadForm: {
        file: {},
        customer_id: '',
        start_time: '',
        end_time: '',
        type: 2,
        time: 0
      },
      recordTime: {
        star: '',
        end: ''
      },
      ringFlag: '',
      level: '',
      status: ''
    }
  },
  mounted() {
    this.costId = this.$route.query.id
    this.indexFlag = this.$route.query.index
    this.current = this.$route.query.current
    this.costData = this.$route.query.data
    this.detailCustomer()
    this.labelsCustomer()
    this.brandResource()
    this.findDepartment()
    // websocket
    this.initWebSocket()
  },
  methods: {
    editCost() {
      const that = this
      that.form['id'] = that.costId
      return new Promise((resolve, reject) => {
        saveResource(that.form).then(res => {
          that.dialogFormVisible4 = false
          const { msg } = res
          that.$notify.success({
            message: msg
          })
          that.detailCustomer()
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    detailCustomer() {
      const that = this
      return new Promise((resolve, reject) => {
        detailCustomer({ id: that.costId }).then(res => {
          const { data } = res
          that.form = data
          that.tableData = [
            {
              name: '客户姓名：',
              address: data.name,
              name2: '跟进人：',
              address2: data.owner_name
            }, {
              name: '咨询品牌：',
              address: data.brand_name,
              name2: '咨询页面',
              address2: data.page_url
            }, {
              name: '访问来源：',
              address: data.source,
              name2: '跟进总期限：',
              address2: data.follow_up_time
            }
          ]
          that.tableData2 = [
            {
              name: '名字：',
              address: data.name,
              name2: '地区：',
              address2: data.area_info
            }, {
              name: '手机1：',
              address: data.mobile1,
              name2: '手机2',
              address2: data.mobile2
            }, {
              name: 'QQ：',
              address: data.qq,
              name2: '微信：',
              address2: data.wechat
            }, {
              name: '备注：',
              address: data.remark
            }]
          that.tableData3 = [{
            name: '生日：',
            address: data.birthday
          }]
          that.birthday = data.birthday
          that.tableData4 = data.plans
          that.logsData = data.logs
          that.labelData = data.labels
          that.is_owner = data.is_owner
          that.level = data.level
          that.status = data.status
          that.checkList = []
          data.labels.forEach(item => {
            item.child.forEach(childItem => {
              that.checkList.push(childItem.id)
            })
          })
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    /** 获取品牌 **/
    brandResource() {
      const that = this
      return new Promise((resolve, reject) => {
        brandResource().then(res => {
          const { data } = res
          that.brandOptions = data
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    /** 获取标签分组信息 **/
    labelsCustomer() {
      const that = this
      return new Promise((resolve, reject) => {
        labelsCustomer().then(res => {
          const { data } = res
          that.labelsOption = data
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) { // 选择合并哪一列
        if (rowIndex % this.tableData.length === 0) { // 合并多少行
          return {
            rowspan: this.tableData.length, // 要合并的行数
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    newInfoCost(title, item) {
      this.dialogTitle = title
      this.dialogFormVisible = true
      this.planForm = { ...item }
      console.log(item)
    },
    /** 保存来访计划 **/
    savePlanCustomer() {
      const that = this
      that.planForm['customer_id'] = that.costId
      return new Promise((resolve, reject) => {
        savePlanCustomer(that.planForm).then(res => {
          that.dialogFormVisible = false
          const { msg } = res
          that.$notify.success({
            message: msg
          })
          that.detailCustomer()
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    findDepartment() {
      return new Promise((resolve, reject) => {
        const that = this
        visitorPlanCustomer().then(res => {
          const { data } = res
          that.companyOptions = data
          resolve()
        }).catch(err => {
          console.log(err)
          reject()
        })
      })
    },
    /** 更新客户记录 **/
    remarkCustomer() {
      const that = this
      return new Promise((resolve, reject) => {
        remarkCustomer({ id: that.costId, remark: that.log }).then(res => {
          const { msg } = res
          that.$notify.success({
            message: msg
          })
          that.detailCustomer()
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    /** 上一条 下一条 **/
    currentList(id, type) {
      const that = this
      const length = this.$route.query.length
      if (type === 'top') {
        that.current = that.current - 1
      } else if (type === 'next') {
        that.current = that.current + 1
      }
      that.costId = that.costData[that.current].id
      that.indexFlag = []
      that.indexFlag.push(that.current === 0)
      that.indexFlag.push(that.current === length - 1)
      that.detailCustomer()
    },
    /** 预约消息提醒 **/
    notifyCustomer(id) {
      const that = this
      return new Promise((resolve, reject) => {
        notifyCustomer({ id: that.costId, notify_time: that.notify_time }).then(res => {
          that.dialogFormVisible2 = false
          const { msg } = res
          that.$notify.success({
            message: msg
          })
          // that.detailCustomer()
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    /** 取消来访计划 **/
    cancelPlanCustomer(id) {
      const that = this
      return new Promise((resolve, reject) => {
        cancelPlanCustomer({ id: id }).then(res => {
          const { msg } = res
          that.$notify.success({
            message: msg
          })
          that.detailCustomer()
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    /** 修改生日 **/
    updateCustomer() {
      const that = this
      return new Promise((resolve, reject) => {
        updateCustomer({ id: that.costId, birthday: that.birthday }).then(res => {
          that.dialogFormVisible5 = false
          const { msg } = res
          that.$notify.success({
            message: msg
          })
          that.detailCustomer()
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    /** 保存标签 **/
    saveLabelCustomer() {
      const that = this
      return new Promise((resolve, reject) => {
        saveLabelCustomer({ customer_id: that.costId, label_ids: that.checkList.toString(), level: that.level }).then(res => {
          const { msg } = res
          that.$notify.success({
            message: msg
          })
          that.dialogFormVisible3 = false
          that.detailCustomer()
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    /** 更新客户签约状态**/
    statusGroup() {
      const that = this
      if (that.status === 3) {
        that.signCustomer()
      } else if (that.status === 4) {
        that.failCustomer()
      }
    },
    signCustomer() {
      const that = this
      return new Promise((resolve, reject) => {
        signCustomer({ customer_id: that.costId }).then(res => {
          const { msg } = res
          that.$notify.success({
            message: msg
          })
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    failCustomer() {
      const that = this
      return new Promise((resolve, reject) => {
        failCustomer({ customer_id: that.costId }).then(res => {
          const { msg } = res
          that.$notify.success({
            message: msg
          })
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    /** 放弃跟进人 **/
    discardCustomer() {
      const that = this
      return new Promise((resolve, reject) => {
        discardCustomer({ id: that.costId, remark: that.discardCust }).then(res => {
          that.dialogFormVisible5 = false
          const { msg } = res
          that.$notify.success({
            message: msg
          })
          that.$router.push({ name: 'groupLibrary' })
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    /** 领取客户 **/
    receiveCustomer() {
      const that = this
      return new Promise((resolve, reject) => {
        receiveCustomer({ customer_id: that.costId }).then(res => {
          const { msg } = res
          that.$notify.success({
            message: msg
          })
          // that.groupCustomer()
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    /** 上传通话记录 **/
    uploadCustomer(file, time) {
      const that = this
      const params = new FormData()
      that.iphoneUploadForm.file = file
      that.iphoneUploadForm.time = time
      that.iphoneUploadForm.customer_id = that.costId
      params.append('file', that.iphoneUploadForm.file)
      params.append('time', that.iphoneUploadForm.time)
      params.append('start_time', that.iphoneUploadForm.start_time)
      params.append('end_time', that.iphoneUploadForm.end_time)
      params.append('type', that.iphoneUploadForm.type)
      params.append('customer_id', that.costId)
      return new Promise((resolve, reject) => {
        uploadCustomer(params).then(res => {
          const { msg } = res
          that.$notify.success({
            message: msg
          })
          // 清空信息
          that.iphoneUploadForm = {
            file: {},
            customer_id: '',
            start_time: '',
            end_time: '',
            type: 2,
            time: 0
          }
          that.detailCustomer()
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    /** 北恩打电话 **/
    iphoneBE() {
      const ws = new WebSocket('ws://localhost/?sid=1591961944860&flag=1')
      ws.onopen = () => {
        // 北恩
        // Web Socket 已连接上，使用 send() 方法发送数据
        // 指定设备编号Para初始化，返回当前设备串号，传0即可。必须最开始调用。
        const param2 = { req: 'HP_Init', rid: 1, para: { Para: '0' }}
        // 发送摘机命令
        const param3 = { req: 'HP_OffHookCtrl', rid: 3, para: {}}
        // 发送挂机命令
        const param4 = { req: 'HP_HangUpCtrl', rid: 4, para: {}}
        // 指定号码发送拨号命令
        const param5 = { req: 'HP_StartDial', rid: 5, para: { para: this.form.mobile1 }}
        ws.send(JSON.stringify(param2))
        ws.send(JSON.stringify(param3))
        ws.send(JSON.stringify(param4))
        ws.send(JSON.stringify(param5))
        console.log('数据发送中...')
      }
      ws.onmessage = evt => {
        // console.log('数据已接收...')
      }
      ws.onclose = function() {
        // 关闭 websocket
        console.log('连接已关闭...')
      }
      // 路由跳转时结束websocket链接
      this.$router.afterEach(function() {
        ws.close()
      })
    },
    /** 贝恩打电话 **/
    BEIphone() {
      const iphone = this.form.mobile1 || this.form.mobile2
      this.iphoneUploadForm.start_time = formatDateTime(new Date())
      // 开始拨号
      const actions = {
        'event': 'SendDtmf',
        'handle': this.iphoneId || 513,
        'dtmf': iphone
      }
      this.websocketsend(JSON.stringify(actions))
    },
    info() {
      const ws = new WebSocket('ws://127.0.0.1:8054/')
      ws.open = () => {
        const param = { event: 'getinfo' }
        ws.send(JSON.stringify(param))
      }
    },
    initWebSocket() { // 初始化weosocket msg.event == 'callerId'
      const wsUri = 'ws://127.0.0.1:8054/'
      this.websock = new WebSocket(wsUri)
      this.websock.onmessage = this.websocketonmessage
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.websock.onclose = this.websocketclose
    },
    websocketsend(Data) { // 数据发送
      this.websock.send(Data)
    },
    websocketclose(e) { // 关闭
      this.iphone_flag = '断开连接'
      // console.log('断开连接', e)
    },
    websocketonopen() { // 连接建立之后执行send方法发送数据
      this.iphone_flag = '连接成功'
      const actions = { event: 'getinfo' }
      this.websocketsend(JSON.stringify(actions))
    },
    websocketonerror() { // 连接建立失败重连
      this.iphone_flag = '电话初始化失败，请重新尝试(检查驱动或电话线是否启动)'
      this.initWebSocket()
    },
    websocketonmessage(e) { // 数据接收
      const redata = JSON.parse(e.data)
      // console.log(redata)
      if (redata.event === 'getinfo') {
        if (redata.channels.length > 0) {
          this.iphoneId = redata.channels[0].handle
        } else {
          this.iphone_flag = '连接成功'
        }
      } else if (redata.event === 'plug') {
        this.iphone_flag = '设备已插入'
      } else if (redata.event === 'plugout') {
        this.iphone_flag = '设备已拔出'
      } else if (redata.event === 'hookoff') {
        this.iphone_flag = '已摘起电话机'
        const starRecordTime = recordDateTime(new Date())
        const recordUrl = 'D:\\record\\OUT_' + starRecordTime + '.wav'
        const redoActions = {
          'event': 'RecordFile',
          'handle': this.iphoneId || 513,
          'filename': recordUrl,
          'codec': 0
        }
        this.recordTime.star = starRecordTime
        this.iphoneUploadForm.start_time = formatDateTime(new Date())
        this.websocketsend(JSON.stringify(redoActions))
      } else if (redata.event === 'dtmfdown') {
        this.ringFlag = ''
        this.iphone_flag = '正在拨号'
      } else if (redata.event === 'CallOutFinish') {
        this.iphoneUploadForm.type = 2
        this.iphone_flag = '拨号完成'
      } else if (redata.event === 'hookup') {
        this.iphoneUploadForm.end_time = formatDateTime(new Date())
        const endRecordTime = recordDateTime(new Date())
        const msg = {
          'event': 'StopRecord',
          'handle': this.iphoneId || 513
        }
        this.recordTime.end = endRecordTime
        const timeFlag = TimeDifference(this.recordTime.end, this.recordTime.star)
        const recordUrl = 'D:\\record\\OUT_' + this.recordTime.star + '.wav'
        // 少于一分钟 删除文件
        if (window.require !== undefined) {
          const { ipcRenderer } = window.require('electron')
          if (timeFlag < 60) {
            // 删除文件
            ipcRenderer.send('file_url', { url: recordUrl, flag: 'del' })
            this.uploadCustomer({}, timeFlag)
          } else {
            const that = this
            ipcRenderer.send('file_url', { url: recordUrl, flag: 'add' })
            ipcRenderer.on('file', function(event, arg) {
              that.uploadCustomer(arg, timeFlag)
            })
          }
        }
        this.websocketsend(JSON.stringify(msg))
        this.iphone_flag = '通话完成'
      } else if (redata.event === 'ring' || redata.event === 'ringstop') {
        this.iphone_flag = '有新的来电'
        this.ringFlag = 'ring'
        this.iphoneUploadForm.type = 1
      } else if (redata.event === 'callerId') {
        this.$notify({
          title: '来电提醒',
          type: 'warning',
          duration: 0,
          message: '来电号码为：' + redata.callernumber
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
 .info_cost {
   table {
     img {
       width: 100%;
       border-radius: 5px;
     }
   }
   .business {
      font-weight: 600;
   }
   .tag {
     height: 60px;
     span:nth-child(1) {
       padding-right: 10px;
     }
   }
 }
</style>
