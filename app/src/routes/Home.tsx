import Button from '@mui/material/Button'
import { useAnchorWallet } from '@solana/wallet-adapter-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Stats from '../components/Stats'
import { createAccount } from '../lib/createAccount'
import { fetchUser, User } from '../lib/fetch'

const Home = () => {
    const wallet = useAnchorWallet()
    const [loading, setLoading] = useState(true)
    const [progress, setProgress] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const [hasAccount, setHasAccount] = useState<boolean | null>(null)

    useEffect(() => {
        if (!wallet) return
        fetchUser(wallet, wallet.publicKey)
            .then((user) => {
                setUser(user)
                setHasAccount(true)
            })
            .catch((e) => {
                if (e.message.toString().startsWith('Account does not exist')) {
                    setHasAccount(false)
                } else {
                    console.error(e)
                    toast('An error occurred.', {
                        type: 'error',
                    })
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }, [wallet, hasAccount])

    const handleCreate = () => {
        if (!wallet) return

        setProgress(true)

        createAccount(wallet)
            .then(() => {
                setHasAccount(true)
            })
            .catch((e) => {
                console.error(e)
                toast('An error occurred.', {
                    type: 'error',
                })
            })
            .finally(() => {
                setProgress(false)
            })
    }

    if ((user && !user.hasAlreadyBeenInitialized) || hasAccount === false) {
        return (
            <div>
                <div>You don't have an account. </div>
                <Button onClick={handleCreate} disabled={progress}>
                    {progress ? 'Creating...' : 'Create Account'}
                </Button>
            </div>
        )
    }

    if (loading || !user) {
        return <div>Loading...</div>
    }

    return <Stats user={user} />
}

export default Home
