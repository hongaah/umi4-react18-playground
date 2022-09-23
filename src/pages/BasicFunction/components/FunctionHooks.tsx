import { useState } from 'react'
import { useWatch } from '../hooks/useWatch'

export default function FunctionBasic() {
  /**
   * hooks：
   * useState, useEffect, useRef
   */

  /**
   * useState
   */
  // 设置变量初始值
  const [count, setCount] = useState(0)

  // 通过计算得到的变量初始值
  const [calcVal] = useState(() => count + '(计算版)')

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

  // useEffect 监听数据变化，会在组件初次渲染后就会调用一次，没有保存修改前的旧值，不会返回一个函数取消监听，可以自己实现一个类 vue 的 watch
  const unwatch = useWatch(
    count,
    (prev: any, next: any) => {
      console.log('监听数据', '新：', prev, '旧：', next)
    },
    {
      immediate: true,
    },
  )

  return (
    <div>
      <h2>Hooks</h2>

      <div>
        <h3>setState</h3>
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
        <h3>自定义hooks</h3>
        <button onClick={unwatch} type="button">
          取消监听
        </button>
      </div>
    </div>
  )
}
