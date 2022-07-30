import { render, screen } from '@testing-library/react'
import { trpc } from 'lib/trpc'

import { RoadmapSummaryCard } from './RoadmapSummaryCard'

describe('<RoadmapSummaryCard />', () => {
  it.each([
    {
      data: undefined,
      message: 'there is no data',
      expected: { live: '0', inProgress: '0', planned: '0' }
    },
    {
      data: { live: 1, inProgress: 2, planned: 3 },
      message: 'there is data',
      expected: { live: '1', inProgress: '2', planned: '3' }
    }
  ])('should render correct summary when $message', ({ data, expected }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jest.spyOn(trpc, 'useQuery').mockReturnValueOnce({ data } as any)
    const disabledLink = data === undefined ? 'true' : 'false'
    render(<RoadmapSummaryCard />)

    expect(screen.getByText('Roadmap')).toBeInTheDocument()
    expect(screen.getByText('Planned')).toBeInTheDocument()
    expect(screen.getByText('In Progress')).toBeInTheDocument()
    expect(screen.getByText('Live')).toBeInTheDocument()
    expect(screen.getByText('View')).toHaveAttribute(
      'aria-disabled',
      disabledLink
    )
    expect(
      screen.getByText('Live').parentElement?.parentElement?.children[1]
    ).toHaveTextContent(expected.live)
    expect(
      screen.getByText('In Progress').parentElement?.parentElement?.children[1]
    ).toHaveTextContent(expected.inProgress)
    expect(
      screen.getByText('Planned').parentElement?.parentElement?.children[1]
    ).toHaveTextContent(expected.planned)
  })
})
