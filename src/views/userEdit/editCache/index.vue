<template>
  <div class="change_password m98Auto border paddingTB15 maTop20">
    <el-form ref="form" style="width: 300px;" :model="form">
      <el-form-item>
        <el-button type="primary" @click="cache">清除缓存并重新登录</el-button>
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
  methods: {
    async cache() {
      await this.$store.dispatch('user/logout')
      // ?redirect=${this.$route.fullPath}
      this.$router.push(`/login`)
    }
  }
}
</script>

<style scoped>

</style>
