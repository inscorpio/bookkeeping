import { fireEvent, render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import Category from '~/app/create/Category'

test('render', () => {
  const { container } = render(
    <Category onSelect={() => {}} />,
  )
  expect(container).toMatchSnapshot()
})

test('onSelect', async () => {
  let dummy = 0
  render(
    <Category onSelect={(id) => {
      dummy = id
    }}
    />,
  )
  const li = screen.getByText('日常')
  await fireEvent.click(li)
  expect(dummy).toBe(5)
})
