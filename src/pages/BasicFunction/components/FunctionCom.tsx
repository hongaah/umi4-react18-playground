/**
 * 函数组件
 *
 * 组件定义：
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

import { forwardRef, useImperativeHandle, useState } from 'react'
import { useWatch } from '../hooks/useWatch'

export interface FunctionProps {
  title: string
  onClick: () => void
  changeTitle: (data: string) => void
  children: React.ReactNode
  specifySlot: () => React.ReactNode
  scopeSlot: (data: string) => React.ReactNode
}

// 函数形式定义组件
function FunctionCom(props: FunctionProps, ref: any) {
  // props 作为传入组件参数数据的集合(包括变量、事件、方法、插槽)，可以解构赋值，可以定义默认值
  const {
    title = 'default',
    onClick,
    changeTitle, // 类 vue 的 defineEmits
    children,
    specifySlot,
    scopeSlot,
  } = props

  // 监听 React 组件的 DOM 事件
  const handleDOMClick = () => {
    onClick()
  }

  /**
   * hooks：
   * useState, useEffect, useRef
   */
  // useState 定义内部数据，其数据是响应式的，若修改 state 且页面有使用，该数据改变后页面会重新渲染
  const [styleData, setStyleData] = useState({})
  const [classData, setClassData] = useState('title')

  function handleChangeState() {
    setStyleData({ color: 'red' })
    setClassData('title ok')
  }

  // refs 组件实例：函数组件中要先使用 useImperativeHandle 定义要暴露给父组件的实例值，另外要把整个函数组件传入forwardRef处理后再导出。
  useImperativeHandle(ref, () => ({
    handleChangeState,
  }))

  // useEffect 监听数据变化，会在组件初次渲染后就会调用一次，没有保存修改前的旧值，不会返回一个函数取消监听，可以自己实现一个类 vue 的 watch
  const unwatch = useWatch(
    props.title,
    (prev: any, next: any) => {
      console.log('监听数据', '新：', prev, '旧：', next)
    },
    {
      immediate: true,
    },
  )

  /**
   * 组件交互：
   * 子组件调用父组件方法：类 Vue 的 emit
   */
  const changePropsData = () => {
    changeTitle('函数组件：hasChange')
  }

  /**
   * slots 插槽
   * 普通插槽：父组件直接在标签内定义，子组件通过 props 的 children 获取并调用
   * 具名插槽：父组件向子组件传一个返回 jsx 的函数，子组件通过 props 的 xxx 获取并调用
   * 作用域插槽：调用具名插槽时传参
   */

  // 具名插槽
  const getSpecifySlot = specifySlot ? specifySlot() : ''
  // 作用域插槽
  const getScopeSlot = scopeSlot ? scopeSlot('123') : ''

  return (
    // class & style 固定值与变量形式的定义。style 用一个 {} 传入一个对象
    <div className="container" style={{ padding: '10px', fontSize: '14px' }}>
      <div className={classData} style={styleData}>
        {title}
      </div>

      {/* React中用onClick来监听点击事件，onClick是一个合成事件 */}
      <button onClick={handleDOMClick} type="button">
        click
      </button>
      <button onClick={handleChangeState} type="button">
        change state
      </button>
      <button onClick={changePropsData} type="button">
        change props
      </button>
      <button onClick={unwatch} type="button">
        取消监听
      </button>

      <div>{children}</div>
      {getSpecifySlot}
      {getScopeSlot}
    </div>
  )
}

const ForwardRef: React.FC<any> = forwardRef(FunctionCom)

export default ForwardRef
