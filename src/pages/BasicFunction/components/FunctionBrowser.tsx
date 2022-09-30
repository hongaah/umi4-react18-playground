import { useState } from 'react'

export default function FunctionBrowser() {
  const [copied, setCopied] = useState('')
  function copy() {
    navigator.clipboard.readText().then((clipText) => {
      setCopied(clipText)
    })
  }

  return (
    <div>
      <h2>浏览器相关</h2>
      <div className="editor">copy: {copied}</div>
      <button type="button" onClick={copy}>
        粘贴
      </button>
    </div>
  )
}
