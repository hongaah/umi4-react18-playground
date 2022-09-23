import { MyContext } from '../context'

/**
 * 依赖注入 context
 */

export default function FunctionContext() {
  return (
    <div>
      <MyContext.Consumer>
        {(value) => (
          <div>
            <div>{value.contextValue1}</div>
            <div>{value.contextValue2}</div>
          </div>
        )}
      </MyContext.Consumer>
    </div>
  )
}
