import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
// import { ruleCustomer } from '@/api/dhkfApi'
// import { iphoneRouter } from '@/router/modules/admin'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles: '',
    sign: 0
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_SIGN: (state, sign) => {
    state.sign = sign
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    console.log(username + '====' + password)
    return new Promise((resolve, reject) => {
      login({ userid: username.trim(), password: password }).then(response => {
        console.log('进入方法体' + response)
        const { data } = response
        console.log(data)
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        // resolve(response)
      }).catch(error => {
        console.log('出错了！！' + error)
        reject('登录出错啦！')
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('验证失败，请重新登录。')
        }

        const { type, realname, is_signin } = data
        const avatar = '@/assets/nav/good.jpg'
        // roles must be a non-empty array
        if (!type || type.length <= 0) {
          reject('角色权限不存在')
        }
        commit('SET_ROLES', type)
        commit('SET_NAME', realname)
        commit('SET_AVATAR', avatar)
        commit('SET_SIGN', is_signin)
        resolve(data)
      }).catch(error => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout().then(res => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },

  // 改变签到状态
  resetSign({ commit }) {
    commit('SET_SIGN', 1)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

