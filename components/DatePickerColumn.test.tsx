import { fireEvent, render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import DatePickerColumn, { ITEM_HEIGHT } from '~/components/DatePickerColumn'
import { touchMoveDown, touchMoveUp } from '~/components/DatePickerColumn.helper'

const columns = Array(10).fill('')

test('render', () => {
  const { container } = render(
    <DatePickerColumn
      columns={columns}
      selectIndex={0}
      onSelect={() => {}}
    />,
  )

  expect(container).toMatchSnapshot()
})

test('basic', async () => {
  let selectIndex = 0
  render(
    <DatePickerColumn
      columns={columns}
      selectIndex={selectIndex}
      onSelect={(index) => {
        selectIndex = index
      }}
    />,
  )

  const li = screen.getByRole('listitem')

  await touchMoveUp(li)

  expect(li.firstChild).toHaveStyle(`transform: translateY(-${ITEM_HEIGHT}px)`)
  expect(selectIndex).toBe(1)
})

test.todo('移动距离超过一半时 step +1', async () => {
  let selectIndex = 0
  render(
    <DatePickerColumn
      columns={columns}
      selectIndex={selectIndex}
      onSelect={(index) => {
        selectIndex = index
      }}
    />,
  )

  const li = screen.getByRole('listitem')

  await touchMoveUp(li)

  expect(li.firstChild).toHaveStyle(`transform: translateY(-${ITEM_HEIGHT}px)`)
  expect(selectIndex).toBe(1)
})

test('multiple moves', async () => {
  render(
    <DatePickerColumn
      columns={columns}
      selectIndex={0}
      onSelect={() => {}}
    />,
  )
  const li = screen.getByRole('listitem')

  await touchMoveUp(li)

  expect(li.firstChild).toHaveStyle(`transform: translateY(-${ITEM_HEIGHT}px)`)

  await touchMoveUp(li)

  expect(li.firstChild).toHaveStyle(`transform: translateY(-${ITEM_HEIGHT * 2}px)`)
})

test('should not exceed the first position when move down', async () => {
  let selectIndex = 3
  render(
    <DatePickerColumn
      columns={columns}
      selectIndex={selectIndex}
      onSelect={(index) => {
        selectIndex = index
      }}
    />,
  )

  const li = screen.getByRole('listitem')
  const step = 4

  await touchMoveDown(li, {
    step,
  })

  expect(li.firstChild).toHaveStyle(`transform: translateY(0px)`)
  expect(selectIndex).toBe(0)
})

test('should not exceed the last position when move up', async () => {
  const maxStep = columns.length - 1
  const step = 2
  let selectIndex = 8
  render(
    <DatePickerColumn
      columns={columns}
      selectIndex={selectIndex}
      onSelect={(index) => {
        selectIndex = index
      }}
    />,
  )

  const li = screen.getByRole('listitem')

  await touchMoveUp(li, {
    step,
  })

  expect(li.firstChild).toHaveStyle(`transform: translateY(-${ITEM_HEIGHT * maxStep}px)`)
  expect(selectIndex).toBe(maxStep)
})
