import { useState } from 'react'
import { useWatch } from '../hooks/useWatch'

export default function FunctionHooksCustom() {
  const [count, setCount] = useState(0)
  const [watchResult, setWatchResult] = useState('')

  function addCount() {
    setCount((c) => c + 1)
  }
  const unwatch = useWatch(
    count,
    (prev: any, next: any) => {
      setWatchResult('监听 count, ' + '新：' + prev + '旧：' + next)
    },
    {
      immediate: true,
    },
  )

  return (
    <div>
      <h2>自定义 hooks</h2>
      <div>
        unwatch：
        <span>{watchResult}</span>
        <button onClick={addCount} type="button">
          count++
        </button>
        <button onClick={unwatch} type="button">
          取消监听 count
        </button>
      </div>
    </div>
  )
}
