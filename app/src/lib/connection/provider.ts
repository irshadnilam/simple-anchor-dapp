import * as anchor from '@project-serum/anchor'
import { Provider } from '@project-serum/anchor'
import { ENDPOINT, PREFLIGHT_COMMITMENT } from '../../constants'
import { AnchorWallet } from '@solana/wallet-adapter-react'

const { Connection } = anchor.web3
export const getProvider = (wallet: AnchorWallet) => {
    const connection = new Connection(ENDPOINT, PREFLIGHT_COMMITMENT)
    return new Provider(connection, wallet, {
        preflightCommitment: PREFLIGHT_COMMITMENT,
    })
}
