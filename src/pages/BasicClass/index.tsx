import React from 'react'

import ClassComponent from './components/ClassCom'

/**
 * 类组件首页
 */
interface PropsType {
  title: string
}

interface StateType {
  title: string
}

interface ComPropsType {
  handleChangeState: () => void
}

export default class BasicClass extends React.Component<PropsType, StateType> {
  classCompRef: React.RefObject<ComPropsType>
  constructor(props: PropsType) {
    super(props)
    this.state = {
      title: '类组件',
    }
    this.handleChangeProps = this.handleChangeProps.bind(this)

    // refs 组件实例: 父调子方法
    this.classCompRef = React.createRef()
  }

  // refs 组件实例: 父调子方法
  handleChangeSon() {
    this.classCompRef.current?.handleChangeState()
  }

  // 监听 React 组件的 DOM 事件
  handleParentClick() {
    console.log('parent clicked')
  }

  // 改变参数数据props
  handleChangeProps(data: string) {
    this.setState(() => ({
      title: data,
    }))
  }

  // 具名插槽：返回 jsx
  getSpecifySlot() {
    return <div>来自父组件的具名插槽</div>
  }

  // 作用域插槽：获取子组件传来的数据写jsx
  getSonSlot(data: React.ReactNode) {
    return <div>来自子组件的作用域插槽{data}</div>
  }

  render() {
    return (
      <div>
        <ClassComponent
          ref={this.classCompRef}
          title={this.state.title}
          onClick={() => this.handleParentClick()}
          changeTitle={this.handleChangeProps}
          specifySlot={this.getSpecifySlot}
          scopeSlot={this.getSonSlot}
        >
          来自父组件的普通插槽
        </ClassComponent>

        <button onClick={() => this.handleChangeSon()} type="button">
          调用子组件的方法
        </button>
      </div>
    )
  }
}
