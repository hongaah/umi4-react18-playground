import { forwardRef, useImperativeHandle } from 'react'
import FunctionContext from './FunctionContext'

export interface FunctionProps {
  title: string
  onClick: () => void
}

function FunctionCom(props: FunctionProps, ref: any) {
  // props 作为传入组件参数数据的集合(包括变量、事件、方法、插槽)，可以解构赋值，可以定义默认值
  const { title = 'default components', onClick } = props

  // 监听 React 组件的 DOM 事件
  const handleDOMClick = () => {
    onClick()
  }

  // refs 组件实例：函数组件中要先使用 useImperativeHandle 定义要暴露给父组件的实例值，另外要把整个函数组件传入forwardRef处理后再导出。
  function exposeFunction() {
    alert('Expose function')
  }
  useImperativeHandle(ref, () => ({
    exposeFunction,
  }))

  return (
    <div>
      <h2>{title}</h2>

      {/* React中用onClick来监听点击事件，onClick是一个合成事件 */}
      <button onClick={handleDOMClick} type="button">
        click
      </button>

      <div>
        <h2>依赖注入</h2>
        <FunctionContext />
      </div>
    </div>
  )
}

const ForwardRef: React.FC<any> = forwardRef(FunctionCom)

export default ForwardRef
