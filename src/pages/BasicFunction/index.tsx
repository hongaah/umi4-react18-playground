import { useRef, useState } from 'react'
import FunctionComponent from './components/FunctionCom'

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
  const [title, setTitle] = useState('函数组件')

  // refs 组件实例: 父调子方法
  const functionCompRef = useRef<RefProps>(null)
  const handleChangeSon = () => {
    functionCompRef?.current?.handleChangeState()
  }

  // 监听 React 组件的 DOM 事件
  const handleDomClick = () => {
    console.log('parent dom clicked')
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

  return (
    <div>
      {element}
      {getElementFn(elementObj)}
      <FunctionComponent
        ref={functionCompRef}
        title={title}
        onClick={() => handleDomClick()}
        changeTitle={changeTitle}
        specifySlot={getSpecifySlot}
        scopeSlot={getScopeSlot}
      >
        来自父组件的普通插槽
      </FunctionComponent>

      <button onClick={handleChangeSon} type="button">
        调用子组件的方法
      </button>
    </div>
  )
}

export default BasicPage
