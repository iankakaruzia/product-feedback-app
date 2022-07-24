import { ParsedUrlQuery } from 'querystring'
import { filterOptions, sortOptions } from './fields'

export function getSortOptionFromQuery(query: ParsedUrlQuery) {
  if (!query.sort || Array.isArray(query.sort)) {
    return sortOptions[0]
  }

  const foundSortOption = sortOptions.find((option) => {
    const querySortBy = (query.sort as string).split(':')[0]
    const queryOrderBy = (query.sort as string).split(':')[1]

    return (
      option.orderBy.toLowerCase() === queryOrderBy.toLowerCase() &&
      option.sortBy.toLowerCase() === querySortBy.toLowerCase()
    )
  })

  return foundSortOption ?? sortOptions[0]
}

export function getCategoryFromQuery(query: ParsedUrlQuery) {
  if (
    !query.category ||
    query.category === 'all' ||
    Array.isArray(query.category)
  ) {
    return filterOptions[0]
  }

  const foundCategory = filterOptions.find(
    (option) =>
      option.category?.toLowerCase() ===
      (query.category as string).toLowerCase()
  )

  return foundCategory ?? filterOptions[0]
}
