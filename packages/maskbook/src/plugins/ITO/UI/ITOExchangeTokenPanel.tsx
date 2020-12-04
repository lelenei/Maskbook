import { makeStyles, createStyles, Paper, IconButton, Box } from '@material-ui/core'
import { useCallback, useEffect, useReducer, useState } from 'react'
import { useTokenBalance } from '../../../web3/hooks/useTokenBalance'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'

import { ERC20TokenDetailed, EthereumTokenType, EtherTokenDetailed } from '../../../web3/types'
import { TokenAmountPanel } from '../../../web3/UI/TokenAmountPanel'
import { SelectERC20TokenDialog } from '../../../web3/UI/SelectERC20TokenDialog'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import type { TokenAmountPanelProps } from '../../../web3/UI/TokenAmountPanel'
import { useEtherTokenDetailed } from '../../../web3/hooks/useEtherTokenDetailed'
import { v4 as uuid } from 'uuid'
import { ITO_EXCHANGE_RATION_MAX } from '../constants'

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        line: {
            margin: theme.spacing(1),
            display: 'flex',
        },
        input: {
            flex: 1,
        },
        flow: {
            margin: theme.spacing(1),
            textAlign: 'center',
        },
        button: {
            borderRadius: 10,
        },
    }),
)

export interface ExchangetokenPanelProps {
    onAmountChange: (amount: string, key: string) => void
    inputAmount: string

    exchangeToken: EtherTokenDetailed | ERC20TokenDetailed | undefined
    onExchangeTokenChange: (token: EtherTokenDetailed | ERC20TokenDetailed, key: string) => void

    onAdd: () => void
    onRemove: () => void

    dataIndex: string

    showRemove: boolean
    showAdd: boolean

    label?: string
    excludeTokensAddress?: string[]

    tokenAmountPanelProps: Partial<TokenAmountPanelProps>
}

export function ExchangeTokenPanel(props: ExchangetokenPanelProps) {
    const {
        onAmountChange,
        dataIndex,
        inputAmount,

        exchangeToken,
        onExchangeTokenChange,

        showAdd = true,
        showRemove = false,
        label,

        excludeTokensAddress = [],
        onRemove,
        onAdd,
    } = props

    const classes = useStyles()
    //#region select token

    const [openSelectERC20TokenDialog, setOpenSelectERC20TokenDialog] = useState(false)
    const onTokenChipClick = useCallback(() => {
        setOpenSelectERC20TokenDialog(true)
    }, [])
    const onSelectERC20TokenDialogClose = useCallback(() => {
        setOpenSelectERC20TokenDialog(false)
    }, [])
    const onSelectERC20TokenDialogSubmit = useCallback(
        (token: EtherTokenDetailed | ERC20TokenDetailed) => {
            onExchangeTokenChange(token, dataIndex)
            onSelectERC20TokenDialogClose()
        },
        [dataIndex, onExchangeTokenChange, onSelectERC20TokenDialogClose],
    )

    //#endregion
    // balance
    const { value: tokenBalance = '0', loading: loadingTokenBalance } = useTokenBalance(
        exchangeToken?.type ?? EthereumTokenType.Ether,
        exchangeToken?.address ?? '',
    )
    //#endregion

    const [inputAmountForUI, setInputAmountForUI] = useState('')
    useEffect(() => {
        setInputAmountForUI(inputAmount)
    }, [inputAmount])

    const onAmountChangeForUI = useCallback(
        (amount: string) => {
            onAmountChange(amount, dataIndex)
        },
        [dataIndex, onAmountChange],
    )

    return (
        <>
            <Paper className={classes.line}>
                <TokenAmountPanel
                    classes={{ root: classes.input }}
                    label={label}
                    amount={inputAmountForUI}
                    balance={tokenBalance}
                    token={exchangeToken}
                    onAmountChange={onAmountChangeForUI}
                    SelectTokenChip={{
                        loading: loadingTokenBalance,
                        ChipProps: {
                            onClick: onTokenChipClick,
                        },
                    }}
                    {...props.tokenAmountPanelProps}
                />
                {showAdd ? (
                    <IconButton onClick={onAdd} className={classes.button}>
                        <AddIcon />
                    </IconButton>
                ) : (
                    ''
                )}
                {showRemove ? (
                    <IconButton onClick={onRemove} className={classes.button}>
                        <RemoveIcon />
                    </IconButton>
                ) : (
                    ''
                )}
            </Paper>
            <SelectERC20TokenDialog
                open={openSelectERC20TokenDialog}
                excludeTokens={[exchangeToken?.address, ...excludeTokensAddress]}
                onSubmit={onSelectERC20TokenDialogSubmit}
                onClose={onSelectERC20TokenDialogClose}
            />
        </>
    )
}

