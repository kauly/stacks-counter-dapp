import { useState } from 'react'
import { useConnect } from '@stacks/connect-react'
import config from '@/utils/config'
import useNetwork from '@/hooks/useNetwork'
import useSmartContract from '@/hooks/useSmartContract'
import useAuth from '@/hooks/useAuth'

type TTxType = 'increment' | 'decrement'

const Counter = () => {
  const { doContractCall } = useConnect()
  const { counter } = useSmartContract()
  const { userSession } = useAuth()
  const network = useNetwork()
  const [isLoading, setIsLoading] = useState(false)

  const handleTx = (type: TTxType) => {
    setIsLoading(true)
    doContractCall({
      contractAddress: config.contractAddress,
      contractName: config.contractName,
      functionName: type === 'increment' ? config.INC_FUNC : config.DEC_FUNC,
      functionArgs: [],
      network,
      userSession,
      onFinish: () => {
        setIsLoading(false)
      },
      onCancel: () => {
        setIsLoading(false)
      },
    })
  }

  const handleIncrement = () => handleTx('increment')
  const handleDecrement = () => handleTx('decrement')

  return (
    <div className="flex">
      <button
        className="w-32 flex-initial cursor-pointer bg-sky-800 shadow active:translate-y-0.5"
        onClick={handleDecrement}
      >
        -
      </button>
      <div className="mx-2 w-64 flex-initial bg-sky-800 shadow">{counter}</div>
      <button
        className="w-32 flex-initial cursor-pointer bg-sky-800 shadow active:translate-y-0.5"
        onClick={handleIncrement}
      >
        {isLoading ? '...' : '+'}
      </button>
    </div>
  )
}

export default Counter
