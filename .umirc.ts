import { defineConfig } from '@umijs/max'

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max123',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
    },
    {
      name: ' CRUD 示例',
      path: '/table',
      component: './Table',
    },
    {
      name: '类组件',
      path: '/basic-class',
      component: './BasicClass',
    },
    {
      name: '函数组件',
      path: '/basic-function',
      component: './BasicFunction',
    },
  ],
  npmClient: 'pnpm',
})
