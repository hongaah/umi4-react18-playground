import type { ChangeEvent } from 'react'
import { useRef, useState } from 'react'
import FunctionComponent from './components/FunctionCom'
import FunctionRoute from './components/FunctionRoute'
import { MyContext } from './context'

/**
 * 函数组件首页
 *
 */

// jsx
const element = <h1>函数组件</h1>

// 返回 jsx 的函数
const elementObj = {
  name: 'basic',
  content: 'jsx',
}
const getElementFn = (item: typeof elementObj) => {
  if (item.content === 'jsx') {
    return <h1>{item.name}</h1>
  }
  return <h1>{item.content}</h1>
}

// refs: 定义实例组件暴露的方法
export interface RefProps {
  handleChangeState: () => void
}

const BasicPage: React.FC = () => {
  /**
   * useState
   */
  // 设置变量初始值
  const [title, setTitle] = useState('函数组件')
  const [count, setCount] = useState(0)

  // 通过计算得到的变量初始值
  const [calcVal] = useState(() => title + '(计算版)')

  // 同时使用setState方法时，需要传入一个函数
  function changeDoubleState() {
    // setCount(count + 1)
    // setCount(count + 1) // 只生效一次
    setCount((c) => c + 1)
    setCount((c) => c + 1)
  }

  // 拆分 & 合并 state：减少组件渲染（在函数式组件中，只要一个state改变都会引起组件的重新渲染。而在React中只要父组件重新渲染，其子组件都会被重新渲染。）
  const [reactive, setReactive] = useState({
    a: 1,
    b: 2,
    c: 3,
  })
  function changeReactive() {
    setReactive((val) => ({
      ...val,
      a: 11,
    }))
  }

  /**
   * 类 Vue 写法
   */
  // 类 vue 的 v-show
  const [show, setShow] = useState(true)

  // 类 vue 的 v-if
  const [display, setDisplay] = useState(true)

  // 类 vue 的 v-for
  // 遍历数组数据时需要设定key，否则会有告警，如果数组顺序会变则不要使用数组索引，应该为每个元素设定固定的唯一值，否则性能会变差和引起组件状态问题
  const [list] = useState(['a', 'b', 'c', 'd', 'e', 'f'])

  // 表单元素的 v-model
  const [inputValue, setInputValue] = useState('')
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  // 组件的 v-model
  const [comValue, setComValue] = useState(0)
  function IncreaseComValue(data: number) {
    setComValue(data)
  }

  // 子组件的修改父组件数据 emits
  const changeTitle = (data: string) => {
    setTitle(data)
  }

  // slot 具名插槽：一个返回jsx的函数
  const getSpecifySlot = () => {
    return <div>来自父组件的具名插槽</div>
  }
  // slot 作用域插槽：子组件传参
  const getScopeSlot = (data: string) => {
    return <div>来自子组件的作用域插槽{data}</div>
  }

  /**
   * 其他
   */
  // 依赖注入 context
  const [contextValue] = useState({
    contextValue1: '123',
    contextValue2: '456',
  })

  // refs 组件实例: 父调子方法
  const functionCompRef = useRef<RefProps>(null)
  const handleChangeSon = () => {
    functionCompRef?.current?.handleChangeState()
  }

  // 监听 React 组件的 DOM 事件
  const handleDomClick = () => {
    console.log('parent dom clicked')
  }

  return (
    <div>
      <h1>函数组件</h1>
      <FunctionRoute />

      {element}
      {getElementFn(elementObj)}
      <MyContext.Provider value={contextValue}>
        <FunctionComponent
          ref={functionCompRef}
          comValue={comValue}
          IncreaseComValue={IncreaseComValue}
          title={title}
          onClick={() => handleDomClick()}
          changeTitle={changeTitle}
          specifySlot={getSpecifySlot}
          scopeSlot={getScopeSlot}
        >
          来自父组件的普通插槽
        </FunctionComponent>
      </MyContext.Provider>

      <button onClick={handleChangeSon} type="button">
        调用子组件的方法
      </button>

      <div>
        <h2>hooks</h2>
        <div>
          count: {count}
          <button type="button" onClick={changeDoubleState}>
            change*2
          </button>
        </div>
        <div>
          reactive: {JSON.stringify(reactive)}
          <button type="button" onClick={changeReactive}>
            change reactive
          </button>
        </div>
        <div>setComplexState: {calcVal}</div>
      </div>
      <div>
        <h2>表单</h2>
        <div>
          <input type="text" value={inputValue} onChange={handleInput} />
          <button type="button" onClick={() => setShow(!show)}>
            {show ? '隐藏预览' : '预览'}
          </button>
          <span style={{ visibility: show ? 'visible' : 'hidden' }}>
            {inputValue}
          </span>
        </div>

        {/* <></> 相当<React.Fragment></React.Fragment>，<React.Fragment>不会在DOM中渲染出额外的元素，跟Vue中的<template>元素一样 */}
        <>
          {display && <span>类 vue 的 v-if</span>}
          <button type="button" onClick={() => setDisplay(!display)}>
            {display ? '隐藏预览' : '预览'}
          </button>
        </>
      </div>

      <div>
        <h2>列表</h2>
        {list.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
    </div>
  )
}

export default BasicPage
