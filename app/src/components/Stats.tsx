import { Typography } from '@mui/material'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import { useAnchorWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import { BN } from 'bn.js'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {
    fetchSolBalance,
    fetchStats,
    fetchUser,
    Stats as Data,
    User,
} from '../lib/fetch'
import { sendSol } from '../lib/sendSol'

const Stats = ({ user }: { user: User }) => {
    const wallet = useAnchorWallet()
    const [loading, setLoading] = useState(true)
    const [stats, setStats] = useState<Data | null>(null)
    const [balance, setBalance] = useState<number | null>(null)

    const [progress, setProgress] = useState(false)
    const [amount, setAmount] = useState<number | string>('')
    const [destination, setDestination] = useState<string>('')

    useEffect(() => {
        if (!wallet) return
        fetchStats(wallet)
            .then((data) => setStats(data))
            .catch((e) => {
                toast('An error occurred.', {
                    type: 'error',
                })
                console.error(e)
            })

        fetchSolBalance(wallet)
            .then((balance) => {
                setBalance(balance)
            })
            .catch((e) => {
                toast('An error occurred.', {
                    type: 'error',
                })
                console.error(e)
            })
            .finally(() => setLoading(false))
    }, [wallet, progress])

    const handleSend = () => {
        if (!wallet) return

        if (amount === '' || destination === '') {
            toast('Please fill out all fields correctly.', {
                type: 'error',
            })
            return
        }

        setProgress(true)

        const reciever = new PublicKey(destination)
        fetchUser(wallet, reciever)
            .then((user) => {
                return sendSol(
                    wallet,
                    Number(amount) * LAMPORTS_PER_SOL,
                    reciever
                )
            })
            .then(() => {
                toast('Sent successfully.', {
                    type: 'success',
                })
                setAmount('')
                setDestination('')
            })
            .catch((e: { message: { toString: () => string } }) => {
                if (e.message.toString().startsWith('Account does not exist')) {
                    toast('Reciever does not have an account with us.', {
                        type: 'default',
                    })
                } else {
                    console.error(e)
                    toast('An error occurred.', {
                        type: 'error',
                    })
                }
            })
            .finally(() => {
                setProgress(false)
            })
    }

    if (loading || stats == null) {
        return <div>Loading...</div>
    }
    console.log(JSON.stringify(stats))
    return (
        <div>
            <Paper
                elevation={1}
                sx={{
                    px: {
                        xs: 2,
                        sm: 4,
                    },

                    py: {
                        xs: 2,
                        sm: 4,
                    },

                    mb: {
                        xs: 2,
                        sm: 4,
                    },

                    mt: {
                        xs: 2,
                        sm: 4,
                    },
                }}
            >
                <Paper
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        px: 2,
                        py: 1,
                        my: 2,
                    }}
                    elevation={2}
                >
                    Total transfers sent{' '}
                    <Paper sx={{ px: 2, mx: 2 }}>
                        {stats.totalTransfersSent.toNumber()}
                    </Paper>
                </Paper>
                <Paper
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        px: 2,
                        py: 1,
                        my: 2,
                    }}
                    elevation={2}
                >
                    Total SOL sent{' '}
                    <Paper sx={{ px: 2, mx: 2 }}>
                        {(
                            stats.totalSolSent.toNumber() / LAMPORTS_PER_SOL
                        ).toFixed(4)}
                    </Paper>
                </Paper>
                <Paper
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        px: 2,
                        py: 1,
                        my: 2,
                    }}
                    elevation={2}
                >
                    Total transfers received{' '}
                    <Paper sx={{ px: 2, mx: 2 }}>
                        {stats.totalTransfersReceived.toNumber()}
                    </Paper>
                </Paper>

                <Paper
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        px: 2,
                        py: 1,
                        my: 2,
                    }}
                    elevation={2}
                >
                    Total SOL received:{' '}
                    <Paper sx={{ px: 2, mx: 2 }}>
                        {(
                            stats.totalSolReceived.toNumber() / LAMPORTS_PER_SOL
                        ).toFixed(4)}
                    </Paper>
                </Paper>

                <Paper
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        px: 2,
                        py: 1,
                        my: 2,
                    }}
                    elevation={2}
                >
                    Your SOL balance:{' '}
                    <Paper sx={{ px: 2, mx: 2 }}>{balance?.toFixed(4)}</Paper>
                </Paper>
            </Paper>
            <div>
                <Paper
                    sx={{
                        px: {
                            xs: 2,
                            sm: 4,
                        },

                        py: {
                            xs: 2,
                            sm: 4,
                        },

                        mb: {
                            xs: 2,
                            sm: 4,
                        },

                        mt: {
                            xs: 2,
                            sm: 4,
                        },
                    }}
                >
                    <TextField
                        sx={{
                            px: 1,
                        }}
                        required
                        id="outlined-number"
                        label="How many SOL do you want to send?"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(e) => {
                            // check is positive decimal
                            if (e.target.value.match(/^\d*\.?\d*$/)) {
                                setAmount(e.target.value)
                            } else {
                                setAmount('')
                            }
                        }}
                        value={amount}
                    />
                    <TextField
                        sx={{
                            px: 1,
                        }}
                        required
                        label="Who do you want to send it to?"
                        type="text"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        sx={{
                            px: 1,
                            mx: 1,
                        }}
                        onClick={handleSend}
                    >
                        Send SOL
                    </Button>
                </Paper>
            </div>
        </div>
    )
}

export default Stats
