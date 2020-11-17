import React from 'react'
import {
    makeStyles,
    createStyles,
    TableContainer,
    Paper,
    Table,
    TableRow,
    TableCell,
    TableHead,
    TableBody,
    Typography,
    Link,
} from '@material-ui/core'
import type { Market } from '../../types'
import { formatCurrency } from '../../../Wallet/formatter'

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            padding: theme.spacing(2),
        },
        container: {
            padding: theme.spacing(4, 1),
            '&::-webkit-scrollbar': {
                display: 'none',
            },
        },
        table: {},
        head: {
            padding: 0,
            border: 'none',
        },
        cell: {
            whiteSpace: 'nowrap',
            border: 'none',
        },
        links: {
            display: 'flex',
        },
        link: {
            paddingRight: theme.spacing(2),
            '&:last-child': {
                paddingRight: 0,
            },
        },
    }),
)

export interface CoinMarketPanelProps {
    market: Market
}

export function CoinMarketPanel(props: CoinMarketPanelProps) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <TableContainer className={classes.container} component={Paper} elevation={0}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.head} align="center">
                                <Typography color="textSecondary" variant="body2">
                                    Market Cap
                                </Typography>
                            </TableCell>
                            <TableCell className={classes.head} align="center">
                                <Typography color="textSecondary" variant="body2">
                                    Volumn (24h)
                                </Typography>
                            </TableCell>
                            <TableCell className={classes.head} align="center">
                                <Typography color="textSecondary" variant="body2">
                                    Circulating Supply
                                </Typography>
                            </TableCell>
                            <TableCell className={classes.head} align="center">
                                <Typography color="textSecondary" variant="body2">
                                    Total Supply
                                </Typography>
                            </TableCell>
                            <TableCell className={classes.head} align="center">
                                <Typography color="textSecondary" variant="body2">
                                    Max Supply
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell className={classes.cell} align="center">
                                {formatCurrency(309982847214, '$')} USD
                            </TableCell>
                            <TableCell className={classes.cell} align="center">
                                {formatCurrency(309982847214, '$')} USD
                            </TableCell>
                            <TableCell className={classes.cell} align="center">
                                {formatCurrency(309982847214, '$')} USD
                            </TableCell>
                            <TableCell className={classes.cell} align="center">
                                {formatCurrency(309982847214, '$')} USD
                            </TableCell>
                            <TableCell className={classes.cell} align="center">
                                {formatCurrency(309982847214, '$')} USD
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <div className={classes.links}>
                <Link className={classes.link} href="https://google.com" target="_blank" rel="noopener noreferrer">
                    <Typography variant="body2">Market Cap</Typography>
                </Link>
                <Link className={classes.link} href="https://google.com" target="_blank" rel="noopener noreferrer">
                    <Typography variant="body2">Website</Typography>
                </Link>
                <Link className={classes.link} href="https://google.com" target="_blank" rel="noopener noreferrer">
                    <Typography variant="body2">Explorers</Typography>
                </Link>
                <Link className={classes.link} href="https://google.com" target="_blank" rel="noopener noreferrer">
                    <Typography variant="body2">Contract</Typography>
                </Link>
                <Link className={classes.link} href="https://google.com" target="_blank" rel="noopener noreferrer">
                    <Typography variant="body2">Community</Typography>
                </Link>
            </div>
        </div>
    )
}
