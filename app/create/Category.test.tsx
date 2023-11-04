import { render } from '@testing-library/react'
import { expect, test } from 'vitest'
import Category from '~/app/create/Category'

test('render', () => {
  const { container } = render(
    <Category />,
  )
  expect(container).toMatchSnapshot()
})
