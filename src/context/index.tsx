import {
  createContext,
  useState, //useEffect
} from 'react'

import {
  //getLocalStorageTheme,
  setLocalStorageTheme, //getSystemThemeMode
} from '../utils'

// import {ThemeMode} from '../enums'

import type {ReactNode} from 'react'

import type {Theme} from '../types'

export interface ThemeContext {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContext>({} as ThemeContext)

export const setThemeStyle = async (
  theme: Theme,
  style: object,
  prefix?: string,
) => {
  for (const key of Object.keys(style)) {
    if (typeof style[key as keyof object] === 'object') {
      setThemeStyle(
        theme,
        style[key as keyof object],
        `${prefix ? prefix + '-' : ''}${key}`,
      )
    } else {
      document.documentElement.style.setProperty(
        `--${prefix ? prefix + '-' : ''}${key}`,
        `var(--${theme}-${prefix ? prefix + '-' : ''}${key})`,
      )
    }
  }
}

export interface ThemeContextProvider {
  children: ReactNode
}

export const ThemeContextProvider = (
  props: ThemeContextProvider,
): JSX.Element => {
  const [theme, setTheme] = useState<Theme>(
    {} as Theme, //getLocalStorageTheme()
  )

  // const lazyLoadTheme = async (theme: Theme) => {
  //   if (!themes[theme]) {
  //     themes[theme] = await import(`static/themes/${theme}`)

  //     setThemeStyle(theme, themes[theme] as Style)
  //   }
  // }

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      setLocalStorageTheme(theme)
      setTheme(theme)
    },
  }

  // useEffect(() => {
  //   lazyLoadTheme(theme)
  // }, [theme])

  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export default ThemeContextProvider
