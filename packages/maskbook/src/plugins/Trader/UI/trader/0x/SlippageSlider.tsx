import React from 'react'
import { Slider } from '@material-ui/core'
import { DEFAULT_SLIPPAGE_TOLERANCE, MIN_SLIPPAGE_TOLERANCE, MAX_SLIPPAGE_TOLERANCE } from '../../../constants'

export interface SlippageSliderProps {
    value?: number
}

export function SlippageSlider(props: SlippageSliderProps) {
    const { value = DEFAULT_SLIPPAGE_TOLERANCE } = props
    return (
        <Slider
            defaultValue={value}
            getAriaValueText={(value: number) => `${value / 1000}%`}
            step={10}
            marks
            min={MIN_SLIPPAGE_TOLERANCE}
            max={MAX_SLIPPAGE_TOLERANCE}
            valueLabelDisplay="auto"
        />
    )
}
