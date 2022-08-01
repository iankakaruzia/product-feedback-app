import { act, renderHook } from '@testing-library/react'
import { ReactNode } from 'react'
import { filterOptions } from 'utils/filter/fields'
import { FilterByProvider, useFilterBy } from './use-filter-by'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      query: {}
    }
  }
}))

describe('useFilterBy()', () => {
  it('should return filter by option', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <FilterByProvider>{children}</FilterByProvider>
    )
    const { result } = renderHook(() => useFilterBy(), { wrapper })

    expect(result.current.filterBy).toEqual(filterOptions[0])
  })

  it('should update filter by option', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <FilterByProvider>{children}</FilterByProvider>
    )
    const { result } = renderHook(() => useFilterBy(), { wrapper })

    act(() => {
      result.current.updateFilterBy(filterOptions[1])
    })

    expect(result.current.filterBy).toEqual(filterOptions[1])
  })

  it('should update filter by option from category', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <FilterByProvider>{children}</FilterByProvider>
    )
    const { result } = renderHook(() => useFilterBy(), { wrapper })

    act(() => {
      result.current.updateFilterByFromCategory('BUG')
    })

    expect(result.current.filterBy).toEqual(filterOptions[4])
  })
})
