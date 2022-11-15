import { Dispatch, SetStateAction, useEffect, useMemo } from 'react'
import createPersistedState from 'use-persisted-state'
import { useMediaQuery } from 'react-responsive'

const useThemeSchemeState = createPersistedState<'purple' | 'green' | undefined>('themeScheme')
const useColorSchemeState = createPersistedState<boolean | undefined>('darkScheme')

export default function useTheme(): {
  theme: string | undefined
  setTheme: Dispatch<SetStateAction<'purple' | 'green' | undefined>>
  inDark: boolean
  setInDark: Dispatch<SetStateAction<boolean | undefined>>
} {
  const systemPrefersDark = useMediaQuery({ query: '(prefers-color-scheme: dark)' }, undefined)
  const [theme, setTheme] = useThemeSchemeState()
  const [isDark, setIsDark] = useColorSchemeState()

  const inDark = useMemo<boolean>(
    () => (isDark === undefined ? Boolean(systemPrefersDark) : isDark),
    [isDark, systemPrefersDark],
  )

  const handleMode = () => {
    switch (theme) {
      case 'green':
        if (inDark) {
          document.body.classList.add('greenDark')
          document.body.classList.remove('dark', 'green')
        } else {
          document.body.classList.add('green')
          document.body.classList.remove('greenDark', 'dark')
        }
        return
      case 'purple':
      default:
        if (inDark) {
          document.body.classList.add('dark')
          document.body.classList.remove('greenDark', 'green')
        } else {
          document.body.classList.remove('greenDark', 'green', 'dark')
        }
        return
    }
  }

  useEffect(handleMode, [theme, isDark])

  return { theme, setTheme, inDark, setInDark: setIsDark }
}
