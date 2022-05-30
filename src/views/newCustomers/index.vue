<template>
  <div class="new_customers m98Auto paddingTB20">
    <el-form :model="form" size="mini" style="width: 300px;">
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input v-model="form.name" placeholder="请输入姓名" autocomplete="off" />
      </el-form-item>
      <el-form-item label="性别" :label-width="formLabelWidth">
        <el-select v-model="form.sex" value="0" placeholder="请选择性别">
          <el-option label="男" value="0" />
          <el-option label="女" value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="地区" :label-width="formLabelWidth">
        <el-col :span="24">
          <el-select v-model="form.addressId" placeholder="选择省份">
            <el-option
              v-for="item in addressOption"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-col>
        <el-col :span="24">
          <el-select v-model="form.regionId" placeholder="选择市区" @focus="regionSelect">
            <el-option
              v-for="item in regionOption"
              :key="item.city_id"
              :label="item.name"
              :value="item.city_id"
            />
          </el-select>
        </el-col>
        <el-col :span="24">
          <el-select v-model="form.marketId" placeholder="选择地区" @focus="marketSelect">
            <el-option
              v-for="item in marketOption"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="咨询品牌" :label-width="formLabelWidth">
        <el-select v-model="form.brand_id" placeholder="请选择品牌">
          <el-option
            v-for="item in brandOption"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="信息来源" :label-width="formLabelWidth">
        <el-select v-model="form.label_ids_as" multiple placeholder="请选择信息来源">
          <el-option
            v-for="item in infoOption"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="手机1" :label-width="formLabelWidth">
        <el-input v-model="form.mobile1" autocomplete="off" placeholder="请输入手机1" />
      </el-form-item>
      <el-form-item label="手机2" :label-width="formLabelWidth">
        <el-input v-model="form.mobile2" autocomplete="off" placeholder="请输入手机2" />
      </el-form-item>
      <el-form-item label="QQ" :label-width="formLabelWidth">
        <el-input v-model="form.qq" autocomplete="off" placeholder="请输入QQ" />
      </el-form-item>
      <el-form-item label="微信" :label-width="formLabelWidth">
        <el-input v-model="form.wechat" autocomplete="off" placeholder="请输入微信" />
      </el-form-item>
      <el-form-item label="咨询页面" :label-width="formLabelWidth">
        <el-input v-model="form.page_url" autocomplete="off" placeholder="请输入咨询页面" />
      </el-form-item>
      <el-form-item label="访问来源" :label-width="formLabelWidth">
        <el-input v-model="form.source" autocomplete="off" placeholder="请输入访问来源" />
      </el-form-item>
      <el-form-item label="备注" :label-width="formLabelWidth" widht="300">
        <el-input v-model="form.remark" type="textarea" placeholder="请输入备注" />
      </el-form-item>
    </el-form>
    <div slot="footer" :style="'padding-left:'+ formLabelWidth" class="dialog-footer">
      <el-button @click="restParam">清 空</el-button>
      <el-button type="primary" @click="saveResource">确 定</el-button>
    </div>
  </div>
</template>

<script>
import { saveResource, areaResource, brandResource, labelCustomer } from '@/api/dhkfApi'
export default {
  name: 'Index',
  data() {
    return {
      formLabelWidth: '120px',
      form: {
        addressId: '',
        regionId: '',
        marketId: '',
        name: '',
        sex: '',
        area: '',
        brand_id: '',
        mobile1: '',
        mobile2: '',
        qq: '',
        wechat: '',
        page_url: '',
        source: '',
        remark: '',
        label_ids_as: [],
        label_ids: ''
      },
      options: [],
      value1: '',
      infoOption: [],
      addressOption: [],
      regionOption: [],
      marketOption: [],
      brandOption: []
    }
  },
  mounted() {
    this.areaResource()
    this.brandResource()
    this.labelCustomer()
  },
  methods: {
    saveResource() {
      const that = this
      console.log(that.form)
      that.form.area = that.form.marketId
      that.form.label_ids = that.form.label_ids_as.toString()
      return new Promise((resolve, reject) => {
        saveResource(that.form).then(res => {
          that.$notify.success({
            message: '创建成功',
            duration: 1000
          })
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    areaResource(id, level) {
      const that = this
      const param = {
        id: id || 0,
        level: level || 1
      }
      return new Promise((resolve, reject) => {
        areaResource(param).then(res => {
          const { data } = res
          if (param.level === 1) {
            that.addressOption = data
          } else if (param.level === 2) {
            that.regionOption = data
          } else if (param.level === 3) {
            that.marketOption = data
          }
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    regionSelect() {
      const that = this
      that.areaResource(that.form.addressId, 2)
    },
    marketSelect() {
      const that = this
      that.areaResource(that.form.regionId, 3)
    },
    brandResource() {
      const that = this
      return new Promise((resolve, reject) => {
        brandResource().then(res => {
          const { data } = res
          that.brandOption = data
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    labelCustomer() {
      const that = this
      return new Promise((resolve, reject) => {
        labelCustomer().then(res => {
          const { data } = res
          that.infoOption = data
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    restParam() {
      const that = this
      that.form = {
        addressId: '',
        regionId: '',
        marketId: '',
        name: '',
        sex: '',
        area: '',
        brand_id: '',
        mobile1: '',
        mobile2: '',
        qq: '',
        wechat: '',
        page_url: '',
        source: '',
        remark: '',
        label_ids_as: [],
        label_ids: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
