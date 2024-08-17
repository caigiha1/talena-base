import { PropsWithChildren, createContext, useContext, useState } from "react";

type Context = {
    loading: boolean
    setLoading: any
}

const initContext: Context = {
    loading: false,
    setLoading: () => {}
}
const LoadingContext = createContext<Context>(initContext)

export function LoadingProvider(props: PropsWithChildren<{}>) {
    const [loading, setLoading] = useState(false)
    return <LoadingContext.Provider value={{loading,setLoading}} {...props}/>
}
export function useLoadingContext(): Context{
    const context = useContext(LoadingContext)
    if (!context) {
        throw new Error('Error')
    }

    return context
}