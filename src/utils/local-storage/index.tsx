const APP_KEY = 'PRODUCT_FEEDBACK'

export function getStorageItem<T = string>(key: string) {
  if (typeof window === 'undefined') return

  const data = window.localStorage.getItem(`${APP_KEY}_${key}`)

  if (!data) {
    return
  }

  return JSON.parse(data) as T
}

export function setStorageItem<T = string>(key: string, value: T) {
  if (typeof window === 'undefined') return

  const data = JSON.stringify(value)
  return window.localStorage.setItem(`${APP_KEY}_${key}`, data)
}

export function removeStorageItem(key: string) {
  if (typeof window === 'undefined') return

  window.localStorage.removeItem(`${APP_KEY}_${key}`)
}
