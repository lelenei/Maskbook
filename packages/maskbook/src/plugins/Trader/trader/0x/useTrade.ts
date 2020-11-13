import type { Token } from '../../../../web3/types'
import { TradeStrategy } from '../../types'

export function useTrade(
    strategy: TradeStrategy = TradeStrategy.ExactIn,
    inputAmount: string,
    outputAmount: string,
    inputToken?: Token,
    outputToken?: Token,
) {
    // TODO:
    // maybe we should support v1Trade in the future
    return {
        zrxTrade: null,
    }
}
