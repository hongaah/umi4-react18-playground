import React from 'react'
import { MyContext } from '../context'

export default class ClassContext extends React.Component {
  /**
   * 跨级关系的 React 组件的通讯
   *
   * 在 Vue 使用 provide 在祖先组件中注入一些数据，在后代组件中用 inject 来接受这些数据，称做依赖注入
   * 在 React 也有类似的功能，叫做 Context
   *
   * 使用：
   * 传值：
   *  1. <MyContext.provider value={xxx: xxx}></MyContext.provider>
   *  2. 如果没有定义父容器的传值，就使用 context 定义的默认值
   *
   * 获取：
   *  1. <MyContext.Consumer>{(value) => (<div>value.xxx</div>)}</MyContext.Consumer>
   *  2. static contextType = MyContext
   *     {this.context.xxx}
   *
   * 缺点：头部传值对象需要完全覆盖 context 定义的值，否则获取不了未被覆盖的值
   */

  static contextType = MyContext
  render() {
    return (
      <div>
        <MyContext.Consumer>
          {(value) => (
            <div>
              <div>方式一：{value.contextValue1}</div>
            </div>
          )}
        </MyContext.Consumer>
        <div>
          {/* @ts-ignore */}
          <div>方式二：{this.context.contextValue2}</div>
        </div>
      </div>
    )
  }
}
