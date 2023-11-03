import useTouchMove from '~/hooks/useTouchMove'

interface Props {
  columns: string[]
  selectIndex: number
  onSelect: (selectIndex: number) => void
}

export const ITEM_HEIGHT = 28

// !!! 注意 translateY 是负数
export default function DatePickerColumn({ columns, selectIndex, onSelect }: Props) {
  const initialMovedIstance = selectIndex * ITEM_HEIGHT
  const { moveDistance, touchStart, touchMove } = useTouchMove(selectIndex, columns.length - 1)
  const finalDistance = initialMovedIstance + moveDistance
  const handleTouchEnd = () => {
    onSelect(finalDistance / ITEM_HEIGHT)
  }

  return (
    <li
      className="flex flex-col items-center overflow-hidden"
      onTouchStart={touchStart}
      onTouchMove={touchMove}
      onTouchEnd={handleTouchEnd}
    >
      {
        columns.map((v, i) => {
          return (
            <span
              key={`${v}-${i}`}
              style={{ transform: `translateY(${(finalDistance) * -1}px)` }}
            >
              {v}
            </span>
          )
        })
      }
    </li>
  )
}
