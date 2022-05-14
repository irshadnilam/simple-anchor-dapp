import React, { useState } from 'react'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import WalletContext from './WalletContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PageContainer from './container/PageContainer'
import RefreshContext from './context'
import Home from './routes/Home'

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
    typography: {
        body2: {
            fontSize: 18,
        },
    },
})

function App() {
    const [refreshVal, setRefreshValue] = useState(0)
    return (
        <WalletContext>
            <ThemeProvider theme={theme}>
                <RefreshContext.Provider
                    value={{
                        lastValue: refreshVal,
                        refresh: () => setRefreshValue(Math.random()),
                    }}
                >
                    <CssBaseline />
                    <BrowserRouter>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <PageContainer>
                                        <Home />
                                    </PageContainer>
                                }
                            />
                        </Routes>
                    </BrowserRouter>
                </RefreshContext.Provider>
            </ThemeProvider>
            <ToastContainer />
        </WalletContext>
    )
}

export default App
