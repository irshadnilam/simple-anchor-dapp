import { PROGRAM_ID } from '../../constants'
import { Program } from '@project-serum/anchor'
import { AnchorWallet } from '@solana/wallet-adapter-react'
import { SimpleAnchorDapp } from '../../types/simple_anchor_dapp'
import { idl } from '../../types/idl'
import { getProvider } from './provider'

export const getProgram = (wallet: AnchorWallet) => {
    return new Program<SimpleAnchorDapp>(
        idl as SimpleAnchorDapp,
        PROGRAM_ID,
        getProvider(wallet)
    )
}
