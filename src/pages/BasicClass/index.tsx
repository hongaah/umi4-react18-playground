import { PageContainer, ProCard } from '@ant-design/pro-components'
import React from 'react'
import ClassComponent from './components/ClassCom'
import ClassRoute from './components/ClassRoute'
// import ClassLifeCircle from './components/ClassLifeCircle'
import { MyContext } from './context'

/**
 * 类组件首页
 */
interface PropsType {
  title: string
}

interface StateType {
  title: string
  inputValue: string
  comValue: number
  contextObj: {
    contextValue1: string
    contextValue2: string
  }
}

// interface ComPropsType {
//   handleChangeState: () => void
// }
// React.RefObject<ComPropsType>

export default class BasicClass extends React.Component<PropsType, StateType> {
  classCompRef: any
  constructor(props: PropsType) {
    super(props)
    this.state = {
      title: '类组件',
      inputValue: '',
      comValue: 0,
      contextObj: {
        contextValue1: '11111',
        contextValue2: '22222',
      },
    }
    this.handleChangeProps = this.handleChangeProps.bind(this)
    this.changeInputValue = this.changeInputValue.bind(this)
    this.changeComValue = this.changeComValue.bind(this)

    // refs 组件实例: 父调子方法
    this.classCompRef = React.createRef()
  }

  // 表单元素的 v-model
  changeInputValue(e: React.ChangeEvent<HTMLInputElement>) {
    // setState 第一个回调函数 (state, props) => object 返回的对象在React内部会和 this.state进行合并来更新 state；执行 setState() 并不总是立即更新组件，它会批量推迟更新，所以可靠的是在第二个回调函数去读取更新后的state
    this.setState(
      () => ({
        inputValue: e.target.value,
      }),
      () => {
        console.log('inputValue 已更新')
      },
    )
    // this.setState({ inputValue: e.target.value })
  }

  // 组件的 v-model
  changeComValue(data: number) {
    this.setState({ comValue: data })
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
      <MyContext.Provider value={this.state.contextObj}>
        <PageContainer
          header={{
            title: '类组件',
          }}
        >
          <ProCard title="首页" hoverable bordered>
            <button onClick={() => this.handleChangeSon()} type="button">
              调用子组件的方法
            </button>

            <div>
              <h2>表单</h2>
              <div>
                <input
                  type="text"
                  value={this.state.inputValue}
                  onChange={this.changeInputValue}
                />
                <span>{this.state.inputValue}</span>
              </div>
            </div>
          </ProCard>
          <ProCard
            title="🌰"
            gutter={[8, 8]}
            wrap
            ghost
            style={{ marginBlockStart: 8 }}
          >
            <ProCard colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <ClassComponent
                ref={this.classCompRef}
                title={this.state.title}
                comValue={this.state.comValue}
                changeComValue={this.changeComValue}
                onClick={() => this.handleParentClick()}
                changeTitle={this.handleChangeProps}
                specifySlot={this.getSpecifySlot}
                scopeSlot={this.getSonSlot}
              >
                来自父组件的普通插槽
              </ClassComponent>
            </ProCard>
            <ProCard colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <ClassRoute />
            </ProCard>
            <ProCard
              title="类组件的生命周期"
              colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }}
            >
              {/* <ClassLifeCircle /> */}
            </ProCard>
          </ProCard>
        </PageContainer>
      </MyContext.Provider>
    )
  }
}
