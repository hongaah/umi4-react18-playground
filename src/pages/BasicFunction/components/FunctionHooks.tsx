import React, {
  useCallback,
  useContext,
  useDeferredValue,
  useEffect,
  useMemo,
  useReducer,
  // useEffect,
  useRef,
  useState,
} from 'react'
import { MyContext } from '../context'
import styles from '../styles.less'

// https://juejin.cn/post/7118937685653192735

/** useState 可以使函数组件像类组件一样拥有 state，函数组件通过 useState 可以让组件重新渲染，更新视图 */
function UseStateDemo() {
  /**
   * useState
   *
   * tips:
   * 1. 在函数组件一次执行上下文中，state 的值是固定不变的，获取不到最新的 state，只有在下一次组件 render 中才能获得
   * 2. 如果两次 dispatchAction 不是通过函数来传入相同的 state 值，那么第二次修改不生效，因为传入的值在内存指向地址相同
   * 3. 只要一个state改变都会引起组件的重新渲染
   */

  // 设置变量初始值
  const [count, setCount] = useState(0)

  // 通过计算得到的变量初始值
  const [calcVal] = useState(() => count + '(计算版)')

  // 使用 setState 方法传入相同参数时，需要通过函数传入
  function changeDoubleState() {
    // setCount(count + 1)
    // setCount(count + 1) // 只生效一次（tips2）
    setCount((c) => c + 1)
    setCount((c) => c + 1)
    console.log('count', count) // 此时 count 值还是为 0（tips1）
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
  return (
    <div>
      <h3>setState</h3>
      <div>
        count: {count}
        <button type="button" onClick={changeDoubleState}>
          count * 2
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
  )
}

/** useReducer 是 react-hooks 提供的能够在无状态组件中运行的类似 redux 的功能 api */
function UseReducerDemo() {
  /**
   * useReducer 参数可以认为就是一个 redux 中的 reducer，reducer 的参数就是常规 reducer 里面的 state 和 action, 返回改变后的 state
   */
  const [number, dispatchNumber] = useReducer((state: any, action: any) => {
    const { payload, name } = action
    /* return 的值为新的 state，如果返回的 state 和之前的 state，内存指向相同，那么组件将不会更新 */
    switch (name) {
      case 'add':
        return state + 1
      case 'sub':
        return state - 1
      case 'reset':
        return payload
    }
    return state
  }, 0)

  return (
    <div>
      <h3>useReducer</h3>
      当前值：{number}
      {/* 派发更新 */}
      <button type="button" onClick={() => dispatchNumber({ name: 'add' })}>
        增加
      </button>
      <button type="button" onClick={() => dispatchNumber({ name: 'sub' })}>
        减少
      </button>
      <button
        type="button"
        onClick={() => dispatchNumber({ name: 'reset', payload: 666 })}
      >
        赋值
      </button>
      <button type="button" onClick={() => dispatchNumber({})}>
        空参
      </button>
      {/* 把dispatch 和 state 传递给子组件  */}
      {/* <MyChildren  dispatch={ dispatchNumbner } State={{ number }} /> */}
    </div>
  )
}

/**
 * useTransition 是把 startTransition 内部的更新任务变成了过渡任务 transtion
 * useDeferredValue 是把原值通过过渡任务得到新的值，这个值作为延时状态
 *
 * 一个是处理一段逻辑，另一个是生产一个新的状态。
 */
/* eslint-disable */
function UseTransitionAndUseDeferredValueDemo() {
  const mockList1 = new Array(10000)
    .fill('tab1')
    .map((item, index) => item + '--' + index)
  const mockList2 = new Array(10000)
    .fill('tab2')
    .map((item, index) => item + '--' + index)
  const mockList3 = new Array(10000)
    .fill('tab3')
    .map((item, index) => item + '--' + index)

  const tabList = {
    tab1: mockList1,
    tab2: mockList2,
    tab3: mockList3,
  }

  const [active, setActive] = useState<keyof typeof tabList>('tab1')

  // useTransition
  // const [renderData, setRenderData] = useState(tabList[active])
  // const [isPending, startTransition] = useTransition()

  // useDeferredValue
  const deferActive = useDeferredValue(active)
  const renderData = tabList[deferActive]

  const handleChangeTab = (tab: keyof typeof tabList) => {
    setActive(tab)
    // startTransition(() => {
    //   setRenderData(tabList[tab])
    // })
  }

  return (
    <div>
      <h3>useTransition</h3>
      <div>
        {Object.keys(tabList).map((item, index) => (
          <button
            onClick={() => handleChangeTab(item as keyof typeof tabList)}
            type="button"
            key={index}
            className={
              active === item
                ? `${styles.active} ${styles.tab}`
                : `${styles.tab}`
            }
          >
            {item}
          </button>
        ))}
      </div>
      <div>
        {/* <div>{isPending && 'loading...'}</div> */}
        <div>
          {renderData.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </div>
      </div>
    </div>
  )
}
/* eslint-disable */

/* eslint-disable */
function UseEffectDemo() {
  /**
   * useEffect
   *
   * 作用：类似于componentDidMount 和 componentDidUpdate
   * 参数：第二个参数的值发生改变时，才执行第一个参数传的副作用函数
   * 缺点：useEffect 监听数据变化，会在组件初次渲染后就会调用一次，没有保存修改前的旧值，不会返回一个函数取消监听，所以可以自己实现一个类 vue 的 watch
   */
  const [number, setNumber] = useState(0)

  function handleResize() {
    console.log('is resizing')
  }
  window.addEventListener('resize', handleResize)
  const timer = setInterval(() => {
    console.log('interval')
  }, 1000)
  console.log('重渲染时执行')

  useEffect(() => {
    console.log('依赖变化时执行')
    // 返回的 destory 函数作为下一次 callback 执行之前调用，用于清除上一次 callback 产生的副作用
    return function () {
      console.log('切换页面后执行')
      clearInterval(timer)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div>
      <h3>useEffect</h3>
      <button type="button" onClick={() => setNumber((n) => n + 1)}>
        {number}
      </button>
    </div>
  )
}
/* eslint-disable */

function UseMemoDemo() {
  /**
   * 在函数组件render上下文中同步执行一个函数逻辑，这个函数返回值可以作为一个缓存值存储起来。
   * useMemo 第一个参数是一个函数返回值作为缓存，第二个参数是一个数组存放依赖项
   *
   * 作用：
   * 1. 缓存组件，减少子组件 render 次数（将模板 dom 存储到缓存变量）
   * 2. 缓存计算结构（依赖项为常量）
   */
  const [count, setCount] = useState(0)
  const [dbCount, setDbcount] = useState(0)
  const cacheValue = useMemo(() => `current count: ${count}`, [count])

  return (
    <div>
      <h2>useMemo</h2>
      <div>
        <span>
          cache: {cacheValue}
          <button type="button" onClick={() => setCount((c) => c + 1)}>
            改变缓存
          </button>
        </span>
      </div>
      <div>
        <span>
          dbCount: {dbCount}
          <button type="button" onClick={() => setDbcount((c) => c + 2)}>
            不改变缓存
          </button>
        </span>
      </div>
    </div>
  )
}

function UseCallbackDemo() {
  /**
   * useCallback 和 useMemo 类似，不同点在 useCallback 返回一个函数
   *
   * 作用：
   * 由于父组件传递一个函数给子组件的时候，由于是无状态组件每一次都会重新生成新的 props 函数，这时候就会触发子组件的更新
   * 为了减少组件更新，可以用 useCallback 传一个函数 作为 props 给子组件
   */
  // count 变化触发父组件更新，但子组件没有更新
  const [count, setCount] = useState(0)
  const getInfo = useCallback((info: string) => alert(info), [])

  // 子组件加 React.demo 搭配才会优化组件更新！
  const SonComp = React.memo((props: any) => {
    const { sonInfo } = props

    // 只有初始化的时候打印了
    console.log('子组件更新')

    return (
      <div>
        <h3>子组件</h3>
        <button type="button" onClick={() => sonInfo('^(*￣(oo)￣)^')}>
          父组件传的函数 alert
        </button>
      </div>
    )
  })
  return (
    <div>
      <h2>useCallback</h2>
      <div>
        <span>count: {count}</span>
        <button type="button" onClick={() => setCount((c) => c + 1)}>
          count + 1
        </button>
      </div>
      <SonComp sonInfo={getInfo} />
    </div>
  )
}

function UseContextDemo() {
  /**
   * useContext
   *
   * 获取父级组件传递的 context
   * 参数一般使用 createContext 方式创建，也可以父级上下文 context 传递（参数是 context）
   * 返回值为 context 对象内部保存的 value 值
   *
   */
  const DemoContext = () => {
    const value1 = useContext(MyContext)

    return <div>DemoContext: {value1.contextValue1}</div>
  }

  const DemoConsumer = () => {
    return (
      <MyContext.Consumer>
        {(value) => <div>DemoConsumer: {value.contextValue2}</div>}
      </MyContext.Consumer>
    )
  }

  return (
    <div>
      <h3>UseContextDemo</h3>
      <MyContext.Provider
        value={{ contextValue1: 'hook value1', contextValue2: 'hook value2' }}
      >
        <DemoContext />
        <DemoConsumer />
      </MyContext.Provider>
    </div>
  )
}

function UseRefDemo() {
  const DomRef = useRef(null)

  useEffect(() => {
    console.log(DomRef.current)
  }, [])

  return (
    <div>
      <h2>useRef</h2>
      <div ref={DomRef}>ref test test</div>
    </div>
  )
}

export default function FunctionBasic() {
  return (
    <div>
      <h1>Hooks</h1>
      <h2>数据更新驱动</h2>
      <UseStateDemo />
      <UseReducerDemo />
      {/* <UseTransitionAndUseDeferredValueDemo /> */}
      <h2>执行副作用</h2>
      {/* <UseEffectDemo /> */}
      <h2>状态获取和传递</h2>
      <UseContextDemo />
      <UseRefDemo />
      <h2>状态派生和保存</h2>
      <UseMemoDemo />
      <UseCallbackDemo />
    </div>
  )
}
