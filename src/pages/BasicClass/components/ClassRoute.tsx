import { history, Link } from '@umijs/max'
import React from 'react'

/**
 * 在类组件中通过 props 获取到 history，然后调用 history.push(path) 进行路由跳转
 * 类组件不能调用 hooks
 */

export default class ClassRoute extends React.Component {
  unlisten: any
  // constructor(props: any) {
  //   super(props)
  // }
  componentDidMount() {
    // 监听路由变化
    // this.unlisten = this.props.history.listen(({ location, action }) => {
    //   this.setState(() => ({ historyDetail: location })) // 不生效
    //   console.log('监听路由Mount', location, this.state.historyDetail)
    // })
  }
  componentWillUnmount() {
    // 取消监听路由
    // this.unlisten()
  }
  render() {
    return (
      <div>
        <h2>路由</h2>
        <div>hostory: {JSON.stringify(history.location)}</div>
        <button
          type="button"
          onClick={() => history.push('basic-function?type=view')}
        >
          history 加 query 跳转函数组件
        </button>
        <button
          type="button"
          onClick={() => history.push('basic-function', { type: 'add' })}
        >
          history 加 state 跳转函数组件
        </button>
        <Link to="/basic-function">跳转函数组件</Link>
      </div>
    )
  }
}
