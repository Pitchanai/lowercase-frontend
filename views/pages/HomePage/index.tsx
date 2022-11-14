import { useRef, useState } from 'react'
import { BigInput, NotiText, Root } from './components'

export const HomePage = () => {
  const textRef = useRef<HTMLInputElement | null>(null)
  const [textValue, setTextValue] = useState('')
  const [notiText, setNotiText] = useState('')

  const inputHandle = (val: React.ChangeEvent<HTMLInputElement>) => {
    const text = val.target.value
    const lowercaseText = text?.toLowerCase()
    setTextValue(text)

    if (!lowercaseText) return

    navigator?.clipboard.writeText(lowercaseText)
    setNotiText(lowercaseText)
  }

  const inputFocusHandle = () => {
    textRef?.current?.select()
  }

  return (
    <Root>
      {notiText ? <NotiText>"{notiText}" copied!</NotiText> : null}
      <BigInput
        ref={textRef}
        value={textValue}
        onChange={inputHandle}
        onFocus={inputFocusHandle}
        placeholder="paste here..."
      />
    </Root>
  )
}
