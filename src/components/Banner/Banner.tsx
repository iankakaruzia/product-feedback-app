import { Menu, Transition } from '@headlessui/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Fragment, useState } from 'react'

import { AddFeedbackLink } from 'components/AddFeedbackLink'
import { getSortOptionFromQuery } from 'utils/filter'
import { SortOption, sortOptions } from 'utils/filter/fields'
import { classNames } from 'utils/styles/class-names'

type BannerProps = {
  suggestionsCount: number
}

export function Banner({ suggestionsCount }: BannerProps) {
  const { query, push } = useRouter()
  const [sortOption, setSortOption] = useState(getSortOptionFromQuery(query))

  function handleSort(selectedSortOption: SortOption) {
    setSortOption(selectedSortOption)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { sort, ...others } = query
    const isDefaultSort =
      selectedSortOption.orderBy === sortOptions[0].orderBy &&
      selectedSortOption.sortBy === sortOptions[0].sortBy

    push({
      pathname: '',
      query: {
        ...others,
        ...(isDefaultSort
          ? {}
          : {
              sort: `${selectedSortOption.sortBy.toLowerCase()}:${selectedSortOption.orderBy.toLowerCase()}`
            })
      }
    })
    return
  }

  function getBannerTitle() {
    if (suggestionsCount === 1) {
      return '1 Suggestion'
    }

    return `${suggestionsCount} Suggestions`
  }

  return (
    <div className='bg-gray-800 h-14 md:h-18 flex items-center justify-between md:justify-start px-6 md:pr-3 md:rounded-xl'>
      <div className='hidden md:flex items-center'>
        <Image
          src='/assets/suggestions/icon-suggestions.svg'
          alt=''
          width={23}
          height={24}
        />
        <span className='ml-4 mr-10 text-heading3 text-white font-bold'>
          {getBannerTitle()}
        </span>
      </div>

      <Menu as='div' className='relative md:flex-1'>
        <Menu.Button className='text-heading4 text-gray-200'>
          {({ open }: { open: boolean }) => (
            <Fragment>
              <span className={classNames(open && 'text-opacity-75')}>
                Sort by:{' '}
                <span className='font-bold mr-2'>{sortOption.label}</span>
              </span>
              {open ? (
                <Image
                  src='/assets/shared/icon-arrow-up.svg'
                  alt=''
                  width={10}
                  height={7}
                />
              ) : (
                <Image
                  src='/assets/shared/icon-arrow-down.svg'
                  alt=''
                  width={10}
                  height={7}
                />
              )}
            </Fragment>
          )}
        </Menu.Button>

        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='absolute z-10 w-64 -bottom-52 bg-white rounded-xl shadow-lg'>
            {sortOptions.map((option) => (
              <Menu.Item
                key={`sort-option-${option.sortBy.toLowerCase()}-${option.orderBy.toLowerCase()}`}
              >
                {({ active }: { active: boolean }) => (
                  <button
                    onClick={() => handleSort(option)}
                    className={classNames(
                      'h-12 px-6 w-full text-left leading-[23px] border-t border-gray-800 border-solid border-opacity-[0.15] first:border-0 flex items-center justify-between transition-colors',
                      active && 'text-purple-500'
                    )}
                  >
                    <span>{option.label}</span>
                    {option.sortBy === sortOption.sortBy &&
                      option.orderBy === sortOption.orderBy && (
                        <Image
                          src='/assets/shared/icon-check.svg'
                          alt=''
                          width={13}
                          height={11}
                        />
                      )}
                  </button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>

      <AddFeedbackLink />
    </div>
  )
}
