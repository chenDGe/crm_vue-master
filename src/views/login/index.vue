<template>
  <div class="login-container">
    <div id="login">
      <div class="login_content">
        <div class="login_system_title web-font">大哥来根华子</div>
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
          <el-form-item prop="username">
            <div class="info_email info_input_class">
              <el-input
                ref="username"
                v-model="loginForm.username"
                placeholder="输入账号"
                name="username"
                type="text"
                tabindex="1"
                auto-complete="off"
              />
            </div>
          </el-form-item>
          <el-form-item prop="password">
            <div class="info_password info_input_class">
              <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                :type="passwordType"
                placeholder="输入密码"
                name="password"
                tabindex="2"
                auto-complete="on"
                @keyup.enter.native="handleLogin"
              />
            </div>
          </el-form-item>
          <div class="login_button cpointer" :loading="loading" type="primary" @click.native.prevent="handleLogin" @click="handleLogin()">登录</div>
        </el-form>
      </div>
      <div class="info_tip">
        <span>社区</span>
        <span>隐私</span>
        <span>问题</span>
        <span>团队</span>
        <span>内容</span>
        <span>英文</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '请输入姓名' }],
        password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          console.log('index.vue ===  开始')
          this.$store.dispatch('user/login', this.loginForm).then((res) => {
            console.log('index.vue ===  进入方法体' + res)
            this.$router.push({ path: this.redirect || '/' })
            console.log('index.vue ===  push后')
            this.loading = false
          }).catch((error) => {
            console.log('index.vue ===  error' + error)
            this.loading = false
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

<style lang="scss">
  @import "index";
  @import "src/assets/webfont/webfont.scss";
</style>
