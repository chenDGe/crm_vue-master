<template>
  <div class="phone_settings m98Auto border paddingTB15 maTop20">
    <el-form ref="form" style="width: 300px;" :model="form" label-width="130px">
      <el-form-item label="所在城市区号:	">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="外地手机加拨前缀:	">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      form: {
        name: '',
        name2: ''
      }
    }
  },
  mounted() {
  },
  methods: {}
}
</script>

<style scoped>

</style>
