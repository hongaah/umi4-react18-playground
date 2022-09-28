import { PageContainer, ProCard } from '@ant-design/pro-components'
import { useRef, useState } from 'react'
import FunctionBasic from './components/FunctionBasic'
import FunctionCom from './components/FunctionCom'
import FunctionHooks from './components/FunctionHooks'
import FunctionRoute from './components/FunctionRoute'
import FunctionVue from './components/FunctionVue'
import { MyContext } from './context'

/**
 * 函数组件
 *
 * 组件定义：
 * -1. 函数形式定义组件
 * 0. jsx继承js的全部功能，可以生成react元素
 * 1. 首字母要大写，因为 React 会将以小写字母开头的组件视为原生 DOM 标签。
 * 2. 组件相当一个函数，只有引入，没有注册的概念
 * 3. 组件内的数据有两种，1 内部数据称为state，2 参数数据称为props
 * 4. 插槽：普通插槽、具名插槽、作用域插槽
 * 5. hooks: useState, useEffect, useRef
 * 6. refs: forwardRef, useImperativeRef
 *
 * 异同：
 * 1. Vue 的模板是用{{}}（双大括号）来使用数据的，而在React中是统一用{}（单大括号）来使用数据的（除了传递字符串类型的静态数据）。
 * 2. Vue 的@click 是dom的原生事件，而React是一个合成事件 https://zh-hans.reactjs.org/docs/events.html#mouse-events
 * 3. 在Vue中用.native修饰符来监听组件上的DOM事件，而在React中监听组件上的DOM事件需要获取并调用父组件的 onClick 事件
 * 4. setState 可以修改内部数据，内部数据改变后页面会重新渲染
 * 5. useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。返回的 ref 对象在组件的整个生命周期内保持不变。
 */

// refs: 定义实例组件暴露的方法
export interface RefProps {
  exposeFunction: () => void
}

const BasicPage: React.FC = () => {
  // 依赖注入 context
  const [contextValue] = useState({
    contextValue1: '123',
    contextValue2: '456',
  })

  // refs 组件实例: 父调子方法
  const functionCompRef = useRef<RefProps>(null)
  const handleChangeSon = () => {
    functionCompRef?.current?.exposeFunction()
  }

  // 监听 React 组件的 DOM 事件
  const handleDomClick = () => {
    console.log('parent dom clicked')
  }

  return (
    <PageContainer
      header={{
        title: '函数组件',
      }}
    >
      <ProCard title="首页" hoverable bordered>
        <button onClick={handleChangeSon} type="button">
          通过 ref 调用子组件的方法
        </button>
      </ProCard>
      <ProCard
        title="🌰"
        gutter={[8, 8]}
        wrap
        ghost
        style={{ marginBlockStart: 8 }}
      >
        <ProCard colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }}>
          <FunctionBasic />
        </ProCard>
        <ProCard colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }}>
          <FunctionHooks />
        </ProCard>
        <ProCard colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }}>
          <FunctionVue />
        </ProCard>
        <ProCard colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }}>
          <FunctionRoute />
        </ProCard>
        <ProCard colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }}>
          <MyContext.Provider value={contextValue}>
            <FunctionCom
              title="组件"
              ref={functionCompRef}
              onClick={() => handleDomClick()}
            />
          </MyContext.Provider>
        </ProCard>
      </ProCard>
    </PageContainer>
  )
}

export default BasicPage
