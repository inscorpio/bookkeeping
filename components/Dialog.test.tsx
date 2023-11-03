import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import Dialog from '~/components/Dialog'

test('initial', async () => {
  render(
    <Dialog
      visible={false}
      onClose={() => {}}
    />,
  )
  const dialog = screen.getByRole('dialog')
  expect(dialog).not.toBeVisible()
})
