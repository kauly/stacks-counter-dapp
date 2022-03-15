import { useConnect } from '@stacks/connect-react'
import useAuth from '@/hooks/useAuth'

const ConnectButton = () => {
  const { onStartAuth, authLoading } = useAuth()
  const { doAuth } = useConnect()

  const handleClick = () => {
    onStartAuth()
    doAuth()
  }

  return (
    <button
      className="w-64 flex-initial cursor-pointer bg-sky-800 shadow active:translate-y-0.5"
      onClick={handleClick}
    >
      {authLoading ? 'loading...' : 'Connect Wallet'}
    </button>
  )
}

export default ConnectButton
