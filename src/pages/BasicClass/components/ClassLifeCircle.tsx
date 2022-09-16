import React from 'react'

export interface StateType {
  title: string
}

export default class ClassLifeCircle extends React.Component<any, StateType> {
  /**
   * React 生命周期：挂载、更新、销毁
   *
   * 钩子函数执行顺序：
   * 挂载：constructor - getDerivedStateFromProps - render - componentDidMount
   * 更新：getDerivedStateFromProps - shouldComponentUpdate - render - getSnapshotBeforeUpdate - componentDidUpdate
   * 卸载：componentWillUnmount
   *
   * 父子组件钩子函数执行顺序：
   * 挂载：constructor - getDerivedStateFromProps - render - (子)contructor - (子)getDerivedStateFromProps - (子)render - (子)componentDidMount - componentDidMount
   * 更新：getDerivedStateFromProps - shouldComponentUpdate - render - (子)getDerivedStateFromProps - (子)shouldComponentUpdate - (子)render - (子)getSnapshotBeforeUpdate - getSnapshotBeforeUpdate - (子)componentDidUpdate - componentDidUpdate
   * 卸载：(子)componentWillUnmount - componentWillUnmount
   *
   *
   * 会引起组件更新的操作：
   * 1. 组件的 props 发生改变
   * 2. this.setState
   * 3. this.forceUpdate() // 但是会跳过shouldComponentUpdate钩子函数。 但其子组件会触发正常的生命周期钩子函数，包括shouldComponentUpdate钩子函数。
   *
   *
   * React 弊端：
   * React 更新是自顶向下的进行递归更新的，不管你嵌套了多少层组件，都会触发到最后一层组件的更新。所以 React 父组件更新了，会引起子组件更新阶段的钩子函数的调用，vue则不会
   * 更新优化：用 React.PureComponent 来创建那种更新计算开销很大的子组件，来优化性能
   * React.PureComponent 会创建一个自行调用 shouldComponentUpdate 钩子函数的组件，在 shouldComponentUpdate 中自动浅层对比(即只对照地址是否变更) props和state，若数据有变化，返回true，则触发组件更新。因此在该组件中也不能再次调用shouldComponentUpdate钩子函数
   * eg: export default class HelloWorld extends React.PureComponent {}
   *
   */

  /**
   * constructor：React.Component 子类的构造函数
   *
   * 需要调用 super，否则 this.props 为 undefined
   * 声明 state 来初始化内部数据，不能通过 this.setState()，不能将 props 直接赋值给 state，然后使用 state，而不直接使用 props，这样做，不然当 props 更新时对应的 state 不会更新
   * 为事件处理函数绑定实例，否则在函数中无法使用this
   */
  constructor(props: any) {
    super(props)
    this.state = {
      title: '生命周期',
    }

    console.log('执行 constructor')
  }

  /**
   * getDerivedStateFromProps: (props, state) => null | {}
   *
   * 钩子函数在组件挂载阶段、组件更新阶段都会被调用
   * 钩子函数接收组件的props和state作为参数，函数最后必须返回一个对象或者null，若返回一个对象，则用这个对象来更新state，若返回null，则不更新state
   * 钩子函数中无法使用this
   * 参数的 state 是用组件的 props 来派生出来的，完全受 props 控制，即使用 this.setState() 改变也不起作用
   */
  static getDerivedStateFromProps(props: unknown, state: unknown) {
    console.log('执行 getDerivedStateFromProps', props, state)
    return null
  }

  /**
   * render
   *
   * 应该为纯函数，在其中不应该去修改state和props
   * 最后必须返回一些React元素，且这些React元素必须只有一个根元素。若不想在DOM中额外增加一个无用的标签，可以使用<React.Fragment>作为根元素
   */
  render() {
    console.log('执行 render')
    return (
      <div onClick={(() => this.setState({ title: '123' })).bind(this)}>
        {this.state.title}
      </div>
    )
  }

  /**
   * componentDidMount
   *
   * 钩子函数会在组件挂载后（插入 DOM 树中）立即调用，类似 Vue 中的 mounted
   *
   * 在这个阶段一般做以下事情：
   * 1. 请求服务器
   * 2. 获取 DOM
   * 3. 监听事件，必须在 componentWillUnmount() 中取消监听
   * 4. 可以调用 this.setState() 来改变 state 数据
   */
  componentDidMount() {
    console.log('执行 componentDidMount')
    return null
  }

  /**
   * shouldComponentUpdate
   *
   * 钩子函数接收更新之后的 state 和 props，通过和更新前的 state 和 props 对比，来判断是否更新组件，如果函数最后返回 true 则更新组件，反之返回 false 则不更新组件，一般用于性能优化
   *
   * 在组件中执行 this.forceUpdate() 触发组件更新，则不会执行该钩子函数
   * 在其中执行 this.setState() 时，必须在一个条件语句里中，否会陷入无限更新的死循环，导致程序崩溃
   * 函数最后必须返回 true 或 false，若返回 false，后续 render、getSnapshotBeforeUpdate、componentDidUpdate 钩子函数不再被调用。
   */
  shouldComponentUpdate(nextProps: any, nextState: any) {
    console.log('执行 shouldComponentUpdate', nextProps, nextState)
    return true
  }

  /**
   * getSnapshotBeforeUpdate
   *
   * 钩子函数相当 Vue 中 beforeUpdate 钩子函数，是在组件重新渲染后挂载到 DOM 之前被调用，故在该钩子函数中获取到的 DOM 还是更新的 DOM，一般用组件UI更新前后的交互操作
   * 钩子函数调用时，props 和 state 已经更新了，故该钩子函数接收更新前的 props 和 state 作为参数，作为比较使用
   * 钩子函数最后返回一个值，该值会被 componentDidUpdate 钩子函数的第三个参数 snapshot 接收。
   *
   * 在其中执行 this.forceUpdate() 或 this.setState() 时，必须在一个条件语句里中，否会陷入无限更新的死循环，导致程序崩溃
   * 函数最后必须返回一个值或 null，否则代码会报错
   * 必须和 componentDidUpdate 钩子函数一起调用，否则代码会报错
   */
  getSnapshotBeforeUpdate(prevProps: any, prevState: any) {
    console.log('执行getSnapshotBeforeUpdate', prevProps, prevState)
    return null
  }

  /**
   * componentDidUpdate
   *
   * 钩子函数在组件重新渲染后并挂载到DOM中后才执行的
   *
   * 在其中执行 this.forceUpdate() 或 this.setState() 时，必须在一个条件语句里中，否会陷入无限更新的死循环，导致程序崩溃在其中执行 this.forceUpdate() 或 this.setState() 时，必须在一个条件语句里中，否会陷入无限更新的死循环，导致程序崩溃
   * 如果 shouldComponentUpdate 钩子函数返回值为 false，则不会调用 componentDidUpdate 钩子函数
   */
  componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
    console.log('执行componentDidUpdate', prevProps, prevState, snapshot)
  }

  /**
   * componentWillUnmount
   *
   * 钩子函数在组件卸载及销毁之前调用
   *
   * 在这个阶段一般做以下事情：
   * 清除定时器
   * 取消网络请求
   * 解绑在componentDidMount钩子函数中监听的事件
   */
  componentWillUnmount() {
    console.log('执行componentWillUnmount')
  }
}
