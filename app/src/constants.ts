import * as anchor from '@project-serum/anchor'

const { PublicKey, clusterApiUrl } = anchor.web3

export const PROGRAM_ID = new PublicKey(
    '66aoA3njN9pM3WyaaVr3PcLViq6aZycPR3Pf4bz3qtCU'
)

export const MINT_DECIMALS = 6

export const ENDPOINT = clusterApiUrl('devnet')

// export const ENDPOINT = 'http://127.0.0.1:8899'
export const PREFLIGHT_COMMITMENT = 'processed'
