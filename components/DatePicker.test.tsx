import { fireEvent, render, screen } from '@testing-library/react'
import dayjs from 'dayjs'
import { expect, test, vi } from 'vitest'
import DatePicker from '~/components/DatePicker'
import { touchMoveUp } from '~/components/DatePickerColumn.helper'

test('render', () => {
  const { container } = render(
    <DatePicker
      visible={true}
      value={new Date('2023-11-02')}
      onClose={() => {}}
      onComfirm={() => {}}
    />,
  )
  expect(container).toMatchSnapshot()
})

test('onClose', async () => {
  let visible = true

  render(
    <DatePicker
      visible={visible}
      onClose={() => {
        visible = false
      }}
      onComfirm={() => {}}
    />,
  )

  const cancelButton = screen.getByRole('button', { name: '取消' })
  await fireEvent.click(cancelButton)
  expect(visible).toBe(false)
})

test('onComfirm when leading zero', async () => {
  let dummy
  const handleClose = vi.fn()
  render(
    <DatePicker
      visible={true}
      value={dayjs('2023-01-01').toDate()}
      onClose={handleClose}
      onComfirm={(value) => {
        dummy = dayjs(value).format('YYYY-MM-DD')
      }}
    />,
  )

  const [year, month, day] = screen.getAllByRole('listitem')
  await touchMoveUp(year)
  await touchMoveUp(month)
  await touchMoveUp(day)
  const confirmButton = screen.getByRole('button', { name: '确定' })
  await fireEvent.click(confirmButton)

  expect(dummy).toBe('2024-02-02')
  expect(handleClose).toHaveBeenCalled()
})

test('onComfirm when no leading zero', async () => {
  let dummy
  const handleClose = vi.fn()
  render(
    <DatePicker
      visible={true}
      value={dayjs('2023-10-10').toDate()}
      onClose={handleClose}
      onComfirm={(value) => {
        dummy = dayjs(value).format('YYYY-MM-DD')
      }}
    />,
  )

  const [year, month, day] = screen.getAllByRole('listitem')
  await touchMoveUp(year)
  await touchMoveUp(month)
  await touchMoveUp(day)
  const confirmButton = screen.getByRole('button', { name: '确定' })
  await fireEvent.click(confirmButton)

  expect(dummy).toBe('2024-11-11')
  expect(handleClose).toHaveBeenCalled()
})

test('echo after comfirm', async () => {
  let date = '2023-11-01'
  const handleClose = vi.fn()
  const { rerender, container } = render(
    <DatePicker
      visible={true}
      value={dayjs(date).toDate()}
      onClose={handleClose}
      onComfirm={(value) => {
        date = dayjs(value).format('YYYY-MM-DD')
      }}
    />,
  )

  const day = screen.getAllByRole('listitem')[2]
  await touchMoveUp(day)
  const confirmButton = screen.getByRole('button', { name: '确定' })
  await fireEvent.click(confirmButton)

  expect(date).toBe('2023-11-02')
  expect(handleClose).toHaveBeenCalled()

  rerender(
    <DatePicker
      visible={true}
      value={dayjs(date).toDate()}
      onClose={handleClose}
      onComfirm={(value) => {
        date = dayjs(value).format('YYYY-MM-DD')
      }}
    />,
  )

  expect(container).toMatchSnapshot()
})
