import { createContext, FC, useCallback, useState } from 'react'
import { AppConfig, UserSession } from '@stacks/auth'
import {
  Connect,
  AuthOptions,
  FinishedAuthData,
  UserData,
} from '@stacks/connect-react'
import { TAuthValue } from '@/typings/auth'

const appConfig = new AppConfig(['store_write'], 'http://localhost:3000')
const userSession = new UserSession({ appConfig })
const authOption: AuthOptions = {
  appDetails: {
    name: 'Counter',
    icon: '/vercel.svg',
  },
  redirectTo: '/',
  userSession: userSession,
}

export const AuthContext = createContext<TAuthValue>({
  authLoading: false,
  onStartAuth: () => null,
  userData: undefined,
  userSession: undefined,
})

const AuthProvider: FC = ({ children }) => {
  const [userData, setUserData] = useState<UserData>()
  const [userSession, setUserSession] = useState<UserSession>()
  const [authLoading, setAuthLoading] = useState(false)

  const onFinishAuth = useCallback(({ userSession }: FinishedAuthData) => {
    const data = userSession.loadUserData()
    setUserSession(userSession)
    setUserData(data)
    setAuthLoading(false)
  }, [])

  const onStartAuth = () => {
    setAuthLoading(true)
  }

  return (
    <AuthContext.Provider
      value={{
        userData,
        userSession,
        authLoading,
        onStartAuth,
      }}
    >
      <Connect
        authOptions={{
          ...authOption,
          onFinish: onFinishAuth,
        }}
      >
        {children}
      </Connect>
    </AuthContext.Provider>
  )
}

export default AuthProvider
