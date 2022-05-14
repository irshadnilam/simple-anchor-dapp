import Navbar from '../components/Navbar'
import Box from '@mui/material/Box'
import { ReactNode } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import Typography from '@mui/material/Typography'

const PageContainer = ({ children }: { children: ReactNode }) => {
    const { publicKey } = useWallet()
    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'background.paper',
                borderRadius: 1,
            }}
        >
            <Navbar />
            <Box
                sx={{
                    flexGrow: 1,
                }}
            >
                {
                    <Box
                        sx={{
                            display: 'flex',
                            px: {
                                xs: 2,
                                sm: 4,
                                md: 6,
                                lg: 12,
                                xl: 16,
                            },
                            py: {
                                xs: 2,
                                sm: 4,
                            },
                        }}
                    >
                        {publicKey ? (
                            children
                        ) : (
                            <Typography
                                variant={'h5'}
                                sx={{
                                    pt: {
                                        xs: 2,
                                        sm: 4,
                                        md: 10,
                                    },
                                }}
                            >
                                Please connect wallet (on Devnet) to continue.
                            </Typography>
                        )}
                    </Box>
                }
            </Box>
        </Box>
    )
}

export default PageContainer
