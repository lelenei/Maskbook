import { Currency, DataProvider, SwapProvider, SwapSource } from './types'
import { unreachable } from '../../utils/utils'

export function resolveCurrencyName(currency: Currency) {
    return [
        currency.name,
        currency.symbol ? `"${currency.symbol}"` : '',
        currency.description ? `(${currency.description})` : '',
    ].join(' ')
}

export function resolveDataProviderName(dataProvider: DataProvider) {
    switch (dataProvider) {
        case DataProvider.COIN_GECKO:
            return 'Coin Gecko'
        case DataProvider.COIN_MARKET_CAP:
            return 'Coin Market Cap'
        default:
            unreachable(dataProvider)
    }
}

export function resolveDataProviderLink(dataProvider: DataProvider) {
    switch (dataProvider) {
        case DataProvider.COIN_GECKO:
            return 'https://www.coingecko.com/'
        case DataProvider.COIN_MARKET_CAP:
            return 'https://coinmarketcap.com/'
        default:
            unreachable(dataProvider)
    }
}

export function resolveSwapProviderName(swapProvider: SwapProvider) {
    switch (swapProvider) {
        case SwapProvider.UNISWAP:
            return 'Uniswap'
        case SwapProvider.ZRX:
            return '0x'
        default:
            unreachable(swapProvider)
    }
}

export function resolveSwapProviderLink(swapProvider: SwapProvider) {
    switch (swapProvider) {
        case SwapProvider.UNISWAP:
            return 'https://uniswap.org/'
        case SwapProvider.ZRX:
            return 'https://0x.org/'
        default:
            unreachable(swapProvider)
    }
}

export function resolveDaysName(days: number) {
    if (days === 0) return 'MAX'
    if (days >= 365) return `${Math.floor(days / 365)}y`
    if (days >= 30) return `${Math.floor(days / 30)}m`
    if (days >= 7) return `${Math.floor(days / 7)}w`
    return `${days}d`
}

export function resolveSwapSourceName(swapSource: SwapSource) {
    const SWAP_SOURCE_NAME_MAP: EnumRecord<SwapSource, string> = {
        [SwapSource.ZRX]: 'ZRX',
        [SwapSource.Uniswap]: 'Uniswap',
        [SwapSource.UniswapV2]: 'Uniswap_V2',
        [SwapSource.Eth2Dai]: 'Eth2Dai',
        [SwapSource.Kyber]: 'Kyber',
        [SwapSource.Curve]: 'Curve',
        [SwapSource.LiquidityProvider]: 'LiquidityProvider',
        [SwapSource.MultiBridge]: 'MultiBridge',
        [SwapSource.Balancer]: 'Balancer',
        [SwapSource.Cream]: 'CREAM',
        [SwapSource.Bancor]: 'Bancor',
        [SwapSource.MStable]: 'mStable',
        [SwapSource.Mooniswap]: 'Mooniswap',
        [SwapSource.MultiHop]: 'MultiHop',
        [SwapSource.Shell]: 'Shell',
        [SwapSource.Swerve]: 'Swerve',
        [SwapSource.SnowSwap]: 'SnowSwap',
        [SwapSource.SushiSwap]: 'SushiSwap',
        [SwapSource.Dodo]: 'DODO',
    }
    return SWAP_SOURCE_NAME_MAP[swapSource]
}
