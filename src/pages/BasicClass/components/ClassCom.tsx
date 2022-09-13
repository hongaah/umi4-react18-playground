import React from 'react'

/**
 * 类组件
 */
interface PropsType {
  title: string
  onClick: () => void
  changeTitle: (data: string) => void
  children: React.ReactNode
  specifySlot: () => React.ReactNode
  scopeSlot: (data: string) => React.ReactNode
}

interface StateType {
  className: string
  styleData: Record<string, unknown>
  booleanData: boolean
  specifySlot: React.ReactNode
  scopeSlot: React.ReactNode
}

// ES6 的 class 形式定义组件
class ClassCom extends React.Component<PropsType, StateType> {
  // 在类组件中的构造函数 constructor 接受 props 作为传入组件的参数数据集合，并调用 super(props) 把 props 传给 React.Component 构造函数，这样类组件才能接受参数数据集合 props
  constructor(props: PropsType) {
    super(props)

    this.state = {
      className: 'title',
      styleData: { padding: '10px', fontSize: '16px' },
      booleanData: true,
      specifySlot: this.props?.specifySlot ? this.props.specifySlot() : '', // 具名插槽
      scopeSlot: this.props?.scopeSlot ? this.props.scopeSlot('123') : '', // 作用域插槽
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleChangeState = this.handleChangeState.bind(this)
    this.handleChangeProps = this.handleChangeProps.bind(this)
  }

  // 监听 React 组件的 DOM 事件
  handleClick() {
    this.props.onClick()
  }

  // 改变内部数据 state，setState() 接受内部数据 state 和参数数据 props 作为参数，而且 state 和 props 只读无法修改但都是最新的
  handleChangeState() {
    this.setState((state) => ({
      ...state,
      styleData: { padding: '20px', fontSize: '18px' },
    }))
  }

  // 改变参数数据 props
  handleChangeProps() {
    this.props.changeTitle('类组件：hasChange')
  }

  // 监听组件数据变化，props 和 state 改变时触发 componentDidUpdate 这个生命周期方法，接受两个参数 prevProps & prevState
  componentDidUpdate(prevProps: PropsType, prevState: StateType) {
    if (prevProps.title !== this.props.title) {
      console.log('props changed')
    }
    if (prevState.styleData !== this.state.styleData) {
      console.log('state changed')
    }
  }

  render() {
    return (
      // class & style 变量和固定值
      <div className="container" style={{ padding: '10px' }}>
        <div style={this.state.styleData} className={this.state.className}>
          {this.props.title}
        </div>

        <button onClick={this.handleClick} type="button">
          点击
        </button>
        <button onClick={this.handleChangeState} type="button">
          改变 state 修改样式
        </button>
        <button onClick={this.handleChangeProps.bind(this)} type="button">
          改变 props 参数数据
        </button>

        <div>{this.props.children}</div>
        <div>{this.state.specifySlot}</div>
        <div>{this.state.scopeSlot}</div>
      </div>
    )
  }
}

// 定义 props 参数数据的默认值
// ClassCom.defaultProps = {
//   title: '传值不生效',
// }

export default ClassCom
