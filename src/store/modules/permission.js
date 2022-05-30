import { constantRoutes, resetRouter } from '@/router'
import { adminRouter, chatRouter, managerRouter, iphoneRouter } from '@/router/modules/admin'
import { ruleCustomer } from '@/api/dhkfApi'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles, array) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles === 1) {
        accessedRoutes = adminRouter || []
      } else if (roles === 2) {
        accessedRoutes = iphoneRouter || []
      } else if (roles === 3) {
        accessedRoutes = managerRouter || []
      } else if (roles === 4) {
        accessedRoutes = chatRouter || []
      } else {
        accessedRoutes = filterAsyncRoutes(adminRouter, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resetRouter()
      resolve(accessedRoutes)
    })
  },
  getRouter() {
    const array = []
    return new Promise(resolve => {
      ruleCustomer().then(res => {
        const { data } = res
        data.forEach(item => {
          const routerItem = {
            path: '/allCustomers/' + item.name,
            component: () => import('@/views/allCustomers/rule/index'),
            meta: { title: item.name }
          }
          array.push(routerItem)
        })
      })
      resolve(array)
    })

    // return new Promise(resolve1 => {
    //
    //   resolve1(array)
    // })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
