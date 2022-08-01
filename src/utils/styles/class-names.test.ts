import { classNames } from './class-names'

describe('classNames()', () => {
  it.each([
    { classes: [], expected: '' },
    { classes: ['foo'], expected: 'foo' },
    { classes: ['foo', 'bar'], expected: 'foo bar' }
  ])('should return %s', ({ classes, expected }) => {
    expect(classNames(...classes)).toBe(expected)
  })
})
