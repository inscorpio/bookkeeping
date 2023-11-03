import { useEffect, useRef, useState } from 'react'
import type { Dispatch, SetStateAction, TouchEvent, TouchEventHandler } from 'react'
import { ITEM_HEIGHT } from '~/components/DatePickerColumn'

export default function useTouchMove(rawStep: number, maxStep: number): {
  moveDistance: number
  touchStart: TouchEventHandler<HTMLLIElement>
  touchMove: TouchEventHandler<HTMLLIElement>
  setMoveDistance: Dispatch<SetStateAction<number>>
} {
  const startPosition = useRef(0)
  const [moveDistance, setMoveDistance] = useState(0)

  function touchStart(e: TouchEvent<HTMLLIElement>) {
    const touch = e.changedTouches[0]
    const { pageY } = touch
    // fix multiple moves
    startPosition.current = pageY + moveDistance
  }

  function touchMove(e: TouchEvent<HTMLLIElement>) {
    e.stopPropagation()
    const touch = e.changedTouches[0]
    const { pageY } = touch
    const rawMoveDistance = startPosition.current - pageY
    const step = Number.parseInt(`${rawMoveDistance / ITEM_HEIGHT}`)
    // const isPlusStep = rawDistance % ITEM_HEIGHT > ITEM_HEIGHT / 2
    let finalStep = step
    if (rawStep + step < 0) {
      finalStep = 0 - rawStep
    }
    else if (rawStep + step > maxStep) {
      finalStep = maxStep - rawStep
    }
    setMoveDistance(finalStep * ITEM_HEIGHT)
  }

  useEffect(() => {
    setMoveDistance(0)
  }, [rawStep])

  return {
    moveDistance,
    touchStart,
    touchMove,
    setMoveDistance,
  }
}
