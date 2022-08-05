import { useRouter } from 'next/router'

import { Badge } from 'components/Badge'
import { useFilterBy } from 'hooks/use-filter-by'
import { FilterOption } from 'models/feedback.model'
import { filterOptions } from 'shared/constants/feedback.constants'

export function CategoriesCard() {
  const { query, push } = useRouter()
  const { filterBy, updateFilterBy } = useFilterBy()

  function handleFilterBy(selectedOption: FilterOption) {
    updateFilterBy(selectedOption)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { category, ...others } = query
    push({
      pathname: '',
      query: {
        ...others,
        ...(selectedOption.category === null
          ? {}
          : { category: selectedOption.category.toLowerCase() })
      }
    })
    return
  }

  return (
    <div className='mb-6 flex flex-wrap gap-2 rounded-xl bg-white p-6 md:m-0'>
      {filterOptions.map((option) => (
        <Badge
          key={`filter-option-${option.label}`}
          onClick={() => handleFilterBy(option)}
          isActive={filterBy.category === option.category}
          label={option.label}
          className='mb-4'
        />
      ))}
    </div>
  )
}
