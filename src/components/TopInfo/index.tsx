import React from 'react'
import useTheme from '@/hooks/useTheme'
import darkIcon from '@/assets/darkIcon.png'
import lightIcon from '@/assets/lightIcon.png'
import s from './index.module.less'

interface TopInfoProps {
  text: string
  mustColor?: 'dark' | 'light'
}

const TopInfo: React.FC<TopInfoProps> = (props) => {
  const { text, mustColor } = props

  const { theme, setTheme, inDark, setInDark } = useTheme()

  return (
    <header className={s.topContainer}>
      <h1 style={mustColor ? { color: mustColor === 'dark' ? '#ffffff' : '#333333' } : undefined}>{text}</h1>
      <span className={s.theme} onTouchStart={() => setTheme(theme === 'green' ? 'purple' : 'green')} />
      {mustColor ? (
        <img
          className={s.icon}
          src={mustColor === 'dark' ? lightIcon : darkIcon}
          alt="icon"
          onTouchStart={() => setInDark(!inDark)}
        />
      ) : (
        <img
          className={s.icon}
          src={inDark ? lightIcon : darkIcon}
          alt="icon"
          onTouchStart={() => setInDark(!inDark)}
        />
      )}
    </header>
  )
}

export default TopInfo
