import React from 'react'
import useTheme from '@/hooks/useTheme'
import darkIcon from '@/assets/darkIcon.png'
import lightIcon from '@/assets/lightIcon.png'
import s from './index.module.less'

interface TopInfoProps {
  text: string
}

const TopInfo: React.FC<TopInfoProps> = (props) => {
  const { text } = props

  const { theme, setTheme, inDark, setInDark } = useTheme()

  return (
    <header className={s.topContainer}>
      <h1>{text}</h1>
      <span className={s.theme} onTouchStart={() => setTheme(theme === 'green' ? 'purple' : 'green')} />
      <img className={s.icon} src={inDark ? lightIcon : darkIcon} alt="icon" onTouchStart={() => setInDark(!inDark)} />
    </header>
  )
}

export default TopInfo
