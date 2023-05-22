import {
  useEffect,
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef,
  useRef,
} from 'react'
import { View, CustomWrapper } from '@tarojs/components'
import { nextTick } from '@tarojs/taro'
import * as utils from '../utils'
import { PickerColumnProps } from '../types/picker-column'
import { range , isObj } from '../utils'

import * as computed from './wxs'
import './index.scss'

const DEFAULT_DURATION = 200

function Index(
  props: PickerColumnProps & { index: number },
  ref: any,
): JSX.Element {
  const {
    valueKey,
    itemHeight = 48,
    visibleItemCount = 5,
    initialOptions,
    defaultIndex,
    className,
    style,
    onChange,
    index: curColIndex,
    ...others
  } = props

  const [options, setOptions] = useState<Array<any>>([])
  const [currentIndex, setCurrentIndex] = useState<unknown>()
  const [duration, setDuration] = useState(0)
  const [startY, setStartY] = useState(0)
  const [offset, setOffset] = useState(0)
  const [startOffset, setStartOffset] = useState(0)
  const [canInit, setCanInit] = useState(true)
  const isMoving = useRef(false)

  const isDisabled = useCallback(function (option) {
    return isObj(option) && option.disabled
  }, [])

  const adjustIndex = useCallback(
    function (index: number): any {
      const initialOptions_ = (
        options.length ? options : initialOptions
      ) as Array<any>
      const count = initialOptions_.length
      index = range(index, 0, count)
      for (let i = index; i < count; i++) {
        if (!isDisabled(initialOptions_[i])) {
          return i
        }
      }
      for (let i = index - 1; i >= 0; i--) {
        if (!isDisabled(initialOptions_[i])) {
          return i
        }
      }
    },
    [isDisabled, options, initialOptions],
  )

  const setIndex = useCallback(
    function (index: number, userAction?: boolean) {
      index = adjustIndex(index) || 0
      const _offset = -index * Number(itemHeight)
      if (index !== currentIndex) {
        setCurrentIndex(index)
        setOffset(_offset)
        if (onChange && userAction) {
          nextTick(() => {
            onChange(curColIndex)
          })
        }
        return
      }
      return setOffset(_offset)
    },
    [adjustIndex, curColIndex, currentIndex, itemHeight, onChange],
  )

  useEffect(function () {
    setCurrentIndex(defaultIndex)
    setIndex(defaultIndex || 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(
    function () {
      if (canInit) {
        setOptions(initialOptions || [])
      }
    },
    [canInit, initialOptions],
  )

  const onTouchMove = useCallback(
    function (event) {
      event.preventDefault()
      if (!isMoving.current) isMoving.current = true
      const deltaY = event.touches[0].clientY - startY
      setOffset(startOffset + deltaY)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [startOffset, itemHeight, options, startY],
  )

  const onTouchStart = useCallback(
    function (event) {
      setStartY(event.touches[0].clientY)
      setStartOffset(offset)
      setDuration(0)
    },
    [offset],
  )

  const onTouchEnd = useCallback(
    function () {
      const indexCount = offset - startOffset > 0 ? Math.floor : Math.ceil
      setDuration(DEFAULT_DURATION)
      const index = range(
        indexCount(-offset / Number(itemHeight)),
        0,
        options.length - 1,
      )
      setIndex(index, true)
      nextTick(() => {
        if (isMoving.current) isMoving.current = false
      })
    },
    [startOffset, offset, itemHeight, options.length, setIndex],
  )

  const onClickItem = useCallback(
    function (event) {
      const { index } = event.currentTarget.dataset
      if (!isMoving.current) {
        setIndex(Number(index), true)
      }
    },
    [setIndex],
  )

  const getCurrentIndex = useCallback(
    function () {
      return currentIndex
    },
    [currentIndex],
  )

  const getValue = useCallback(
    function () {
      return options[currentIndex as number]
    },
    [options, currentIndex],
  )

  const getOptionText = useCallback(
    function (option) {
      return isObj(option) && valueKey && valueKey in option
        ? option[valueKey]
        : option
    },
    [valueKey],
  )

  const setValue = useCallback(
    function (value) {
      for (let i = 0; i < options.length; i++) {
        if (getOptionText(options[i]) === value) {
          return setIndex(i)
        }
      }
      return Promise.resolve()
    },
    [setIndex, getOptionText, options],
  )

  useImperativeHandle(ref, () => {
    return {
      getCurrentIndex,
      getValue,
      setValue,
      props,
      setIndex,
      set: (opt: any) =>
        new Promise<void>((resolve) => {
          setOptions(opt.options)
          setCanInit(false)
          resolve()
        }),
    }
  })

  const renderColumn = (
    <View
      style={computed.wrapperStyle({
        offset,
        itemHeight,
        visibleItemCount,
        duration,
      })}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchEnd}
    >
      {options.map((option: any, index: number) => {
        return (
          <View
            disable-scroll
            key={`picker-column__item${index}`}
            data-index={index}
            style={{ height: itemHeight + 'px' }}
            className={
              'van-ellipsis ' +
              utils.bem('picker-column__item', {
                disabled: option && option.disabled,
                selected: index === currentIndex,
              }) +
              ' ' +
              (index === currentIndex ? 'active-class' : '')
            }
            onClick={onClickItem}
          >
            {computed.optionText(option, valueKey)}
          </View>
        )
      })}
    </View>
  )

  return (
    <View
      className={`van-picker-column  ${className}`}
      style={utils.style([
        computed.rootStyle({
          itemHeight,
          visibleItemCount,
        }),
        style,
      ])}
      {...others}
    >
      {process.env.TARO_ENV === 'weapp' ? (
        <View>
          <CustomWrapper>
            <View>{renderColumn}</View>
          </CustomWrapper>
        </View>
      ) : (
        <View>{renderColumn}</View>
      )}
    </View>
  )
}

const PickerColumn = forwardRef(Index)
export { PickerColumn }
export default PickerColumn
