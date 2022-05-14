import { AnchorWallet } from '@solana/wallet-adapter-react'
import { getProgram } from './connection/program'

import * as anchor from '@project-serum/anchor'
import { getStatsPDA, getUserPDA } from './utils'
const { PublicKey, SystemProgram, Transaction } = anchor.web3

export const createAccount = async (wallet: AnchorWallet) => {
    const program = getProgram(wallet)

    const user = await getUserPDA(wallet.publicKey)
    const stats = await getStatsPDA(wallet.publicKey)

    const ix = program.instruction.createAccount({
        accounts: {
            authority: wallet.publicKey,
            user,
            systemProgram: SystemProgram.programId,
            stats,
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
