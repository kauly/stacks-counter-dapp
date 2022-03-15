import { UserData, UserSession } from '@stacks/connect-react'

export type TAuthValue = {
  userData: UserData | undefined
  userSession: UserSession | undefined
  authLoading: boolean
  onStartAuth: () => void
}
