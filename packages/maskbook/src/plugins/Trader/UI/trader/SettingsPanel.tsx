import React, { useState } from 'react'
import {
    makeStyles,
    createStyles,
    Accordion,
    AccordionSummary,
    Typography,
    AccordionDetails,
    Paper,
    Card,
    IconButton,
} from '@material-ui/core'
import Close from '@material-ui/icons/Close'
import { TradePool, TradeProvider } from '../../types'
import { SelectPoolPanel } from './SelectPoolPanel'
import { SlippageSlider } from './SlippageSlider'
import { useStylesExtends } from '../../../../components/custom-ui-helper'
import { getEnumAsArray } from '../../../../utils/enum'
import { DEFAULT_SLIPPAGE_TOLERANCE } from '../../constants'
import { SelectProviderPanel } from './SelectProviderPanel'
import { resolveTradeProviderName } from '../../pipes'

const useStyles = makeStyles((theme) => {
    return createStyles({
        root: {
            overflow: 'auto',
            backgroundColor: theme.palette.background.paper,
            paddingBottom: theme.spacing(2),
            position: 'absolute',
            '&::-webkit-scrollbar': {
                display: 'none',
            },
        },
        close: {
            top: 0,
            right: 0,
            position: 'absolute',
        },
        caption: {
            padding: theme.spacing(2, 1),
        },
        heading: {
            flex: 1,
        },
        subheading: {},
        accordion: {
            backgroundColor: theme.palette.background.default,
        },
    })
})

export interface SettingsPanelProps extends withClasses<'root'> {
    onClose(): void
}

export function SettingsPanel(props: SettingsPanelProps) {
    const { onClose } = props

    const classes = useStylesExtends(useStyles(), props)
    const [provider, setProvider] = useState(TradeProvider.UNISWAP)
    const [slippage, setSlippage] = useState(DEFAULT_SLIPPAGE_TOLERANCE)
    const [listOfSource, setListOfSource] = useState<TradePool[]>(getEnumAsArray(TradePool).map((x) => x.value))

    return (
        <div className={classes.root}>
            <IconButton className={classes.close} color="primary" onClick={onClose}>
                <Close />
            </IconButton>
            <Paper component="section" elevation={0}>
                <Typography className={classes.caption} variant="h6" color="textPrimary">
                    Settings
                </Typography>
                <Card elevation={0}>
                    <Accordion className={classes.accordion} elevation={0} expanded>
                        <AccordionSummary>
                            <Typography className={classes.heading}>Provider</Typography>
                            <Typography className={classes.subheading}>{resolveTradeProviderName(provider)}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <SelectProviderPanel value={provider} onChange={setProvider} />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={classes.accordion} elevation={0} expanded>
                        <AccordionSummary>
                            <Typography className={classes.heading}>Slippage Tolerance</Typography>
                            <Typography className={classes.subheading}>{slippage / 100}%</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <SlippageSlider value={slippage} onChange={setSlippage} />
                        </AccordionDetails>
                    </Accordion>
                    {provider === TradeProvider.ZRX ? (
                        <Accordion className={classes.accordion} elevation={0} expanded>
                            <AccordionSummary>
                                <Typography className={classes.heading}>Exchanges</Typography>
                                <Typography className={classes.subheading}>{listOfSource.length}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <SelectPoolPanel value={listOfSource} onChange={setListOfSource} />
                            </AccordionDetails>
                        </Accordion>
                    ) : null}
                </Card>
            </Paper>
        </div>
    )
}
