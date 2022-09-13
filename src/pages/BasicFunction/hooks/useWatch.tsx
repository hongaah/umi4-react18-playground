import { useEffect, useRef } from 'react'

/**
 * 类 Vue 的 watch 监听方法
 *
 * @param target
 * @param callback: (newValue, oldValue) => unWatch
 * @param config: { immediate: 控制在组件初次渲染后是否马上执行callback回调函数}
 */

export function useWatch(
  target: any,
  callback: (prev: any, next: any) => void,
  config: { immediate: boolean } = { immediate: false },
) {
  const oldValue = useRef(null)
  const isFirstRender = useRef(true)
  const isWatch = useRef(true)

  useEffect(() => {
    if (!isWatch.current) return

    if (isFirstRender.current) {
      isFirstRender.current = false
      if (config.immediate) {
        callback(target, oldValue.current)
      }
    } else {
      // useEffect会在组件初次渲染后就会调用一次，通过判断是否首次渲染执行回调
      callback(target, oldValue.current)
    }

    oldValue.current = target
  }, [target])

  // 调用unwatch函数可以停止监听该数据
  const unWatch = () => {
    isWatch.current = false
  }

  return unWatch
}
