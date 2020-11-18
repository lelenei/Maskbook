import React from 'react'
import { makeStyles } from '@material-ui/core'
import { useStylesExtends } from '../custom-ui-helper'
import { useI18N } from '../../utils/i18n-next-ui'
import { DataProvider, TradeProvider } from '../../plugins/Trader/types'
import { SearchResultView } from '../../plugins/Trader/UI/trending/SearchResultView'
import { useSearchedKeyword } from '../../plugins/Trader/trending/useSearchedKeyword'

const useStyles = makeStyles({
    root: {},
})

export interface SearchResultBoxProps extends withClasses<never> {}

export function SearchResultBox(props: SearchResultBoxProps) {
    const { t } = useI18N()
    const classes = useStylesExtends(useStyles(), props)

    const keyword = useSearchedKeyword()
    const [_, name] = keyword.match(/\$([\w\d]+)/) ?? []

    console.log({
        keyword,
        name,
    })

    if (!name) return null
    return (
        <div className={classes.root}>
            <SearchResultView
                name={name}
                dataProviders={[DataProvider.COIN_GECKO]}
                tradeProviders={[TradeProvider.UNISWAP]}
            />
        </div>
    )
}
