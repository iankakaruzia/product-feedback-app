import { Category } from 'models/feedback'
import { useRouter } from 'next/router'
import { createContext, ReactNode, useContext, useState } from 'react'
import { getCategoryFromQuery } from 'utils/filter'
import { FilterOption, filterOptions } from 'utils/filter/fields'

export type FilterByContextData = {
  filterBy: FilterOption
  updateFilterBy: (selectedFilterBy: FilterOption) => void
  updateFilterByFromCategory: (category: Category) => void
}

export const FilterByContextDefaultValues: FilterByContextData = {
  filterBy: filterOptions[0],
  updateFilterBy: () => null,
  updateFilterByFromCategory: () => null
}

export const FilterByContext = createContext<FilterByContextData>(
  FilterByContextDefaultValues
)

export type FilterByProviderProps = {
  children: ReactNode
}

function FilterByProvider({ children }: FilterByProviderProps) {
  const { query } = useRouter()
  const [filterBy, setFilterBy] = useState(getCategoryFromQuery(query))

  function updateFilterBy(selectedFilterBy: FilterOption) {
    setFilterBy(selectedFilterBy)
  }

  function updateFilterByFromCategory(category: Category) {
    const selectedFilterBy = filterOptions.find(
      (option) => option.category === category
    )
    if (selectedFilterBy) {
      setFilterBy(selectedFilterBy)
    }
  }

  return (
    <FilterByContext.Provider
      value={{ filterBy, updateFilterBy, updateFilterByFromCategory }}
    >
      {children}
    </FilterByContext.Provider>
  )
}

function useFilterBy() {
  const context = useContext(FilterByContext)

  if (!context) {
    throw new Error('useFilterBy must be used within a FilterByProvider')
  }

  return context
}

export { useFilterBy, FilterByProvider }
