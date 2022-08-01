import {
  getStorageItem,
  removeStorageItem,
  setStorageItem
} from './local-storage.utils'

describe('Local Storage Utils', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  describe('getStorageItem()', () => {
    it('should return undefined when no value is stored', () => {
      expect(getStorageItem('foo')).toBeUndefined()
    })

    it('should return the stored value', () => {
      window.localStorage.setItem('PRODUCT_FEEDBACK_foo', JSON.stringify('bar'))

      expect(getStorageItem('foo')).toBe('bar')
    })
  })

  describe('setStorageItem()', () => {
    it('should set the value', () => {
      setStorageItem('foo', 'bar')

      expect(window.localStorage.getItem('PRODUCT_FEEDBACK_foo')).toStrictEqual(
        JSON.stringify('bar')
      )
    })
  })

  describe('removeStorageItem()', () => {
    it('should remove the value', () => {
      window.localStorage.setItem('PRODUCT_FEEDBACK_foo', JSON.stringify('bar'))

      removeStorageItem('foo')

      expect(window.localStorage.getItem('PRODUCT_FEEDBACK_foo')).toBeNull()
    })
  })
})
