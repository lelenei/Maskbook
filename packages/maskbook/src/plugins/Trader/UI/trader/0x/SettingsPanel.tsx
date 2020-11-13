import React, { useState } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { makeStyles, createStyles, Accordion, AccordionSummary, Typography, AccordionDetails } from '@material-ui/core'
import type { SwapSource } from '../../../types'
import { SelectSourcePanel } from './SelectSourcePanel'
import { SlippageSlider } from './SlippageSlider'

const useStyles = makeStyles((theme) => {
    return createStyles({
        root: {},
        heading: {},
    })
})

export interface SettingsPanelProps {}

export function SettingsPanel(props: SettingsPanelProps) {
    const classes = useStyles()
    const [listOfSource, setListOfSource] = useState<SwapSource[]>([])

    return (
        <div className={classes.root}>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>Slippage Tolerance</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <SlippageSlider />
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>Exchanges</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <SelectSourcePanel selected={listOfSource} onChange={setListOfSource} />
                </AccordionDetails>
            </Accordion>
        </div>
    )
}
