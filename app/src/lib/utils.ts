import { PublicKey } from '@solana/web3.js'
import * as anchor from '@project-serum/anchor'
import { PROGRAM_ID } from '../constants'

const utf8 = anchor.utils.bytes.utf8

export const getUserPDA = async (authroty: PublicKey): Promise<PublicKey> => {
    const [user] = await PublicKey.findProgramAddress(
        [utf8.encode('user'), authroty.toBuffer()],
        PROGRAM_ID
    )
    return user
}

export const getStatsPDA = async (authroty: PublicKey) => {
    const user = await getUserPDA(authroty)
    const [stats] = await PublicKey.findProgramAddress(
        [utf8.encode('stats'), user.toBuffer()],
        PROGRAM_ID
    )

    return stats
}
