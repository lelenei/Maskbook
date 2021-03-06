/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import BN from 'bn.js'
import { Contract, ContractOptions } from 'web3-eth-contract'
import { EventLog } from 'web3-core'
import { EventEmitter } from 'events'
import { ContractEvent, Callback, TransactionObject, BlockType } from '../types'

interface EventOptions {
    filter?: object
    fromBlock?: BlockType
    topics?: string[]
}

export class Pair extends Contract {
    constructor(jsonInterface: any[], address?: string, options?: ContractOptions)
    clone(): Pair
    methods: {
        DOMAIN_SEPARATOR(): TransactionObject<string>

        MINIMUM_LIQUIDITY(): TransactionObject<string>

        PERMIT_TYPEHASH(): TransactionObject<string>

        allowance(arg0: string, arg1: string): TransactionObject<string>

        approve(spender: string, value: number | string): TransactionObject<boolean>

        balanceOf(arg0: string): TransactionObject<string>

        burn(
            to: string,
        ): TransactionObject<{
            amount0: string
            amount1: string
            0: string
            1: string
        }>

        decimals(): TransactionObject<string>

        factory(): TransactionObject<string>

        getReserves(): TransactionObject<{
            _reserve0: string
            _reserve1: string
            _blockTimestampLast: string
            0: string
            1: string
            2: string
        }>

        initialize(_token0: string, _token1: string): TransactionObject<void>

        kLast(): TransactionObject<string>

        mint(to: string): TransactionObject<string>

        name(): TransactionObject<string>

        nonces(arg0: string): TransactionObject<string>

        permit(
            owner: string,
            spender: string,
            value: number | string,
            deadline: number | string,
            v: number | string,
            r: string | number[],
            s: string | number[],
        ): TransactionObject<void>

        price0CumulativeLast(): TransactionObject<string>

        price1CumulativeLast(): TransactionObject<string>

        skim(to: string): TransactionObject<void>

        swap(
            amount0Out: number | string,
            amount1Out: number | string,
            to: string,
            data: string | number[],
        ): TransactionObject<void>

        symbol(): TransactionObject<string>

        sync(): TransactionObject<void>

        token0(): TransactionObject<string>

        token1(): TransactionObject<string>

        totalSupply(): TransactionObject<string>

        transfer(to: string, value: number | string): TransactionObject<boolean>

        transferFrom(from: string, to: string, value: number | string): TransactionObject<boolean>
    }
    events: {
        Approval: ContractEvent<{
            owner: string
            spender: string
            value: string
            0: string
            1: string
            2: string
        }>
        Burn: ContractEvent<{
            sender: string
            amount0: string
            amount1: string
            to: string
            0: string
            1: string
            2: string
            3: string
        }>
        Mint: ContractEvent<{
            sender: string
            amount0: string
            amount1: string
            0: string
            1: string
            2: string
        }>
        Swap: ContractEvent<{
            sender: string
            amount0In: string
            amount1In: string
            amount0Out: string
            amount1Out: string
            to: string
            0: string
            1: string
            2: string
            3: string
            4: string
            5: string
        }>
        Sync: ContractEvent<{
            reserve0: string
            reserve1: string
            0: string
            1: string
        }>
        Transfer: ContractEvent<{
            from: string
            to: string
            value: string
            0: string
            1: string
            2: string
        }>
        allEvents: (options?: EventOptions, cb?: Callback<EventLog>) => EventEmitter
    }
}
