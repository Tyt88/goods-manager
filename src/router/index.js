import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '仪表盘', icon: 'dashboard' }
    }]
  },

  {
    path: '/good',
    component: Layout,
    redirect: '/good/list',
    name: 'good_list',
    meta: { title: '商品管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        name: 'good_list',
        component: () => import('@/views/good/list'),
        meta: { title: '商品列表', icon: 'table' }
      },
      {
        path: 'add',
        name: 'add_good',
        component: () => import('@/views/good/add'),
        meta: { title: '添加商品', icon: 'form' }
      },
      {
        path: 'search',
        name: 'good_search',
        component: () => import('@/views/good/search'),
        meta: { title: '搜索商品', icon: 'table' }
      },
      {
        path: 'edit/:id',
        name: 'good_edit',
        component: () => import('@/views/good/edit'),
        meta: { title: '修改商品', icon: 'form' },
        hidden: true
      },
      {
        path: 'detail/:id',
        component: () => import('@/views/good/detail'),
        name: 'good_detail',
        meta: { title: '商品详情', icon: 'table' },
        hidden: true
      }
    ]
  },

  {
    path: '/good_type',
    component: Layout,
    redirect: '/good_type/list',
    name: 'good_type',
    meta: { title: '类别管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        name: 'good_type_list',
        component: () => import('@/views/good_type/list'),
        meta: { title: '类别列表', icon: 'table' }
      },
      {
        path: 'add',
        name: 'good_type_add',
        component: () => import('@/views/good_type/add'),
        meta: { title: '添加类别', icon: 'form' }
      },
      {
        path: 'edit/:id',
        name: 'good_type_edit',
        component: () => import('@/views/good_type/edit'),
        meta: { title: '修改类别', icon: 'form' },
        hidden: true
      }
    ]
  },

  {
    path: '/comment',
    component: Layout,
    redirect: '/comment/list',
    children: [
      {
        path: 'list',
        name: 'comment',
        component: () => import('@/views/comment/list'),
        meta: { title: '评论管理', icon: 'table' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/injahow/goods-manager',
        meta: { title: 'GitHub', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
