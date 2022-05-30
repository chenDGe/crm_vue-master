import Layout from '@/layout/index'
// import { ruleCustomer } from '@/api/dhkfApi'
// ruleCustomer().then(res => {
//   const { data } = res
//   data.forEach(item => {
//     const id = item.id
//     const routerItem = {
//       path: '/allCustomers/' + item.name,
//       component: () => import('@/views/allCustomers/rule/index'),
//       meta: { title: item.name, id: id }
//     }
//     iphoneRouter[3].children.push(routerItem)
//   })
// }).catch(err => {
//   console.log(err)
// })

/*
 * @AUTO YM
 * @INFO 定义路由权限
 * @EMAIL 1223096730@qq.com
 * @TIME 2020/05/20 13:14:00
 * @PARAMS adminRouter 管理员
 * @PARAMS chatRouter 聊天客服
 * @PARAMS managerRouter 商务经理
 * @PARAMS iphoneRouter 商务经理
 */
export const adminRouter = [
  {
    path: '/',
    component: Layout,
    redirect: '/proManagement',
    children: [{
      path: 'proManagement',
      component: () => import('@/views/proManagement/index'),
      meta: { title: '项目管理', icon: 'proManagement' }
    }]
  },
  {
    path: '/brandManagement',
    component: Layout,
    redirect: '/brandManagement',
    children: [{
      path: 'brandManagement',
      component: () => import('@/views/brandManagement/index'),
      meta: { title: '品牌管理', icon: 'brandManagement' }
    }]
  },
  {
    path: '/visitingCompany',
    component: Layout,
    redirect: '/visitingCompany',
    children: [{
      path: 'visitingCompany',
      component: () => import('@/views/visitingCompany/index'),
      meta: { title: '来访公司管理', icon: 'visitingCompany' }
    }]
  },
  {
    path: '/departManagement',
    component: Layout,
    redirect: '/departManagement',
    children: [{
      path: 'departManagement',
      component: () => import('@/views/departManagement/index'),
      meta: { title: '部门管理', icon: 'departManagement' }
    }]
  },
  {
    path: '/employeeManagement',
    component: Layout,
    redirect: '/employeeManagement',
    children: [{
      path: 'employeeManagement',
      component: () => import('@/views/employeeManagement/index'),
      meta: { title: '员工管理', icon: 'employeeManagement' }
    }]
  },
  {
    path: '/labelManagement',
    component: Layout,
    redirect: '/labelManagement',
    children: [{
      path: 'labelManagement',
      component: () => import('@/views/labelManagement/index'),
      meta: { title: '标签管理', icon: 'labelManagement' }
    }]
  },
  {
    path: '/regionalManagement',
    component: Layout,
    redirect: '/regionalManagement',
    children: [{
      path: 'regionalManagement',
      component: () => import('@/views/regionalManagement/index'),
      meta: { title: '专属区域管理', icon: 'regionalManagement' }
    }]
  },
  {
    path: '/statusManagement',
    component: Layout,
    redirect: '/statusManagement',
    children: [{
      path: 'statusManagement',
      component: () => import('@/views/statusManagement/index'),
      meta: { title: '资源状态管理', icon: 'statusManagement' }
    }]
  },
  {
    path: '/infoManagement',
    component: Layout,
    redirect: '/infoManagement',
    children: [{
      path: 'infoManagement',
      component: () => import('@/views/infoManagement/index'),
      meta: { title: '信息来源规则管理', icon: 'infoManagement' }
    }]
  },
  {
    path: '/findCustomers',
    component: Layout,
    redirect: '/findCustomers',
    children: [{
      path: 'findCustomers',
      component: () => import('@/views/findCustomers/index'),
      meta: { title: '查找客户', icon: 'findCustomers' }
    }]
  },
  {
    path: '/importCustomers',
    component: Layout,
    redirect: '/importCustomers',
    children: [{
      path: 'importCustomers',
      component: () => import('@/views/importCustomers/index'),
      meta: { title: '导入客户', icon: 'importCustomers' }
    }]
  },
  {
    path: '/exportCustomers',
    component: Layout,
    redirect: '/exportCustomers',
    children: [{
      path: 'exportCustomers',
      component: () => import('@/views/exportCustomers/index'),
      meta: { title: '导出客户', icon: 'export' }
    }]
  },
  {
    path: '/analysisForm',
    component: Layout,
    redirect: '/analysisForm/iphone',
    meta: {
      title: '分析统计',
      icon: 'nested'
    },
    children: [
      {
        path: '/analysisForm/iphone',
        component: () => import('@/views/analysisForm/iphone/index'), // Parent router-view
        meta: { title: '电话统计' }
      }
    ]
  },
  // {
  //   path: '/customerForm',
  //   component: Layout,
  //   redirect: '/customerForm',
  //   children: [{
  //     path: 'customerForm',
  //     component: () => import('@/views/customerForm/index'),
  //     meta: { title: '自定义表单', icon: 'customerForm' }
  //   }]
  // },
  {
    path: '/sysSettings',
    component: Layout,
    redirect: '/sysSettings',
    children: [{
      path: 'sysSettings',
      component: () => import('@/views/sysSettings/index'),
      meta: { title: '系统设置', icon: 'sysSettings' }
    }]
  },
  {
    path: '/userEdit',
    component: Layout,
    redirect: '/userEdit/editIphone',
    meta: {
      title: '用户设置',
      icon: 'nested'
    },
    children: [
      // {
      //   path: '/userEdit/editIphone',
      //   component: () => import('@/views/userEdit/editIphone/index'), // Parent router-view
      //   meta: { title: '电话设置', icon: 'phoneSettings' }
      // },
      {
        path: '/userEdit/editPassword',
        component: () => import('@/views/userEdit/editPassword/index'), // Parent router-view
        meta: { title: '修改密码', icon: 'changePassword' }
      },
      {
        path: '/userEdit/editCache',
        component: () => import('@/views/userEdit/editCache/index'), // Parent router-view
        meta: { title: '缓存管理', icon: 'cacheManagement' }
      }
    ]
  },
  {
    path: '/*',
    component: () => import('@/views/404'),
    hidden: true
  }
]
export const chatRouter = [
  { path: '/',
    component: Layout,
    redirect: '/allocatedCost',
    children: [{
      path: 'allocatedCost',
      component: () => import('@/views/allocatedCost/index'),
      meta: { title: '待分配客户', icon: 'allocatedCost' }
    }]
  },
  { path: '/assignedCost',
    component: Layout,
    redirect: '/assignedCost',
    children: [{
      path: 'assignedCost',
      component: () => import('@/views/assignedCost/index'),
      meta: { title: '已分配客户', icon: 'assignedCost' }
    }]
  },
  { path: '/collectCost',
    component: Layout,
    redirect: '/collectCost',
    children: [{
      path: 'collectCost',
      component: () => import('@/views/collectCost/index'),
      meta: { title: '客户来源汇总', icon: 'collectCost' }
    }]
  },
  { path: '/analysisCost',
    component: Layout,
    redirect: '/analysisCost',
    children: [{
      path: 'analysisCost',
      component: () => import('@/views/analysisCost/index'),
      meta: { title: '客户来源分析', icon: 'analysisCost' }
    }]
  },
  { path: '/seekCost',
    component: Layout,
    redirect: '/seekCost',
    children: [{
      path: 'seekCost',
      component: () => import('@/views/seekCost/index'),
      meta: { title: '查找客户', icon: 'seekCost' }
    }]
  },
  {
    path: '/userEdit',
    component: Layout,
    redirect: '/userEdit/editIphone',
    meta: {
      title: '用户设置',
      icon: 'nested'
    },
    children: [
      {
        path: '/userEdit/editIphone',
        component: () => import('@/views/userEdit/editIphone/index'), // Parent router-view
        meta: { title: '电话设置', icon: 'phoneSettings' }
      },
      {
        path: '/userEdit/editPassword',
        component: () => import('@/views/userEdit/editPassword/index'), // Parent router-view
        meta: { title: '修改密码', icon: 'changePassword' }
      },
      {
        path: '/userEdit/editCache',
        component: () => import('@/views/userEdit/editCache/index'), // Parent router-view
        meta: { title: '缓存管理', icon: 'cacheManagement' }
      }
    ]
  },
  {
    path: '/*',
    component: () => import('@/views/404'),
    hidden: true
  }
]
export const managerRouter = [
  { path: '/',
    component: Layout,
    redirect: '/upcomingCost',
    children: [{
      path: 'upcomingCost',
      component: () => import('@/views/upcomingCost/index'),
      meta: { title: '即将来访的客户', icon: 'upcomingCost' }
    }]
  },
  { path: '/notSignedCost',
    component: Layout,
    redirect: '/notSignedCost',
    children: [{
      path: 'notSignedCost',
      component: () => import('@/views/notSignedCost/index'),
      meta: { title: '未签约的客户', icon: 'notSignedCost' }
    }]
  },
  { path: '/signedCost',
    component: Layout,
    redirect: '/signedCost',
    children: [{
      path: 'signedCost',
      component: () => import('@/views/signedCost/index'),
      meta: { title: '已签约的客户', icon: 'signedCost' }
    }]
  },
  { path: '/finishCost',
    component: Layout,
    redirect: '/finishCost',
    children: [{
      path: 'finishCost',
      component: () => import('@/views/finishCost/index'),
      meta: { title: '已收款完成的客户', icon: 'finishCost' }
    }]
  },
  {
    path: '/userEdit',
    component: Layout,
    redirect: '/userEdit/editIphone',
    meta: {
      title: '用户设置',
      icon: 'nested'
    },
    children: [
      {
        path: '/userEdit/editIphone',
        component: () => import('@/views/userEdit/editIphone/index'), // Parent router-view
        meta: { title: '电话设置', icon: 'phoneSettings' }
      },
      {
        path: '/userEdit/editPassword',
        component: () => import('@/views/userEdit/editPassword/index'), // Parent router-view
        meta: { title: '修改密码', icon: 'changePassword' }
      },
      {
        path: '/userEdit/editCache',
        component: () => import('@/views/userEdit/editCache/index'), // Parent router-view
        meta: { title: '缓存管理', icon: 'cacheManagement' }
      }
    ]
  },
  {
    path: '/*',
    component: () => import('@/views/404'),
    hidden: true
  }
]
export const iphoneRouter = [
  { path: '/',
    component: Layout,
    redirect: '/resourceOverview',
    children: [{
      path: 'resourceOverview',
      component: () => import('@/views/resourceOverview/index'),
      meta: { title: '资源概况', icon: 'resourceOverview' }
    }]
  },
  { path: '/newCustomers',
    component: Layout,
    redirect: '/newCustomers',
    children: [{
      path: 'newCustomers',
      component: () => import('@/views/newCustomers/index'),
      meta: { title: '新增客户', icon: 'newCustomers' }
    }]
  },
  { path: '/touchCustomers',
    component: Layout,
    redirect: '/touchCustomers',
    children: [{
      path: 'touchCustomers',
      component: () => import('@/views/touchCustomers/index'),
      meta: { title: '待联系客户', icon: 'touchCustomers' }
    }]
  },
  // { path: '/starCustomers',
  //   component: Layout,
  //   redirect: '/starCustomers',
  //   children: [{
  //     path: 'starCustomers',
  //     component: () => import('@/views/starCustomers/index'),
  //     meta: { title: '星标客户', icon: 'starCustomers' }
  //   }]
  // },
  {
    path: '/customers',
    component: Layout,
    redirect: '/customers',
    meta: {
      title: '全部客户',
      icon: 'collectCost'
    },
    children: [
      {
        path: '/allCustomers',
        component: () => import('@/views/allCustomers/index'),
        meta: { title: '全部客户' }
      },
      {
        path: '/allCustomers/A',
        component: () => import('@/views/allCustomers/rule/index'),
        meta: { title: 'A', id: 1 }
      },
      {
        path: '/allCustomers/B',
        component: () => import('@/views/allCustomers/rule/index'),
        meta: { title: 'B', id: 2 }
      },
      {
        path: '/allCustomers/C',
        component: () => import('@/views/allCustomers/rule/index'),
        meta: { title: 'C', id: 3 }
      }
    ]
  },
  { path: '/soonCustomers',
    component: Layout,
    redirect: '/soonCustomers',
    children: [{
      path: 'soonCustomers',
      component: () => import('@/views/soonCustomers/index'),
      meta: { title: '即将来访客户', icon: 'upcomingCost' }
    }]
  },
  { path: '/notCustomers',
    component: Layout,
    redirect: '/notCustomers',
    children: [{
      path: 'notCustomers',
      component: () => import('@/views/notCustomers/index'),
      meta: { title: '未签约客户', icon: 'notSignedCost' }
    }]
  },
  { path: '/okayCustomers',
    component: Layout,
    redirect: '/okayCustomers',
    children: [{
      path: 'okayCustomers',
      component: () => import('@/views/okayCustomers/index'),
      meta: { title: '已签约客户', icon: 'signedCost' }
    }]
  },
  { path: '/groupLibrary',
    component: Layout,
    redirect: '/groupLibrary',
    children: [{
      path: 'groupLibrary',
      name: 'groupLibrary',
      component: () => import('@/views/groupLibrary/index'),
      meta: { title: '小组库', icon: 'employeeManagement' }
    }]
  },
  // { path: '/projectLibrary',
  //   component: Layout,
  //   redirect: '/projectLibrary',
  //   children: [{
  //     path: 'projectLibrary',
  //     component: () => import('@/views/projectLibrary/index'),
  //     meta: { title: '项目库', icon: 'proManagement' }
  //   }]
  // },
  // { path: '/publicLibrary',
  //   component: Layout,
  //   redirect: '/publicLibrary',
  //   children: [{
  //     path: 'publicLibrary',
  //     component: () => import('@/views/publicLibrary/index'),
  //     meta: { title: '公共库', icon: 'publicLibrary' }
  //   }]
  // },
  { path: '/callLog',
    component: Layout,
    redirect: '/callLog',
    children: [{
      path: 'callLog',
      component: () => import('@/views/callLog/index'),
      meta: { title: '通话记录', icon: 'callLog' }
    }]
  },
  { path: '/census',
    component: Layout,
    redirect: '/census',
    children: [{
      path: 'census',
      component: () => import('@/views/census/index'),
      meta: { title: '个人统计', icon: 'nested' }
    }]
  },
  // { path: '/help',
  //   component: Layout,
  //   redirect: '/help',
  //   children: [{
  //     path: 'help',
  //     component: () => import('@/views/help/index'),
  //     meta: { title: '帮助', icon: 'helpDocuments' }
  //   }]
  // },
  {
    path: '/userEdit',
    component: Layout,
    redirect: '/userEdit/editIphone',
    meta: {
      title: '用户设置',
      icon: 'nested'
    },
    children: [
      {
        path: '/userEdit/editIphone',
        component: () => import('@/views/userEdit/editIphone/index'), // Parent router-view
        meta: { title: '电话设置', icon: 'phoneSettings' }
      },
      {
        path: '/userEdit/editPassword',
        component: () => import('@/views/userEdit/editPassword/index'), // Parent router-view
        meta: { title: '修改密码', icon: 'changePassword' }
      },
      {
        path: '/userEdit/editCache',
        component: () => import('@/views/userEdit/editCache/index'), // Parent router-view
        meta: { title: '缓存管理', icon: 'cacheManagement' }
      }
    ]
  },
  {
    path: '/infoCost',
    component: Layout,
    redirect: '/infoCost',
    hidden: true,
    children: [{
      path: 'infoCost',
      name: 'infoCost',
      component: () => import('@/views/infoCost/index'),
      meta: { title: '客户详情', icon: 'nested' }
    }]
  },
  {
    path: '/*',
    component: () => import('@/views/404'),
    hidden: true
  }
]
