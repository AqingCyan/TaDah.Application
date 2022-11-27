import React, { HTMLInputTypeAttribute } from 'react'
import s from './index.module.less'

interface FormInputProps {
  errorStatus?: boolean
  errorText?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  value?: string | ReadonlyArray<string> | number | undefined
  icon?: React.ReactElement
  placeholder?: string
  type?: HTMLInputTypeAttribute
}

const FormInput: React.FC<FormInputProps> = (props) => {
  const { errorStatus, onChange, errorText, value, icon, placeholder, type } = props

  return (
    <section className={errorStatus ? s.inputError : s.input}>
      <span className={s.icon}>{icon}</span>
      <input type={type} placeholder={placeholder} onChange={onChange} value={value} />
      {errorText && <span className={s.error}>{errorText}</span>}
    </section>
  )
}

export default FormInput
