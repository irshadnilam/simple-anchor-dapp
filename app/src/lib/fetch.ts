import * as anchor from '@project-serum/anchor'
import { AnchorWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import { getProgram } from './connection/program'
import { getProvider } from './connection/provider'
import { getStatsPDA, getUserPDA } from './utils'

const utf8 = anchor.utils.bytes.utf8

export interface User {
    bump: number
    hasAlreadyBeenInitialized: boolean
    authority: PublicKey
    stats: PublicKey
}

export const fetchUser = async (
    wallet: AnchorWallet,
    of: PublicKey
): Promise<User> => {
    const program = getProgram(wallet)

    const [user] = await PublicKey.findProgramAddress(
        [utf8.encode('user'), of.toBuffer()],
        program.programId
    )

    const { bump, hasAlreadyBeenInitialized, authority, stats } =
        await program.account.user.fetch(user)

    return {
        bump,
        hasAlreadyBeenInitialized,
        authority,
        stats,
    }
}

export interface Stats {
    bump: number
    hasAlreadyBeenInitialized: boolean
    user: PublicKey
    authority: PublicKey

    totalTransfersSent: anchor.BN
    totalTransfersReceived: anchor.BN
    totalSolSent: anchor.BN
    totalSolReceived: anchor.BN
}

export const fetchStats = async (wallet: AnchorWallet): Promise<Stats> => {
    const program = getProgram(wallet)

    const user = await getUserPDA(wallet.publicKey)
    const stats = await getStatsPDA(wallet.publicKey)

    const {
        bump,
        hasAlreadyBeenInitialized,
        authority,
        totalTransfersSent,
        totalTransfersReceived,
        totalSolSent,
        totalSolReceived,
    } = await program.account.stats.fetch(stats)

    return {
        bump,
        hasAlreadyBeenInitialized,
        authority,
        user,
        totalTransfersSent,
        totalTransfersReceived,
        totalSolSent,
        totalSolReceived,
    }
}

export const fetchSolBalance = async (
    wallet: AnchorWallet
): Promise<number> => {
    const provider = getProvider(wallet)
    return (
        (await provider.connection.getBalance(wallet.publicKey)) /
        LAMPORTS_PER_SOL
    )
}
