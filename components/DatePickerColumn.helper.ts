import { fireEvent } from '@testing-library/react'
import { ITEM_HEIGHT } from '~/components/DatePickerColumn'

async function touchMove(li: HTMLElement, startPageY: number, lastPageY: number) {
  await fireEvent.touchStart(li, {
    changedTouches: [{ pageY: startPageY }],
  })
  await fireEvent.touchMove(li, {
    changedTouches: [{ pageY: lastPageY }],
  })
  await fireEvent.touchEnd(li)
}

export async function touchMoveUp(
  li: HTMLElement,
  {
    step = 1,
    startPageY = ITEM_HEIGHT * step,
    lastPageY = 0,
  }: {
    step?: number
    startPageY?: number
    lastPageY?: number
  } = {},
) {
  await touchMove(li, startPageY, lastPageY)
}

export async function touchMoveDown(
  li: HTMLElement,
  {
    step = 1,
    startPageY = 0,
    lastPageY = ITEM_HEIGHT * step,
  }: {
    step?: number
    startPageY?: number
    lastPageY?: number
  } = {},
) {
  await touchMove(li, startPageY, lastPageY)
}
