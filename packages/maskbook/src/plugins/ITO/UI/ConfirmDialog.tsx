import { createStyles, makeStyles, Typography, Grid, Paper, Card } from '@material-ui/core'
import type { PoolSettings } from '../hooks/useFillCallback'
import ActionButton from '../../../extension/options-page/DashboardComponents/ActionButton'
import { useI18N } from '../../../utils/i18n-next-ui'

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        title: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
            fontSize: 18,
        },
        line: {
            display: 'flex',
            padding: theme.spacing(1),
        },
        data: {
            padding: theme.spacing(1),
            textAlign: 'right',
            color: theme.palette.text.primary,
        },
        label: {
            padding: theme.spacing(1),
            textAlign: 'left',
            color: theme.palette.text.secondary,
        },
        button: {
            padding: theme.spacing(2),
        },
    }),
)
export interface ConfirmDialogProps {
    poolSettings?: PoolSettings
    onConnectWallet: () => void
    onDone: () => void
    onBack: () => void
}

export function ConfirmDialog(props: ConfirmDialogProps) {
    const { poolSettings, onDone, onBack } = props
    const classes = useStyles()
    const { t } = useI18N()

    return (
        <Card>
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Typography variant="h3" className={classes.title} component="h3">
                        {poolSettings?.title}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.label}>{t('plugin_ito_sell_token')}</Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.data}>{poolSettings?.token?.symbol}</Paper>
                </Grid>

                <Grid item xs={6}>
                    <Paper className={classes.label}>{t('plugin_ito_sell_total_amount')}</Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.data}>{poolSettings?.total}</Paper>
                </Grid>

                {poolSettings?.exchangeTokens
                    .filter((item, index) => item)
                    .map((item, index) => {
                        return (
                            <>
                                <Grid item xs={6}>
                                    <Paper className={classes.label}>
                                        {item?.symbol}/{poolSettings?.token?.symbol}
                                    </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper className={classes.data}>{poolSettings?.exchangeAmounts[index]}</Paper>
                                </Grid>
                            </>
                        )
                    })}

                <Grid item xs={6}>
                    <Paper className={classes.label}>{t('plugin_ito_allocation_per_wallet')}</Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.data}>{poolSettings?.limit}</Paper>
                </Grid>

                <Grid item xs={6}>
                    <Paper className={classes.label}>{t('plugin_ito_begin_times')}</Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.data}>
                        {poolSettings?.startTime.toLocaleString().replace(/:00$/g, '')}
                    </Paper>
                </Grid>

                <Grid item xs={6}>
                    <Paper className={classes.label}>{t('plugin_ito_end_times')}</Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.data}>
                        {poolSettings?.endTime.toLocaleString().replace(/:00$/g, '')}
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" className={classes.title} component="p">
                        You can select Existing in ITO to view the selection after successful sending
                    </Typography>
                </Grid>
                <Grid item xs={6} className={classes.button}>
                    <ActionButton fullWidth variant="contained" onClick={onBack}>
                        {t('plugin_ito_back')}
                    </ActionButton>
                </Grid>
                <Grid item xs={6} className={classes.button}>
                    <ActionButton fullWidth variant="contained" onClick={onDone}>
                        {` Send ${poolSettings?.total} ${poolSettings?.token?.symbol} `}
                    </ActionButton>
                </Grid>
            </Grid>
        </Card>
    )
}
