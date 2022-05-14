import React from 'react'

interface IRefreshContext {
    lastValue: number
    refresh: () => void
}

const RefreshContext = React.createContext<IRefreshContext>(
    {} as IRefreshContext
)
export default RefreshContext
