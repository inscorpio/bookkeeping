import { beforeEach, describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import Keyboard from './KeyBoard'

beforeEach(() => {
  render(<Keyboard />)
})

describe('keyboard', () => {
  const testId = 'value'

  it('should be render', async () => {
    const { container } = render(<Keyboard />)
    expect(container).toMatchSnapshot()
  })

  describe('click number', () => {
    it('should concat new number', async () => {
      await fireEvent.click(screen.getByText('1'))
      await fireEvent.click(screen.getByText('2'))
      expect(screen.getByTestId(testId).innerHTML).toBe('12')
    })

    it('should be guaranteed to have two decimal places', async () => {
      await fireEvent.click(screen.getByText('1'))
      await fireEvent.click(screen.getByText('.'))
      await fireEvent.click(screen.getByText('2'))
      await fireEvent.click(screen.getByText('3'))
      await fireEvent.click(screen.getByText('4'))
      expect(screen.getByTestId(testId).innerHTML).toBe('1.23')
    })
  })

  describe('click dot', () => {
    it('should maintain one dot when click one more time dot', async () => {
      await fireEvent.click(screen.getByText('1'))
      await fireEvent.click(screen.getByText('.'))
      await fireEvent.click(screen.getByText('.'))
      await fireEvent.click(screen.getByText('.'))
      expect(screen.getByTestId(testId).innerHTML).toBe('1.')
    })
  })

  describe('click icon', () => {
    it('should clear value when click clear icon', async () => {
      await fireEvent.click(screen.getByText('1'))
      await fireEvent.click(screen.getByText('2'))

      expect(screen.getByTestId(testId).innerHTML).toBe('12')

      await fireEvent.click(screen.getByTestId('icon-clear').parentElement!)
      expect(screen.getByTestId(testId).innerHTML).toBe('0')
    })

    it('should remove one char when click backspace icon', async () => {
      await fireEvent.click(screen.getByText('1'))
      await fireEvent.click(screen.getByText('2'))

      expect(screen.getByTestId(testId).innerHTML).toBe('12')

      await fireEvent.click(screen.getByTestId('icon-backspace').parentElement!)
      expect(screen.getByTestId(testId).innerHTML).toBe('1')
    })

    it('should reset value to initial value when value is empty', async () => {
      await fireEvent.click(screen.getByText('1'))

      expect(screen.getByTestId(testId).innerHTML).toBe('1')

      await fireEvent.click(screen.getByTestId('icon-backspace').parentElement!)
      expect(screen.getByTestId(testId).innerHTML).toBe('0')
    })

    it('should not change value when value is initial value', async () => {
      await fireEvent.click(screen.getByTestId('icon-backspace').parentElement!)
      expect(screen.getByTestId(testId).innerHTML).toBe('0')
    })
  })
})
