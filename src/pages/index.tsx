import React from 'react'
import AddRecord from '@/pages/AddRecord'
import s from './index.less'

export default function HomePage() {
  return (
    <div className={s.container}>
      <AddRecord />
    </div>
  )
}
