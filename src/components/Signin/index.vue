<template>
  <div class="signin">
    <el-tooltip :content="sign ? '已签到':'点击签到吧'" effect="dark" placement="bottom">>
      <i :class="[sign ? 'icon-qiandao1 poEvents' : 'icon-qiandao2','iconfont curPointer']" @click="sigFlags()" />
    </el-tooltip>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { signin } from '@/api/user'

export default {
  name: 'Signin',
  data() {
    return {
      sigFlag: false
    }
  },
  computed: {
    ...mapGetters([
      'sign'
    ])
  },
  mounted() {
  },
  methods: {
    // eslint-disable-next-line vue/no-dupe-keys
    sigFlags() {
      const that = this
      // state.commit('SET_SIGNIN', '1')
      return new Promise((resolve, reject) => {
        signin().then(res => {
          const { msg } = res
          that.$notify.success({
            message: msg,
            duration: 500
          })
          that.$store.dispatch('user/resetSign')
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.signin {
  margin-right: 15px;
  .iconfont {
    font-size: 24px;
  }
}
</style>
