import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

type Context = {
    loginUserName: (username: string, password: string) => Promise<void>
    logOut:() => Promise<void>
    profileMe: any
}

const initContext: Context = {
    logOut: async () => {},
    loginUserName: async () => {},
    profileMe: null
}


const UserContext = createContext<Context>(initContext)

export function UserProvider(_props: PropsWithChildren<{}>) {
    const [profileMe, setProfileMe] = useState<any>()

    const loginUserName = async () => {
        
    }
    const logOut = async() => {

    }
    // const getProfile = async () => {
    //     const res = await useGetUser.myprofile()
    //     return res
    //   }

    useEffect (() => {
        // if (!isEmpty(getActToken())) {

        // }
        setProfileMe([])
    },[])
    return (
        <UserContext.Provider
            value={{
                loginUserName,
                logOut,
                profileMe,
            }}
        />
    )
}

export function useUserContext(): Context {
    const context = useContext(UserContext)

    if (!context) {
        throw new Error ('Error!')
    }
    return context
}