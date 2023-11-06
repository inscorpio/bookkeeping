import { fireEvent, render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import Category from '~/app/create/Category'

const list = [{ id: 1, label: '三餐', icon: '' }]

test('render', () => {
  const { container } = render(
    <Category list={list} onSelectItem={() => {}} />,
  )
  expect(container).toMatchSnapshot()
})

test('onSelectItem', async () => {
  let dummy = 0
  render(
    <Category
      list={list}
      onSelectItem={(id) => {
        dummy = id
      }}
    />,
  )
  const li = screen.getByText('三餐')
  await fireEvent.click(li)
  expect(dummy).toBe(1)
})
