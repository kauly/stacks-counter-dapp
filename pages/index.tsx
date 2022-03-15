import ConnectButton from '@/components/ConnectButton'
import Counter from '@/components/Counter'
import useAuth from '@/hooks/useAuth'

export default function Home() {
  const { userData } = useAuth()
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-800 py-2 text-center text-2xl text-white">
      {userData ? <Counter /> : <ConnectButton />}
    </div>
  )
}
