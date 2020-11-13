import React, { useCallback } from 'react'
import { difference } from 'lodash-es'
import { makeStyles, createStyles, Checkbox, FormControlLabel } from '@material-ui/core'
import { SwapSource } from '../../../types'
import { getEnumAsArray } from '../../../../../utils/enum'
import { resolveSwapSourceName } from '../../../pipes'

const useStyles = makeStyles((theme) => {
    return createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        name: {
            width: '50%',
        },
    })
})

export interface SelectSourcePanelProps {
    selected: SwapSource[]
    onChange: (value: SwapSource[]) => void
}

export function SelectSourcePanel(props: SelectSourcePanelProps) {
    const { selected } = props
    const classes = useStyles()

    const onChange = useCallback(
        (ev: React.ChangeEvent<HTMLInputElement>) => {
            const source = Number.parseInt(ev.target.value, 10) as SwapSource
            props.onChange(selected.includes(source) ? difference(selected, [source]) : selected.concat(source))
        },
        [selected, props.onChange],
    )

    return (
        <div className={classes.root}>
            {getEnumAsArray(SwapSource).map((source) => (
                <FormControlLabel
                    className={classes.name}
                    label={resolveSwapSourceName(source.value)}
                    control={
                        <Checkbox name={source.key} checked={selected.includes(source.value)} onChange={onChange} />
                    }
                />
            ))}
        </div>
    )
}
