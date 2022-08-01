import { ParsedUrlQuery } from 'querystring'
import { filterOptions, sortOptions } from 'shared/constants/feedback.constants'
import { getCategoryFromQuery, getSortOptionFromQuery } from './filter.utils'

describe('Filter Utils', () => {
  describe('getSortOptionFromQuery()', () => {
    it.each([
      {
        query: {} as ParsedUrlQuery,
        expected: sortOptions[0],
        when: 'no sort query is provided'
      },
      {
        query: { sort: [] } as ParsedUrlQuery,
        expected: sortOptions[0],
        when: 'sort query is array'
      },
      {
        query: { sort: 'foo:bar' } as ParsedUrlQuery,
        expected: sortOptions[0],
        when: 'sort query is not found'
      },
      {
        query: { sort: 'foo' } as ParsedUrlQuery,
        expected: sortOptions[0],
        when: 'sort query has invalid format'
      },
      {
        query: { sort: 'upvotes:asc' } as ParsedUrlQuery,
        expected: sortOptions[1],
        when: 'sort query is provided correctly'
      }
    ])(
      'should return correct sort option when $when',
      ({ query, expected }) => {
        expect(getSortOptionFromQuery(query)).toEqual(expected)
      }
    )
  })

  describe('getCategoryFromQuery()', () => {
    it.each([
      {
        query: {} as ParsedUrlQuery,
        expected: filterOptions[0],
        when: 'no category query is provided'
      },
      {
        query: { category: 'all' } as ParsedUrlQuery,
        expected: filterOptions[0],
        when: 'category query is all'
      },
      {
        query: { category: [] } as ParsedUrlQuery,
        expected: filterOptions[0],
        when: 'category query is array'
      },
      {
        query: { category: 'foo' } as ParsedUrlQuery,
        expected: filterOptions[0],
        when: 'category query is not found'
      },
      {
        query: { category: 'BUG' } as ParsedUrlQuery,
        expected: filterOptions[4],
        when: 'category query is provided correctly'
      }
    ])(
      'should return correct sort option when $when',
      ({ query, expected }) => {
        expect(getCategoryFromQuery(query)).toEqual(expected)
      }
    )
  })
})
