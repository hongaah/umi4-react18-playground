import { useState } from 'react'

export default function FunctionBasic() {
  // jsx
  const element = <p>jsx 表达式</p>

  // 返回 jsx 的函数
  const elementObj = {
    name: '函数返回jsx',
    content: 'jsx',
  }
  const getElementFn = (item: typeof elementObj) => {
    if (item.content === 'jsx') {
      return <div>{item.name}</div>
    }
    return <div>{item.content}</div>
  }

  // useState 定义内部数据，其数据是响应式的，若修改 state 且页面有使用，该数据改变后页面会重新渲染
  // class & style
  const [styleData, setStyleData] = useState({})
  const [classData, setClassData] = useState('title')

  function handleChangeStyle() {
    setStyleData({ color: 'red', padding: '10px' })
    setClassData('title ok')
  }

  return (
    // class & style 固定值与变量形式的定义。style 用一个 {} 传入一个对象
    <div className="container" style={{ fontSize: '14px' }}>
      <h2 className={classData} style={styleData}>
        基本
      </h2>

      <button onClick={handleChangeStyle} type="button">
        改变样式
      </button>
      <div>
        {element}
        {getElementFn(elementObj)}
      </div>
    </div>
  )
}
