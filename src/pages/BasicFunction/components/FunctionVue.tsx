import type { ChangeEvent } from 'react'
import { useState } from 'react'

export interface PropsType {
  value: number
  onChange: (val: number) => void
  changeTitle: (data: string) => void
  children: React.ReactNode
  specifySlot: () => React.ReactNode
  scopeSlot: (data: string) => React.ReactNode
}

function SmallCom(props: PropsType) {
  const { value, onChange, changeTitle, children, specifySlot, scopeSlot } =
    props

  return (
    <div>
      <div>
        <button type="button" onClick={() => changeTitle('emits 传的 data')}>
          修改标题
        </button>
      </div>
      组件 v-model：{value}
      <button type="button" onClick={() => onChange(value + 1)}>
        +1
      </button>
      <div>{children}</div>
      {specifySlot()}
      {scopeSlot('abc')}
    </div>
  )
}

export default function FunctionVue() {
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
  const [title, setTitle] = useState('emits')
  const changeTitle = (data: string) => {
    setTitle(data)
  }

  /**
   * slots 插槽
   * 普通插槽：父组件直接在标签内定义，子组件通过 props 的 children 获取并调用
   * 具名插槽：父组件向子组件传一个返回 jsx 的函数，子组件通过 props 的 xxx 获取并调用
   * 作用域插槽：调用具名插槽时传参
   */
  // slot 具名插槽：一个返回jsx的函数
  const getSpecifySlot = () => {
    return <div>来自父组件的具名插槽</div>
  }

  // slot 作用域插槽：子组件传参
  const getScopeSlot = (data: string) => {
    return <div>来自子组件的作用域插槽{data}</div>
  }

  return (
    <div>
      <h2>类 Vue 写法</h2>
      <div>
        <input type="text" value={inputValue} onChange={handleInput} />
        <button type="button" onClick={() => setShow(!show)}>
          {show ? '隐藏预览' : '预览'}
        </button>
        <span style={{ visibility: show ? 'visible' : 'hidden' }}>
          {inputValue}
        </span>
        <div>{title}</div>
        <SmallCom
          value={comValue}
          onChange={IncreaseComValue}
          changeTitle={changeTitle}
          specifySlot={getSpecifySlot}
          scopeSlot={getScopeSlot}
        >
          默认插槽
        </SmallCom>
      </div>

      {/* <></> 相当<React.Fragment></React.Fragment>，<React.Fragment>不会在DOM中渲染出额外的元素，跟Vue中的<template>元素一样 */}
      <>
        {display && <span>类 vue 的 v-if：</span>}
        <button type="button" onClick={() => setDisplay(!display)}>
          {display ? '隐藏预览' : '预览'}
        </button>
      </>

      {list.map((item) => (
        <p key={item}>{item}</p>
      ))}
    </div>
  )
}
