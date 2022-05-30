<template>
  <div class="change_password m98Auto border paddingTB15 maTop20">
    <el-form ref="form" style="width: 300px;" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="新密码:" prop="password">
        <el-input v-model="form.password" type="password" />
      </el-form-item>
      <el-form-item label="确认新密码:" prop="new_password">
        <el-input v-model="form.new_password" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="passOk('form')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { pass } from '@/api/user'
import store from '@/store'
export default {
  name: 'Index',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.new_password !== '') {
          this.$refs.form.validateField('new_password')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        password: '',
        new_password: ''
      },
      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        new_password: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
  },
  methods: {
    passOk(formName) {
      const that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          return new Promise((resolve, reject) => {
            pass(that.form).then(res => {
              const { msg } = res
              that.$notify.success({
                message: msg
              })
              store.dispatch('user/resetToken').then(() => {
                location.reload()
              })
              resolve()
            }).catch(err => {
              reject(err)
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