export interface ITOExchangeTokenPanelProps {
    originToken: EtherTokenDetailed | ERC20TokenDetailed | undefined
    onTokenAmountChange?: (data: any) => void
    exchangetokenPanelProps: Partial<ExchangetokenPanelProps>
}

export function ITOExchangeTokenPanel(props: ITOExchangeTokenPanelProps) {
    const classes = useStyles()
    const { onTokenAmountChange } = props
    const { value: etherTokenDetailed } = useEtherTokenDetailed()
    const [token = etherTokenDetailed, setToken] = useState<EtherTokenDetailed | ERC20TokenDetailed | undefined>()

    const [excludeTokensAddress, setexcludeTokensAddress] = useState([])
    const [exchangeTokenArray, dispatchExchangeTokenArray] = useReducer((state, action) => {
        switch (action.type) {
            case 'add':
                return [
                    ...state,
                    {
                        id: action.key,
                        token: action.token,
                        amount: action.amount,
                    },
                ]
            case 'remove':
                return state.filter((item) => item.id !== action.key)

            case 'update_amount': {
                console.log(action)

                state = state.map((item) => (item.id === action.key ? { ...item, amount: action.amount } : item))
                return state
            }

            case 'update_token': {
                return state.map((item) => (item.id === action.key ? { ...item, token: action.token } : item))
            }
            default:
                return state
        }
    }, [])

    const onAdd = useCallback(() => {
        if (exchangeTokenArray.length > ITO_EXCHANGE_RATION_MAX) {
            return
        }
        dispatchExchangeTokenArray({
            type: 'add',
            key: uuid(),
            token: undefined,
            amount: '0',
        })
    }, [exchangeTokenArray])

    if (exchangeTokenArray && exchangeTokenArray.length === 0) {
        // origin token
        onAdd()
        // first exchange token
        onAdd()
    }

    const onAmountChange = useCallback((amount: string, key: string) => {
        dispatchExchangeTokenArray({
            type: 'update_amount',
            amount,
            key,
        })
    }, [])

    const onTokenChange = useCallback((token: EtherTokenDetailed | ERC20TokenDetailed, key: string) => {
        dispatchExchangeTokenArray({
            type: 'update_token',
            token,
            key,
        })
    }, [])

    useEffect(() => {
        if (exchangeTokenArray?.length > 0) {
            const arr = exchangeTokenArray.map((item) => [item.amount, item.token])
            onTokenAmountChange?.(arr)

            const addresses = exchangeTokenArray.filter((item) => item && item.token).map((item) => item.token.address)
            setexcludeTokensAddress(addresses)
        }
    }, [exchangeTokenArray, onTokenAmountChange, setexcludeTokensAddress])

    return exchangeTokenArray.map((item, idx) => {
        return (
            <>
                <ExchangeTokenPanel
                    classes={classes.input}
                    dataIndex={item.id}
                    inputAmount={item.amount}
                    excludeTokensAddress={excludeTokensAddress}
                    onAmountChange={onAmountChange}
                    exchangeToken={item.token}
                    onExchangeTokenChange={onTokenChange}
                    showRemove={idx > 0 && idx < exchangeTokenArray.length && exchangeTokenArray.length !== 2}
                    showAdd={idx === exchangeTokenArray.length - 1 && idx < ITO_EXCHANGE_RATION_MAX}
                    {...props.exchangetokenPanelProps}
                    onRemove={() => dispatchExchangeTokenArray({ type: 'remove', key: item.id })}
                    onAdd={onAdd}
                    tokenAmountPanelProps={{
                        InputProps: idx
                            ? {
                                  startAdornment: props.originToken ? `1${props.originToken?.symbol}=` : '',
                                  shrink: true,
                              }
                            : {},
                    }}
                />
                {idx ? (
                    ''
                ) : (
                    <Box className={classes.flow}>
                        <ArrowDownwardIcon size="large" />
                    </Box>
                )}
            </>
        )
    })
}
