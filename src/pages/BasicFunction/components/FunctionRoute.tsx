import {
  history,
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from '@umijs/max'

export default function FunctionRoute() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()

  return (
    <div>
      <h2>路由</h2>
      <button type="button" onClick={() => navigate('/basic-class')}>
        navigate 跳转类组件
      </button>
      <button type="button" onClick={() => history.push('basic-class')}>
        history 跳转类组件
      </button>
      <button
        type="button"
        onClick={() => history.push('basic-class', { type: 'add' })}
      >
        history 加 state 跳转类组件
      </button>
      <Link to="/basic-class">跳转类组件</Link>
      <div>location：{JSON.stringify(location)}</div>
      <div>query 信息：{searchParams.toString()}</div>
      <div>query 信息获取某个参数：{searchParams.get('type')}</div>
      <button type="button" onClick={() => setSearchParams({ type: 'test' })}>
        修改 query 信息
      </button>
    </div>
  )
}
