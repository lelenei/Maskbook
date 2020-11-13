import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core'
const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            minHeight: 266,
            position: 'relative',
        },
        bar: {
            width: 350,
            margin: `${theme.spacing(2)}px auto 0`,
        },
        progress: {
            bottom: theme.spacing(1),
            right: theme.spacing(1),
            position: 'absolute',
        },
        router: {
            marginTop: 0,
        },
    })
})

export interface SelectSourcePanelProps {}

export function SelectSourcePanel(props: SelectSourcePanelProps) {
    const classes = useStyles()
    return <div className={classes.root}></div>
}
