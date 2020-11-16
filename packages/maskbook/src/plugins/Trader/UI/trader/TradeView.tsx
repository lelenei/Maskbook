import React, { useState } from 'react'
import { makeStyles, createStyles, IconButton } from '@material-ui/core'
import { Settings } from 'react-feather'
import { EthereumStatusBar } from '../../../../web3/UI/EthereumStatusBar'
import { Trader, TraderProps } from './Trader'
import { SettingsPanel } from './SettingsPanel'

const useStyles = makeStyles((theme) => {
    return createStyles({
        root: {
            width: 350,
            margin: '0 auto',
            position: 'relative',
        },
        bar: {
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: theme.spacing(2),
        },
        settings: {
            zIndex: 1,
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            position: 'absolute',
        },
    })
})

export interface TradeViewProps {
    TraderProps: TraderProps
}

export function TradeView(props: TradeViewProps) {
    const { TraderProps } = props
    const classes = useStyles()

    const [settingsOpen, setSettingsOpen] = useState(false)

    return (
        <div className={classes.root}>
            <div className={classes.bar}>
                <EthereumStatusBar />
                <IconButton color="primary" onClick={() => setSettingsOpen(true)}>
                    <Settings size={18} />
                </IconButton>
            </div>
            <Trader {...TraderProps} />
            {settingsOpen ? (
                <SettingsPanel classes={{ root: classes.settings }} onClose={() => setSettingsOpen(false)} />
            ) : null}
        </div>
    )
}