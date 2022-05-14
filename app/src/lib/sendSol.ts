import { AnchorWallet } from '@solana/wallet-adapter-react'
import { getProgram } from './connection/program'

import * as anchor from '@project-serum/anchor'
import { getStatsPDA, getUserPDA } from './utils'
import { PublicKey } from '@solana/web3.js'
import { BN } from 'bn.js'
import { fetchUser } from './fetch'
const { SystemProgram, Transaction } = anchor.web3

export const sendSol = async (
    wallet: AnchorWallet,
    amount: number,
    receiver: PublicKey
) => {
    const program = getProgram(wallet)

    const from = await getUserPDA(wallet.publicKey)
    const fromStats = await getStatsPDA(wallet.publicKey)

    const to = await getUserPDA(receiver)
    const toStats = await getStatsPDA(receiver)

    const ix = program.instruction.sendSol(new BN(amount), {
        accounts: {
            authority: wallet.publicKey,
            from,
            fromStats,
            to,
            toStats,
            systemProgram: SystemProgram.programId,
            receiver,
        },
    })

    const tx = new Transaction({
        feePayer: program.provider.wallet.publicKey,
        recentBlockhash: (
            await program.provider.connection.getLatestBlockhash()
        ).blockhash,
    }).add(ix)

    await program.provider.wallet.signTransaction(tx)
    await program.provider.send(tx)
}
