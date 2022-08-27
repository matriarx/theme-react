import {ThemeMode} from '../enums'

import type {Theme} from '../types'

export const getLocalStorageTheme = (): Map<
  string,
  Map<string, string>
> | null => {
  const theme = JSON.parse(localStorage.getItem('matriarx_theme') || 'null')

  return theme ? new Map(Object.entries(theme)) : null
}

export const setLocalStorageTheme = (theme: Theme): void =>
  localStorage.setItem('matriarx_theme', JSON.stringify(theme))

export const getLocalStorageThemes = (): Map<
  string,
  Map<string, Map<string, string> | string>
> | null => {
  const themes = JSON.parse(localStorage.getItem('matriarx_theme') || 'null')

  return themes ? new Map(Object.entries(themes)) : null
}

export const setLocalStorageThemes = (theme: Theme): void =>
  localStorage.setItem('matriarx_theme', JSON.stringify(theme))

export const getSystemThemeMode = (): ThemeMode =>
  window.matchMedia('(prefers-color-scheme: dark)').matches
    ? ThemeMode.DARK
    : ThemeMode.LIGHT

export default {
  getLocalStorageTheme,
  setLocalStorageTheme,
  getLocalStorageThemes,
  setLocalStorageThemes,
  getSystemThemeMode,
}
