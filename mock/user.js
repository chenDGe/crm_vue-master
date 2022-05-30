
const tokens = {
  admin: {
    token: 'admin-token'
  },
  ltUser: {
    token: 'lt-token'
  },
  jlUser: {
    token: 'jl-token'
  },
  dhUser: {
    token: 'dh-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'lt-token': {
    roles: ['lt'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  },
  'jl-token': {
    roles: ['jl'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  },
  'dh-token': {
    roles: ['dh'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

export default [
  // user login
  {
    url: 'http://localhost:8012/myDB/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: '帐户和密码不正确.'
        }
      }

      return {
        code: 200,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]
      // mock error
      if (!info) {
        return {
          code: 50008,
          message: '登录失败，无法获取用户详细信息.'
        }
      }

      return {
        code: 200,
        data: info,
        message: '获取成功.'
      }
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  }
]
