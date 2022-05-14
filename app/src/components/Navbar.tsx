import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { WalletMultiButton } from '@solana/wallet-adapter-material-ui'
import Box from '@mui/material/Box'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
    return (
        <Paper>
            <Grid container>
                <Grid
                    item
                    xs={12}
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                    }}
                >
                    <Box
                        sx={{
                            flex: '50%',
                            px: {
                                xs: 2,
                                sm: 4,
                            },
                            py: {
                                xs: 1,
                            },
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                p: 1,
                                m: 1,
                                borderRadius: 1,
                            }}
                        >
                            <Typography
                                onClick={() => navigate('/')}
                                sx={{
                                    ':hover': {
                                        cursor: 'pointer',
                                    },
                                    mr: {
                                        xs: 1,
                                        sm: 2,
                                    },
                                }}
                                variant={'h6'}
                            >
                                Home
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            flex: '50%',
                            textAlign: 'right',
                            px: {
                                xs: 2,
                                sm: 4,
                            },
                            py: {
                                xs: 1,
                            },
                        }}
                    >
                        <WalletMultiButton />
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    )
}
export default Navbar
