import React from 'react'
import { useCopyToClipboard } from 'react-use'
import {
    makeStyles,
    createStyles,
    TableContainer,
    Paper,
    Table,
    TableRow,
    TableCell,
    TableBody,
    Typography,
    IconButton,
} from '@material-ui/core'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import type { DataProvider, Trending } from '../../types'
import { useChainId } from '../../../../web3/hooks/useChainState'
import { useSnackbarCallback } from '../../../../extension/options-page/DashboardDialogs/Base'
import { Linking } from './Linking'
import { formatEthereumAddress } from '../../../Wallet/formatter'

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            padding: theme.spacing(2),
        },
        container: {
            overflow: 'visible',
            boxSizing: 'border-box',
            '&::-webkit-scrollbar': {
                display: 'none',
            },
        },
        table: {},
        cell: {
            whiteSpace: 'nowrap',
            border: 'none',
        },
        label: {
            whiteSpace: 'nowrap',
        },
        link: {
            whiteSpace: 'nowrap',
            paddingRight: theme.spacing(1),
            '&:last-child': {
                paddingRight: 0,
            },
        },
        tag: {
            paddingRight: theme.spacing(2),
            '&:last-child': {
                paddingRight: 0,
            },
        },
    }),
)

export interface CoinMetadataTableProps {
    trending: Trending
    dataProvider: DataProvider
}

export function CoinMetadataTable(props: CoinMetadataTableProps) {
    const { dataProvider, trending } = props
    const classes = useStyles()
    const chainId = useChainId()

    const [, copyToClipboard] = useCopyToClipboard()
    const onCopyAddress = useSnackbarCallback(async () => {
        if (!trending.coin.eth_address) return
        copyToClipboard(trending.coin.eth_address)
    }, [trending.coin.eth_address])

    return (
        <TableContainer className={classes.container} component={Paper} elevation={0}>
            <Table className={classes.table} size="small">
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <Typography className={classes.label} variant="body2">
                                Market Cap
                            </Typography>
                        </TableCell>
                        <TableCell>{`Rank #${trending.coin.market_cap_rank}`}</TableCell>
                    </TableRow>
                    {trending.coin.home_urls?.length ? (
                        <TableRow>
                            <TableCell>
                                <Typography className={classes.label} variant="body2">
                                    Website
                                </Typography>
                            </TableCell>
                            <TableCell>
                                {trending.coin.home_urls.map((x) => (
                                    <Linking href={x} LinkProps={{ className: classes.link }} />
                                ))}
                            </TableCell>
                        </TableRow>
                    ) : null}
                    {trending.coin.blockchain_urls?.length ? (
                        <TableRow>
                            <TableCell>
                                <Typography className={classes.label} variant="body2">
                                    Explorer
                                </Typography>
                            </TableCell>
                            <TableCell>
                                {trending.coin.blockchain_urls.map((x) => (
                                    <Linking href={x} LinkProps={{ className: classes.link }} />
                                ))}
                            </TableCell>
                        </TableRow>
                    ) : null}
                    {trending.coin.eth_address ? (
                        <TableRow>
                            <TableCell>
                                <Typography className={classes.label} variant="body2">
                                    Contract
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2" component="span">
                                    {formatEthereumAddress(trending.coin.eth_address, 4)}
                                </Typography>
                                <IconButton color="primary" size="small" onClick={onCopyAddress}>
                                    <FileCopyIcon fontSize="small" />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ) : null}
                    {trending.coin.community_urls?.length ? (
                        <TableRow>
                            <TableCell>
                                <Typography className={classes.label} variant="body2">
                                    Commnuity
                                </Typography>
                            </TableCell>
                            <TableCell>
                                {trending.coin.community_urls.map((x) => (
                                    <Linking href={x} LinkProps={{ className: classes.link }} />
                                ))}
                            </TableCell>
                        </TableRow>
                    ) : null}
                    {trending.coin.tags?.length ? (
                        <TableRow>
                            <TableCell>
                                <Typography className={classes.label} variant="body2">
                                    Tags
                                </Typography>
                            </TableCell>
                            <TableCell>
                                {trending.coin.tags.map((x) => (
                                    <Linking href={x} TypographyProps={{ className: classes.tag }} />
                                ))}
                            </TableCell>
                        </TableRow>
                    ) : null}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
