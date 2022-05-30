<template>
  <div class="allocated_cost m98Auto">
    <div class="pro_top_button">
      <el-button type="success" icon="el-icon-plus" size="small" @click="newAllocated('新增')">新增</el-button>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="date"
        label="ID"
        width="80"
        align="center">
      </el-table-column>
      <el-table-column
        prop="name"
        label="客户名字"
        align="center">
      </el-table-column>
      <el-table-column
        prop="address"
        label="咨询品牌"
        align="center">
      </el-table-column>
      <el-table-column
        prop="address"
        label="最后分配类型"
        align="center">
      </el-table-column>
      <el-table-column
        prop="address"
        label="最后分配时间"
        align="center">
      </el-table-column>
      <el-table-column
        prop="address"
        label="最后分配失败原因"
        align="center">
      </el-table-column>
      <el-table-column
        prop="address"
        label="创建时间"
        align="center">
      </el-table-column>
      <el-table-column
        label="操作"
        width="230"
        align="center"
      >
        <template :slot-scope="scope">
          <el-button type="danger" icon="el-icon-refresh-left" size="mini">重新自动分配</el-button>
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="newAllocated('编辑')">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--  弹框-->
    <el-dialog :title="`${dialogTitle}`+ '客户信息'" width="500px" style="margin-top: 6vh;" :visible.sync="dialogFormVisible">
      <el-form :model="form" size="mini">
        <el-form-item label="姓名" :label-width="formLabelWidth" placeholder="请输入姓名">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select v-model="form.region" value="0" placeholder="请选择性别">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地区" :label-width="formLabelWidth">
          <el-cascader
            placeholder="选择/搜索地区"
            :options="options"
            filterable></el-cascader>
        </el-form-item>
        <el-form-item label="咨询品牌" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择品牌">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择员工" :label-width="formLabelWidth">
          <el-cascader
            placeholder="选择/搜索员工"
            :options="options"
            filterable></el-cascader>
        </el-form-item>
        <el-form-item label="信息来源" :label-width="formLabelWidth">
          <el-select v-model="value1" multiple placeholder="请选择信息来源">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机1" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" placeholder="请输入手机1"></el-input>
        </el-form-item>
        <el-form-item label="手机2" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" placeholder="请输入手机2"></el-input>
        </el-form-item>
        <el-form-item label="QQ" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" placeholder="请输入QQ"></el-input>
        </el-form-item>
        <el-form-item label="微信" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" placeholder="请输入微信"></el-input>
        </el-form-item>
        <el-form-item label="咨询页面" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" placeholder="请输入咨询页面"></el-input>
        </el-form-item>
        <el-form-item label="访问来源" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" placeholder="请输入访问来源"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth" widht="300">
          <el-input type="textarea" placeholder="请输入备注"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
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
      formLabelWidth: '120px',
      dialogTitle: '' || '新增',
      dialogFormVisible: false,
      form: {},
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }]
      }],
      value1: '',
      options2: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }]
    }
  },
  mounted() {
  },
  methods: {
    newAllocated(title) {
      this.dialogTitle = title
      this.dialogFormVisible = true
    }
  }
}
</script>

<style scoped lang="scss">
  .allocated_cost {

  }
</style>
